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
        where: { id: id },
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
      description: z.string(),
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
        description: z.string(),
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
  });
