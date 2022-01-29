import { Issue } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from 'react-query';

export const useIssueList = (
  { page = 0, size = 10 } = {},
  config: UseQueryOptions<PaginatedResponse<Issue>, AxiosError> = {}
) => {
  const result = useQuery(
    ['issues', { page, size }],
    (): Promise<PaginatedResponse<Issue>> =>
      axios.get('/issues', { params: { page, size } }),
    {
      keepPreviousData: true,
      ...config,
    }
  );

  const { data: issues, pagination } = result.data || {};
  const totalPages = Math.ceil(pagination?.total / size);
  const hasMore = page + 1 < totalPages;
  const isLoadingPage = result.isFetching;

  return {
    issues,
    totalItems: pagination?.total,
    hasMore,
    totalPages,
    isLoadingPage,
    ...result,
  };
};

export const useIssueCreate = (
  config: UseMutationOptions<
    Issue,
    AxiosError,
    Pick<Issue, 'title' | 'description'>
  > = {}
) => {
  return useMutation((issue) => axios.post('/issues', issue), {
    ...config,
  });
};
