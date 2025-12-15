import { Code } from '@chakra-ui/react';
import { Formiz, useForm, useFormFields } from '@formiz/core';

import { FieldMultiSelect } from '.';

export default {
  title: 'Fields/FieldMultiSelect',
};
export const Default = () => {
  const form = useForm();
  const fieldsValues = useFormFields({
    connect: form,
    fields: ['mySelect'] as const,
    selector: 'value',
  });

  const options = [
    { label: 'One', value: 'One' },
    { label: 'Two', value: 'Two' },
    { label: 'Three', value: 'Three' },
  ];
  return (
    <Formiz autoForm connect={form}>
      <FieldMultiSelect
        name="mySelect"
        label="Label"
        helper="Helper"
        options={options}
      />

      <Code mt={5}>{JSON.stringify(fieldsValues.mySelect, null, 2)}</Code>
    </Formiz>
  );
};
