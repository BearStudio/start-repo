import { useState } from 'react';

import { Button, Flex, Heading, useBreakpointValue } from '@chakra-ui/react';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';

import { SuggestedScope } from '@/app/issues/defaultData';
import { Page, PageBottomBar, PageContent, PageTopBar } from '@/app/layout';
import { useToastError } from '@/components';
import { trpc } from '@/utils/trpc';

export const PageDefaultIssues = () => {
  const [selectedIssues, setSelectedIssues] = useState<SuggestedScope[]>([]);

  const navigate = useNavigate();

  const isMobile =
    useBreakpointValue({
      base: true,
      md: false,
    }) ?? false;

  const trpcContext = trpc.useContext();
  const { mutate: scopeMutation, isLoading: isScopeLoading } =
    trpc.scope.createMany.useMutation();
  const { mutate: issueMutation, isLoading: isIssueLoading } =
    trpc.issue.createMany.useMutation();

  const toastError = useToastError();

  const onSubmit = () => {};

  const isLoading = isScopeLoading || isIssueLoading;

  const handleSelectedIssuesChanged = (
    checked: boolean,
    issue: SuggestedScope
  ) => {
    if (checked) {
      setSelectedIssues([
        ...selectedIssues.filter(
          (_issue: SuggestedScope) => _issue.name !== issue.name
        ),
        issue,
      ]);
    } else {
      setSelectedIssues(
        selectedIssues.filter(
          (_issue: SuggestedScope) => _issue.name !== issue.name
        )
      );
    }
  };

  return (
    <Page containerSize="lg" isFocusMode>
      <PageTopBar>
        <Heading size="md">{t('issues:defaults.title')}</Heading>
      </PageTopBar>
      <PageContent></PageContent>
      <PageBottomBar>
        <Flex justifyContent="space-between">
          <Button type="button" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button
            variant="@primary"
            isDisabled={selectedIssues.length === 0 || isLoading}
            onClick={onSubmit}
          >
            {t('issues:defaults.action')}
          </Button>
        </Flex>
      </PageBottomBar>
    </Page>
  );
};
