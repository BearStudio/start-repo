import { Stack } from '@chakra-ui/react';
import { Scope } from '@prisma/client';

import { useFieldSelectScopeStyles } from '@/app/scopes/useFieldSelectScopeStyles';
import { FieldInput, FieldMarkdown, FieldMultiSelect } from '@/components';
import { trpc } from '@/utils/trpc';

export type FieldSelectScopeOptions = {
  label: Scope['name'];
  value: Scope['id'];
  color: Scope['color'];
};

export const IssueForm = () => {
  const { data: scopes, isLoading: isLoadingScopes } = trpc.scope.all.useQuery({
    search: '',
  });

  const options: Array<FieldSelectScopeOptions> =
    scopes?.map((scope) => ({
      label: scope.name,
      value: scope.id,
      color: scope.color,
    })) ?? [];

  const styles = useFieldSelectScopeStyles();

  return (
    <Stack>
      <FieldInput
        name="title"
        label="Title"
        required="Title is required"
        autoFocus
      />
      <FieldMultiSelect
        label="Scopes"
        name="scopes"
        selectProps={{
          isLoading: isLoadingScopes,
          styles,
        }}
        required="Required"
        options={options}
      />
      <FieldMarkdown
        name="description"
        label="Description"
        helper="Markdown allowed"
      />
    </Stack>
  );
};
