import { Accordion, Button, Flex, Heading } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';

import { DefaultSelectableScope } from '@/app/issues/DefaultSelectableScope';
import { suggestedScopes } from '@/app/issues/defaultData';
import { Page, PageBottomBar, PageContent, PageTopBar } from '@/app/layout';
import { DataList } from '@/components';

export const PageDefaultIssues = () => {
  const navigate = useNavigate();

  const form = useForm();

  const onSubmit = (values) => {
    console.log({ values });
  };

  return (
    <Page containerSize="lg" isFocusMode>
      <Formiz
        connect={form}
        autoForm
        onValidSubmit={(values) => onSubmit(values)}
        initialValues={{}}
      >
        <PageTopBar>
          <Heading size="md">{t('issues:defaults.title')}</Heading>
        </PageTopBar>
        <PageContent>
          <Accordion allowToggle>
            <DataList>
              {suggestedScopes.map((scope) => (
                <DefaultSelectableScope
                  key={scope.name}
                  scope={scope}
                  form={form}
                />
              ))}
            </DataList>
          </Accordion>
        </PageContent>
        <PageBottomBar>
          <Flex justifyContent="space-between">
            <Button type="button" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button variant="@primary" type="submit">
              {t('issues:defaults.submit')}
            </Button>
          </Flex>
        </PageBottomBar>
      </Formiz>
    </Page>
  );
};
