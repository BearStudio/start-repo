import { Course } from '@prisma/client';
import Axios, { AxiosError } from 'axios';
import { UseQueryOptions, useQuery } from 'react-query';

type CourseList = {
  data: Array<Course>;
  pagination: {
    total: number;
  };
};

export const useCourseList = (
  { page = 0, size = 10 } = {},
  config: UseQueryOptions<CourseList, AxiosError> = {}
) => {
  const result = useQuery(
    ['courses', { page, size }],
    (): Promise<CourseList> =>
      Axios.get('/courses', { params: { page, size } }),
    {
      keepPreviousData: true,
      ...config,
    }
  );

  const { data: courses, pagination } = result.data || {};
  const totalPages = Math.ceil(pagination?.total / size);
  const hasMore = page + 1 < totalPages;
  const isLoadingPage = result.isFetching;

  return {
    courses,
    total: pagination?.total,
    hasMore,
    totalPages,
    isLoadingPage,
    ...result,
  };
};
