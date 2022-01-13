import {
  Box,
  Button,
  Code,
  HStack,
  Heading,
  IconButton,
  LinkBox,
  LinkOverlay,
  Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { AdminNav } from '@/app/admin/AdminNav';
import { Page, PageContent } from '@/app/layout';
import { usePaginationFromUrl } from '@/app/router';
import {
  DataList,
  DataListCell,
  DataListFooter,
  DataListHeader,
  DataListRow,
  Pagination,
  PaginationButtonFirstPage,
  PaginationButtonLastPage,
  PaginationButtonNextPage,
  PaginationButtonPrevPage,
  PaginationInfo,
} from '@/components';

import { CoursePublication } from './CoursePublication';
import { useCourseList } from './courses.service';

export const PageCourses = () => {
  const { t } = useTranslation();
  const { page, setPage } = usePaginationFromUrl();
  const pageSize = 20;
  const { courses, total, isLoadingPage } = useCourseList({
    page: page - 1,
    size: pageSize,
  });

  return (
    <Page containerSize="xl" nav={<AdminNav />}>
      <PageContent>
        <HStack mb="4">
          <Box flex="1">
            <Heading size="md">{t('courses:list.title')}</Heading>
          </Box>
          <Box>
            <Button
              display={{ base: 'none', sm: 'flex' }}
              as={Link}
              to="create"
              variant="@primary"
              leftIcon={<FiPlus />}
            >
              {t('courses:list.actions.createCourse')}
            </Button>
            <IconButton
              display={{ base: 'flex', sm: 'none' }}
              aria-label={t('courses:list.actions.createCourse')}
              as={Link}
              to="create"
              size="sm"
              variant="@primary"
              icon={<FiPlus />}
            />
          </Box>
        </HStack>
        <DataList>
          <DataListHeader isVisible={{ base: false, md: true }}>
            <DataListCell colName="name">
              {t('courses:data.name.label')}
            </DataListCell>
            <DataListCell colName="id" isVisible={{ base: false, lg: true }}>
              {t('users:data.id.label')}
            </DataListCell>
            <DataListCell colName="published" align="center">
              <Box as="span" d={{ base: 'none', md: 'block' }}>
                {t('users:data.status.label')}
              </Box>
            </DataListCell>
          </DataListHeader>
          {courses?.map((course) => (
            <DataListRow as={LinkBox} key={course.id}>
              <DataListCell colName="name">
                <HStack maxW="100%">
                  <Box minW="0">
                    <Text isTruncated maxW="full" fontWeight="bold">
                      <LinkOverlay as={Link} to={course.name}>
                        {course.name}
                      </LinkOverlay>
                    </Text>
                  </Box>
                </HStack>
              </DataListCell>
              <DataListCell colName="id">
                <Text isTruncated maxW="full" as={Code} fontSize="xs">
                  {course.id}
                </Text>
              </DataListCell>
              <DataListCell colName="published">
                <CoursePublication isPublished={course.isPublished} />
              </DataListCell>
            </DataListRow>
          ))}
          <DataListFooter>
            <Pagination
              isLoadingPage={isLoadingPage}
              setPage={setPage}
              page={page}
              pageSize={pageSize}
              totalItems={total}
            >
              <PaginationButtonFirstPage />
              <PaginationButtonPrevPage />
              <PaginationInfo flex="1" />
              <PaginationButtonNextPage />
              <PaginationButtonLastPage />
            </Pagination>
          </DataListFooter>
        </DataList>
      </PageContent>
    </Page>
  );
};
