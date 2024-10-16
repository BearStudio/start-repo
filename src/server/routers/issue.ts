import { TRPCError } from '@trpc/server';
import axios from 'axios';
import { z } from 'zod';

import { isAuthed } from '@/server/middleware';
import { t } from '@/server/trpc';
import { Scope } from '@prisma/client';

export type GithubLabel = {
  id: number;
  node_id: string;
  url: string;
  name: string;
  description: string;
  color: string;
  default: boolean;
};

export type GithubIssue = {
  id: number;
  number: number;
  title: string;
  body: string;
};

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
          AND: (filters?.scopes ?? []).map((scope) => ({
            scopes: {
              some: {
                scopeId: {
                  in: [scope],
                },
              },
            },
          })),
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

        // Labels
        const allScopes: Scope[] = [];
        for (const issue of issues) {
          for (const scope of issue.scopes) {
            if (
              !allScopes.some(
                (x) => x.name.toLowerCase() === scope.scope.name.toLowerCase()
              )
            ) {
              allScopes.push(scope.scope);
            }
          }
        }

        // Gets existing labels of selected repo in order to avoid labels duplicates
        const result = await axios.get(
          `https://api.github.com/repos/${repositoryName}/labels`,
          {
            headers: {
              Accept: 'application/vnd.github.v3+json',
              Authorization: `token ${githubToken}`,
            },
          }
        );

        const existingLabels: GithubLabel[] = result.data ?? [];
        const addedLabels: GithubLabel[] = [];

        // Adding new labels to the repo
        for (const scope of allScopes) {
          // We don't want to duplicate existing labels
          if (
            addedLabels.map((x) => x.id.toString()).includes(scope.id) ||
            existingLabels
              .map((x: GithubLabel) => x.name.toLowerCase())
              .includes(scope.name.toLowerCase())
          ) {
            continue;
          }

          const result = await axios.post(
            `https://api.github.com/repos/${repositoryName}/labels`,
            {
              name: scope.name,
              color: scope.color?.replace('#', ''),
            },
            {
              headers: {
                Accept: 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
                Authorization: `token ${githubToken}`,
              },
            }
          );

          if (result.data != null) {
            addedLabels.push(result.data);
          }

          await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        // Issues
        const addedIssues: GithubIssue[] = [];

        // Creating issues
        for (const issue of issues) {
          const result = await axios.post(
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

          if (result.data != null) {
            addedIssues.push(result.data);
          }

          await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        // To avoid sending another GET all labels request we merge the previously fetched labels and the ones we added to the repo
        const allLabels: GithubLabel[] = [
          ...addedLabels,
          ...existingLabels,
        ].reduce((acc: GithubLabel[], label: GithubLabel) => {
          if (!acc.some((existingLabel) => existingLabel.id === label.id)) {
            acc.push(label);
          }
          return acc;
        }, []);

        // Assigning labels to issues
        for (const issue of addedIssues) {
          const relatedIssue = issues.find((x) => x.title === issue.title);
          const relatedLabels = allLabels.filter((x) =>
            relatedIssue?.scopes.map((x) => x.scope.name).includes(x.name)
          );
          await axios.post(
            `https://api.github.com/repos/${repositoryName}/issues/${issue.number}/labels`,
            {
              labels: relatedLabels.map((x) => x.name),
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
