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

import { FieldInput, FieldMultiSelect, FieldRadios } from '@/components';

import { FieldSelectScopeOptions } from './IssueForm';

export const ExportModal = ({ onClose }) => {
  const form = useForm();

  const { scopes, isLoading: isLoadingScopes }: TODO = {
    scopes: [],
    isLoading: false,
  };
  const { mutate: exportCSV, isLoading: isExportCSVLoading }: TODO = {
    mutate: () => {},
    isLoading: false,
  };

  const { mutate: exportToGithub, isLoading: isExportToGithubLoading }: TODO = {
    mutate: () => {},
    isLoading: false,
  };

  const options: Array<FieldSelectScopeOptions> = scopes?.map((scope) => ({
    label: scope.name,
    value: scope.id,
  }));

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
      <Formiz autoForm onValidSubmit={handleSubmit} connect={form}>
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
