import { User } from '@prisma/client';
import Axios, { AxiosError } from 'axios';
import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';

import { DEFAULT_LANGUAGE_KEY } from '@/constants/i18n';

type UserMutateError = {
  title: string;
  errorKey: string;
};

export const useUserList = (
  { page = 0, size = 10 } = {},
  config: UseQueryOptions<PageinatedResponse<User>, AxiosError> = {}
) => {
  const result = useQuery(
    ['users', { page, size }],
    (): Promise<PageinatedResponse<User>> =>
      Axios.get('/users', { params: { page, size } }),
    {
      keepPreviousData: true,
      ...config,
    }
  );

  const { data: users, pagination } = result.data || {};
  const totalPages = Math.ceil(pagination?.total / size);
  const hasMore = page + 1 < totalPages;
  const isLoadingPage = result.isFetching;

  return {
    users,
    totalItems: pagination?.total,
    hasMore,
    totalPages,
    isLoadingPage,
    ...result,
  };
};

export const useUser = (
  userId: User['id'],
  config: UseQueryOptions<UniqueResponse<User>> = {}
) => {
  const { data: response, ...rest } = useQuery(
    ['user', userId],
    (): Promise<UniqueResponse<User>> => Axios.get(`/users/${userId}`),
    {
      ...config,
    }
  );

  return {
    user: response?.data,
    ...rest,
  };
};

export const useUserUpdate = (
  config: UseMutationOptions<User, AxiosError<UserMutateError>, User> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation((payload) => Axios.put('/users', payload), {
    ...config,
    onSuccess: (data, payload, ...rest) => {
      queryClient.cancelQueries('users');
      queryClient
        .getQueryCache()
        .findAll('users')
        .forEach(({ queryKey }) => {
          queryClient.setQueryData(
            queryKey,
            (cachedData: PageinatedResponse<User>) => {
              if (!cachedData) return;
              return {
                ...cachedData,
                content: (cachedData.data || []).map((user) =>
                  user.id === data.id ? data : user
                ),
              };
            }
          );
        });
      queryClient.invalidateQueries('users');
      queryClient.invalidateQueries(['user', payload.id]);
      if (config.onSuccess) {
        config.onSuccess(data, payload, ...rest);
      }
    },
  });
};

export const useUserCreate = (
  config: UseMutationOptions<
    User,
    AxiosError<UserMutateError>,
    Pick<User, 'email' | 'name'>
  > = {}
) => {
  return useMutation((user) => Axios.post('/users', user), {
    ...config,
  });
};

type UserWithIdAndNameOnly = Pick<User, 'id' | 'name'>;

export const useUserRemove = (
  config: UseMutationOptions<void, unknown, UserWithIdAndNameOnly> = {}
) => {
  return useMutation(
    (user: UserWithIdAndNameOnly): Promise<void> =>
      Axios.delete(`/users/${user.id}`),
    { ...config }
  );
};
