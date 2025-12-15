import {
  Alert,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { Scope } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { saveAs } from 'file-saver';

import { useFieldSelectScopeStyles } from '@/app/scopes/useFieldSelectScopeStyles';
import { FieldInput, FieldMultiSelect, FieldRadios } from '@/components';
import { trpc } from '@/utils/trpc';

import { FieldSelectScopeOptions } from './IssueForm';

export const ExportModal = ({ onClose, initialValues }) => {
  const form = useForm();

  const { data: scopes, isLoading: isLoadingScopes } = trpc.scope.all.useQuery({
    search: '',
  });

  const { mutate: exportCSV, isLoading: isExportCSVLoading } = useMutation<
    AxiosResponse<string>,
    AxiosError,
    { scopes: Scope['id'][] }
  >(
    ({ scopes }) =>
      axios.post('/api/csv/issue', { scopes, provider: 'gitlab' }),
    {
      onSuccess: (response) => {
        const file = new File([response.data], 'issues.csv', {
          type: 'text/csv;charset=utf-8',
        });
        saveAs(file);
        onClose();
      },
    }
  );

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
    <Modal isOpen onClose={onClose}>
      <Formiz
        autoForm
        onValidSubmit={handleSubmit}
        connect={form}
        initialValues={initialValues ?? {}}
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
            </Stack>
          </ModalBody>

          <ModalFooter justifyContent="space-between">
            <Button onClick={onClose}>Cancel</Button>
            <Button variant="@primary" type="submit" isLoading={isLoading}>
              Export
            </Button>
          </ModalFooter>
        </ModalContent>
      </Formiz>
    </Modal>
  );
};
