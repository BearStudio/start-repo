import {
  Alert,
  Button,
  LinkBox,
  LinkOverlay,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { Scope } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { saveAs } from 'file-saver';
import { VscIssues } from 'react-icons/vsc';
import { Link } from 'react-router-dom';

import { useFieldSelectScopeStyles } from '@/app/scopes/useFieldSelectScopeStyles';
import {
  DataList,
  DataListCell,
  DataListRow,
  FieldInput,
  FieldMultiSelect,
  FieldRadios,
  Icon,
} from '@/components';
import { trpc } from '@/utils/trpc';

import { FieldSelectScopeOptions } from './IssueForm';

export const ExportModal = ({ onClose, initialValues }) => {
  const form = useForm();

  const { data: scopes, isLoading: isLoadingScopes } = trpc.scope.all.useQuery({
    search: '',
  });

  const { data: issues, isLoading: isLoadingIssues } =
    trpc.issue.getManyByScopeId.useQuery({ scopes: form.values.scopes ?? [] });

  const { mutate: exportCSV, isLoading: isExportCSVLoading } = useMutation<
    AxiosResponse<string>,
    AxiosError,
    { scopes: Scope['id'][] }
  >(({ scopes }) => axios.post('/api/csv/issue', { scopes }), {
    onSuccess: (response) => {
      const file = new File([response.data], 'issues.csv', {
        type: 'text/csv;charset=utf-8',
      });
      saveAs(file);
      onClose();
    },
  });

  const { mutate: exportToGithub, isLoading: isExportToGithubLoading } =
    trpc.issue.export.github.useMutation({
      onSuccess: () => {
        onClose();
      },
    });

  const options: Array<FieldSelectScopeOptions> =
    scopes?.map((scope) => ({
      label: scope.name,
      value: scope.id,
      color: scope.color,
    })) ?? [];

  const styles = useFieldSelectScopeStyles();

  const isLoading = isExportCSVLoading || isExportToGithubLoading;

  const handleSubmit = ({ scopes, provider, repositoryName }) => {
    switch (provider) {
      case 'github':
        exportToGithub({ scopes, repositoryName });
        return;
      case 'gitlab':
      default:
        exportCSV({ scopes });
        return;
    }
  };

  return (
    <Modal isOpen onClose={() => onClose(form.values?.scopes)}>
      <Formiz
        autoForm
        onValidSubmit={handleSubmit}
        connect={form}
        initialValues={{ scopes: initialValues ?? [] }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Export Issues</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="4">
              <FieldRadios
                name="provider"
                options={[
                  { label: 'GitLab/CSV', value: 'gitlab' },
                  { label: 'GitHub', value: 'github' },
                ]}
                defaultValue="gitlab"
              />
              <FieldMultiSelect
                label="Scopes"
                name="scopes"
                selectProps={{
                  isLoading: isLoadingScopes,
                  styles,
                }}
                options={options}
                required="Required"
              />
              {form.values?.provider === 'github' && (
                <>
                  <FieldInput
                    name="repositoryName"
                    label="Repository Name"
                    helper="BearStudio/start-repo"
                    required="Required"
                  />
                  <Alert status="warning">
                    GitHub export might take some time based on how many issues
                    you are exporting (1 sec per issue).
                  </Alert>
                </>
              )}

              {issues && issues?.length > 0 ? (
                <Stack>
                  <Text mt={3}>Issues {issues.length})</Text>
                  <DataList minH="0" maxH="20rem" overflowY="auto">
                    {!isLoadingIssues &&
                      issues?.map((issue) => (
                        <DataListRow as={LinkBox} key={issue.id}>
                          <DataListCell colWidth="3rem" align="flex-end" p="0">
                            <Icon
                              icon={VscIssues}
                              fontSize="1.5rem"
                              color="brand.500"
                            />
                          </DataListCell>
                          <DataListCell colWidth="auto">
                            <Stack spacing="0">
                              <Text fontWeight="bold">
                                <LinkOverlay
                                  as={Link}
                                  target="_blank"
                                  to={`/issues/${issue.id}`}
                                  textDecoration="underline"
                                >
                                  {issue.title}
                                </LinkOverlay>
                              </Text>
                            </Stack>
                          </DataListCell>
                        </DataListRow>
                      ))}
                  </DataList>
                </Stack>
              ) : undefined}
            </Stack>
          </ModalBody>

          <ModalFooter justifyContent="space-between">
            <Button onClick={() => onClose(form.values?.scopes)}>Cancel</Button>
            <Button variant="@primary" type="submit" isLoading={isLoading}>
              Export
            </Button>
          </ModalFooter>
        </ModalContent>
      </Formiz>
    </Modal>
  );
};
