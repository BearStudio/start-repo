import { Formiz, useForm } from '@formiz/core';

import { FieldRadios } from './index';

export default {
  title: 'Fields/FieldRadios',
};
export const Default = () => {
  const options = [{ value: 'One' }, { value: 'Two' }, { value: 'Three' }];
  const form = useForm();
  return (
    <Formiz connect={form}>
      <FieldRadios
        name="FieldRadios"
        label="Label"
        helper="Helper"
        options={options}
      />
    </Formiz>
  );
};
