import { TRPCError } from '@trpc/server';
import axios from 'axios';
import { z } from 'zod';

import { createProtectedRouter } from '@/server/create-protected-router';

export const issueRouter = createProtectedRouter()
  .query('all', {
    input: z.object({
      search: z.string(),
    }),
    async resolve({ ctx, input: { search } }) {
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
    },
  })
  .query('detail', {
    input: z.object({
      id: z.string().uuid(),
    }),
    async resolve({ ctx, input: { id } }) {
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
    },
  })
  .mutation('delete', {
    input: z.string().uuid(),
    async resolve({ input: id, ctx }) {
      const issue = await ctx.db.issue.delete({
        where: {
          id,
        },
      });

      return issue;
    },
  })
  .mutation('create', {
    input: z.object({
      title: z.string().min(1),
      description: z.string().nullish(),
      scopes: z.array(z.string().uuid()).min(1),
    }),
    async resolve({ input, ctx }) {
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
    },
  })
  .mutation('edit', {
    input: z.object({
      id: z.string().uuid(),
      data: z.object({
        title: z.string().min(1),
        description: z.string().nullish(),
        scopes: z.array(z.string().uuid()).min(1),
      }),
    }),
    async resolve({ ctx, input }) {
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
    },
  })
  .mutation('export.github', {
    input: z.object({
      scopes: z.array(z.string().uuid()).min(1),
      repositoryName: z.string().min(1),
    }),
    async resolve({ ctx, input: { scopes, repositoryName } }) {
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
    },
  });
