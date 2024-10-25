import { TRPCError } from '@trpc/server';
import axios from 'axios';
import { z } from 'zod';

import { isAuthed } from '@/server/middleware';
import { t } from '@/server/trpc';

export const issueRouter = t.router({
  infinite: t.procedure
    .use(isAuthed)
    .input(
      z.object({
        search: z.string(),
        limit: z.number().min(1).max(100).default(20),
        cursor: z.string().uuid().nullish(),
        filters: z
          .object({
            scopes: z.array(z.string().uuid()).nullish(),
          })
          .nullish(),
      })
    )
    .query(async ({ ctx, input: { search, limit, cursor, filters } }) => {
      const issues = await ctx.db.issue.findMany({
        take: limit + 1,
        where: {
          AND: [
            {
              OR: [
                {
                  title: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
                {
                  description: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              ],
            },
            ...(filters?.scopes && filters?.scopes?.length > 0
              ? [
                  {
                    scopes: {
                      some: {
                        scopeId: {
                          in: filters?.scopes as string[],
                        },
                      },
                    },
                  },
                ]
              : []),
          ],
        },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          scopes: {
            include: {
              scope: true,
            },
          },
        },
      });

      const totalCount = await ctx.db.issue.count({
        where: {
          title: {
            search: search !== '' ? search : undefined,
          },
          description: {
            search: search !== '' ? search : undefined,
          },
        },
      });

      let nextCursor: typeof cursor = null;
      if (issues.length > limit) {
        const nextItem = issues.pop();
        nextCursor = nextItem!.id;
      }

      return {
        issues,
        nextCursor,
        totalCount,
      };
    }),

  all: t.procedure
    .use(isAuthed)
    .input(
      z.object({
        search: z.string(),
      })
    )
    .query(async ({ ctx, input: { search } }) => {
      const issues = await ctx.db.issue.findMany({
        where: {
          title: {
            search: search !== '' ? search : undefined,
          },
          description: {
            search: search !== '' ? search : undefined,
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          scopes: {
            include: {
              scope: true,
            },
          },
        },
      });

      return issues;
    }),

  getByScopeId: t.procedure
    .use(isAuthed)
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(async ({ ctx, input: { id } }) => {
      return await ctx.db.issue.findMany({
        where: {
          scopes: {
            some: {
              scopeId: id,
            },
          },
        },
        include: {
          scopes: {
            include: {
              scope: true,
            },
          },
        },
      });
    }),

  detail: t.procedure
    .use(isAuthed)
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(async ({ ctx, input: { id } }) => {
      const issue = await ctx.db.issue.findUnique({
        where: { id },
        include: {
          scopes: {
            include: {
              scope: true,
            },
          },
        },
      });

      return issue;
    }),

  delete: t.procedure
    .use(isAuthed)
    .input(z.string().uuid())
    .mutation(async ({ input: id, ctx }) => {
      const issue = await ctx.db.issue.delete({
        where: {
          id,
        },
      });

      return issue;
    }),

  deleteMany: t.procedure
    .use(isAuthed)
    .input(z.array(z.string().uuid()).min(1))
    .mutation(async ({ input: ids, ctx }) => {
      await ctx.db.issue.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });
    }),

  create: t.procedure
    .use(isAuthed)
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().nullish(),
        scopes: z.array(z.string().uuid()).min(1),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const issue = await ctx.db.issue.create({
        data: {
          title: input.title,
          description: input.description,
          scopes: {
            create: input.scopes.map((id: string) => ({
              scope: {
                connect: {
                  id,
                },
              },
            })),
          },
        },
        include: {
          scopes: {
            include: {
              scope: true,
            },
          },
        },
      });

      return issue;
    }),

  edit: t.procedure
    .use(isAuthed)
    .input(
      z.object({
        id: z.string().uuid(),
        data: z.object({
          title: z.string().min(1),
          description: z.string().nullish(),
          scopes: z.array(z.string().uuid()).min(1),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, data } = input;

      const updatedIssue = await ctx.db.issue.update({
        where: { id },
        data: {
          title: data.title,
          description: data.description,
          scopes: {
            deleteMany: {},
            create: data.scopes?.map((id) => ({
              scope: {
                connect: {
                  id,
                },
              },
            })),
          },
        },
        include: {
          scopes: {
            include: {
              scope: true,
            },
          },
        },
      });

      return updatedIssue;
    }),

  addBulkScope: t.procedure
    .use(isAuthed)
    .input(
      z.object({
        ids: z.array(z.string().uuid()),
        scopeId: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { ids, scopeId } = input;

      const issues = await ctx.db.issue.findMany({
        where: {
          scopes: {
            some: { scopeId },
          },
        },
      });

      await ctx.db.scopesOnIssues.createMany({
        data: ids
          .filter((id) => !issues.find((i) => i.id === id))
          .map((id) => ({ scopeId, issueId: id })),
      });

      return;
    }),

  export: t.router({
    github: t.procedure
      .use(isAuthed)
      .input(
        z.object({
          scopes: z.array(z.string().uuid()).min(1),
          repositoryName: z.string().min(1),
        })
      )
      .mutation(async ({ ctx, input: { scopes, repositoryName } }) => {
        if (!ctx.session) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'You must be logged in',
          });
        }

        const githubToken = ctx.session.user.accounts.find(
          (account) => account.provider === 'github'
        )?.access_token;

        const issues = await ctx.db.issue.findMany({
          where: {
            scopes: {
              some: {
                scopeId: { in: scopes },
              },
            },
          },
          include: {
            scopes: {
              include: {
                scope: true,
              },
            },
          },
        });

        for (const issue of issues) {
          await axios.post(
            `https://api.github.com/repos/${repositoryName}/issues`,
            {
              title: issue.title,
              body: issue.description,
            },
            {
              headers: {
                Accept: 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
                Authorization: `token ${githubToken}`,
              },
            }
          );

          await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        return undefined;
      }),
  }),
});
