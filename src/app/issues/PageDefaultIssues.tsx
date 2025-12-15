import { Accordion, Button, Flex, Heading } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';

import { DefaultSelectableScope } from '@/app/issues/DefaultSelectableScope';
import {
  SuggestedIssue,
  SuggestedScope,
  suggestedScopes,
} from '@/app/issues/defaultData';
import { Page, PageBottomBar, PageContent, PageTopBar } from '@/app/layout';
import { DataList } from '@/components';
import { trpc } from '@/utils/trpc';

export const PageDefaultIssues = () => {
  const navigate = useNavigate();

  const form = useForm();

  const trpcContext = trpc.useContext();
  const { mutate, isLoading } = trpc.issue.createFromSuggested.useMutation();

  const onSubmit = (values) => {
    const nonEmpty = Object.entries(values).filter((scope) => !!scope[1]);
    const newScopes: SuggestedScope[] = [];
    suggestedScopes
      .filter((scope) => nonEmpty.map((scope) => scope[0]).includes(scope.name))
      .forEach((scope) => newScopes.push(Object.assign({}, scope)));

    newScopes.forEach((scope) => {
      const issues =
        nonEmpty.find((_scope) => _scope[0] === scope.name)?.[1] ?? [];
      if (issues) {
        scope.issues = issues as SuggestedIssue[];
      }
    });

    mutate(newScopes, {
      onSuccess: () => {
        trpcContext.issue.all.invalidate();
        return navigate(-1);
      },
    });
  };

  return (
    <Page containerSize="lg" isFocusMode>
      <Formiz
        connect={form}
        autoForm
        onValidSubmit={(values) => onSubmit(values)}
      >
        <PageTopBar>
          <Heading size="md">{t('issues:defaults.title')}</Heading>
        </PageTopBar>
        <PageContent>
          <Accordion allowToggle>
            <DataList>
              {suggestedScopes.map((scope) => (
                <DefaultSelectableScope key={scope.name} scope={scope} />
              ))}
            </DataList>
          </Accordion>
        </PageContent>
        <PageBottomBar>
          <Flex justifyContent="space-between">
            <Button type="button" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button variant="@primary" type="submit" isDisabled={isLoading}>
              {t('issues:defaults.submit')}
            </Button>
          </Flex>
        </PageBottomBar>
      </Formiz>
    </Page>
  );
};

export const removeBrackets = (value: string) => {
  return value.replace('[', '').replace(']', '');
};
