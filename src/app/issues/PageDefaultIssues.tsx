import { useState } from 'react';

import {
  Button,
  Checkbox,
  Flex,
  Heading,
  LinkBox,
  Stack,
  Tag,
  Text,
  Tooltip,
  Wrap,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Scope } from '@prisma/client';
import { t } from 'i18next';
import { VscIssues } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';

import {
  DefaultIssue,
  defaultIssues,
  defaultScopes,
} from '@/app/issues/defaultData';
import { Page, PageBottomBar, PageContent, PageTopBar } from '@/app/layout';
import { ScopeTag } from '@/app/scopes/ScopeTag';
import {
  DataList,
  DataListCell,
  DataListRow,
  Icon,
  useToastError,
} from '@/components';
import { RouterInput } from '@/server/routers/_app';
import { trpc } from '@/utils/trpc';

export const PageDefaultIssues = () => {
  const [selectedIssues, setSelectedIssues] = useState<DefaultIssue[]>([]);

  const navigate = useNavigate();

  const isMobile =
    useBreakpointValue({
      base: true,
      md: false,
    }) ?? false;

  const issues = defaultIssues.map((issue) => ({
    ...issue,
    scopes: defaultScopes.filter((scope) => issue.scopes.includes(scope.id)),
  }));

  const trpcContext = trpc.useContext();
  const { mutate: scopeMutation, isLoading: isScopeLoading } =
    trpc.scope.createMany.useMutation();
  const { mutate: issueMutation, isLoading: isIssueLoading } =
    trpc.issue.createMany.useMutation();

  const toastError = useToastError();

  const onSubmit = () => {
    const scopeIds = [
      ...new Set(selectedIssues.flatMap((issue) => issue.scopes)),
    ];
    const scopesToAdd: RouterInput['scope']['createMany'] = defaultScopes
      .filter((scope) => scopeIds.includes(scope.id))
      .map((scope) => ({
        id: scope.id,
        name: scope.name,
        description: scope.description ?? null,
        color: scope.color ?? null,
      }));

    const issuesToAdd: RouterInput['issue']['createMany'] = selectedIssues.map(
      (issue) => ({
        id: issue.id,
        title: issue.name,
        description: issue.description ?? null,
        scopes: issue.scopes,
      })
    );

    scopeMutation(scopesToAdd, {
      onSuccess: () => {
        trpcContext.scope.all.invalidate();

        return issueMutation(issuesToAdd, {
          onSuccess: () => {
            navigate(-1);

            return trpcContext.issue.all.invalidate();
          },
          onError: () => {
            toastError({
              title: 'Failed to create issue',
            });
          },
        });
      },
      onError: () => {
        toastError({
          title: 'Failed to create scope',
        });
      },
    });
  };

  const isLoading = isScopeLoading || isIssueLoading;

  const handleSelectedIssuesChanged = (
    checked: boolean,
    issue: DefaultIssue
  ) => {
    if (checked) {
      setSelectedIssues([
        ...selectedIssues.filter(
          (_issue: DefaultIssue) => _issue.id !== issue.id
        ),
        issue,
      ]);
    } else {
      setSelectedIssues(
        selectedIssues.filter((_issue: DefaultIssue) => _issue.id !== issue.id)
      );
    }
  };

  console.log({ issues });

  return (
    <Page containerSize="lg" isFocusMode>
      <PageTopBar showBack onBack={() => navigate(-1)}>
        <Heading size="md">{t('issues:defaults.title')}</Heading>
      </PageTopBar>
      <PageContent>
        <DataList>
          {!isLoading &&
            issues?.map((issue) => (
              <DataListRow as={LinkBox} key={issue.id}>
                <DataListCell colWidth="1rem" position="relative" zIndex="2">
                  <Checkbox
                    _before={{
                      content: '""',
                      position: 'absolute',
                      inset: '-1rem',
                    }}
                    isChecked={
                      !!selectedIssues.find(
                        (selectedIssue) => selectedIssue.id === issue.id
                      )
                    }
                    onChange={(e) =>
                      handleSelectedIssuesChanged(e.target.checked, {
                        ...issue,
                        scopes: issue.scopes.map((scope) => scope.id),
                      })
                    }
                  />
                </DataListCell>
                <DataListCell colWidth="3rem" align="flex-end" p="0">
                  <Icon icon={VscIssues} fontSize="1.5rem" color="brand.500" />
                </DataListCell>

                <DataListCell colWidth={2}>
                  <Stack spacing={{ base: '1', md: '0' }}>
                    <Text
                      fontWeight="bold"
                      align={{ base: 'left', md: undefined }}
                    >
                      {issue.name}
                    </Text>
                    <Text
                      align={{ base: 'left', md: undefined }}
                      fontSize="sm"
                      color="gray.500"
                      _dark={{ color: 'gray.400' }}
                      noOfLines={2}
                    >
                      {issue.description}
                    </Text>
                    {isMobile && (
                      <Wrap justify="left">
                        {issue.scopes
                          ?.slice(0, 1)
                          .map((scope) => (
                            <ScopeTag
                              scope={scope as Scope}
                              key={issue.id + scope.id}
                            />
                          ))}

                        {issue.scopes.length > 1 && (
                          <Tooltip
                            hasArrow
                            p={2}
                            borderRadius={8}
                            placement="bottom"
                            label={
                              <Wrap>
                                {issue.scopes
                                  ?.slice(1, issue.scopes.length)
                                  .map((scope) => (
                                    <ScopeTag
                                      key={issue.id + scope.id}
                                      scope={scope as Scope}
                                    />
                                  ))}
                              </Wrap>
                            }
                          >
                            <Tag zIndex="popover">
                              +{issue.scopes.length - 1}
                            </Tag>
                          </Tooltip>
                        )}
                      </Wrap>
                    )}
                  </Stack>
                </DataListCell>
                {!isMobile && (
                  <DataListCell>
                    <Wrap>
                      {issue.scopes
                        ?.slice(0, 5)
                        .map((scope) => <ScopeTag scope={scope as Scope} />)}

                      {issue.scopes.length > 5 && (
                        <Tooltip
                          hasArrow
                          p={2}
                          borderRadius={8}
                          placement="bottom"
                          label={
                            <Wrap>
                              {issue.scopes
                                ?.slice(5, issue.scopes.length)
                                .map((scope) => (
                                  <ScopeTag scope={scope as Scope} />
                                ))}
                            </Wrap>
                          }
                        >
                          <Tag zIndex="popover">+{issue.scopes.length - 5}</Tag>
                        </Tooltip>
                      )}
                    </Wrap>
                  </DataListCell>
                )}
              </DataListRow>
            ))}
        </DataList>
      </PageContent>
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
            Use default issues
          </Button>
        </Flex>
      </PageBottomBar>
    </Page>
  );
};
