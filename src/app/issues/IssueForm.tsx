import { Stack } from '@chakra-ui/react';
import { Scope } from '@prisma/client';

import { useFieldSelectScopeStyles } from '@/app/scopes/useFieldSelectScopeStyles';
import { FieldInput, FieldMultiSelect } from '@/components';
import { FieldMarkdown } from '@/components/FieldMarkDown';
import { trpc } from '@/utils/trpc';

export type IssueFormProps = {
  defaultScopeId?: string;
};

export type FieldSelectScopeOptions = {
  label: Scope['name'];
  value: Scope['id'];
  color: Scope['color'];
};

export const IssueForm = (props: IssueFormProps) => {
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
  const defaultScope = options.find(
    (option) => option.value === props?.defaultScopeId
  )?.value;

  return !isLoadingScopes ? (
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
        defaultValue={defaultScope ? [defaultScope] : undefined}
        required="Required"
        options={options}
      />
      <FieldMarkdown
        name="description"
        label="Description"
        helper="Markdown allowed"
      />
    </Stack>
  ) : (
    <></>
  );
};
