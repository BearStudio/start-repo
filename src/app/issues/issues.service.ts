import { Issue } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from 'react-query';

export const useIssue = (
  id: Issue['id'],
  config: UseQueryOptions<UniqueResponse<Issue>, AxiosError> = {}
) => {
  const { data: response, ...rest } = useQuery(
    ['issue', id],
    (): Promise<UniqueResponse<Issue>> => axios.get(`/issues/${id}`),
    {
      ...config,
    }
  );

  return { issue: response?.data, ...rest };
};

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

export const useIssueUpdate = (
  config: UseMutationOptions<
    Issue,
    AxiosError,
    Pick<Issue, 'id' | 'title' | 'description'>
  > = {}
) => {
  return useMutation(
    (issue) => axios.patch(`/issues/${issue.id}`, issue),
    config
  );
};

export const useIssueRemove = (
  config: UseMutationOptions<void, unknown, Pick<Issue, 'id' | 'title'>> = {}
) => {
  return useMutation(
    (issue): Promise<void> => axios.delete(`/issues/${issue.id}`),
    { ...config }
  );
};
