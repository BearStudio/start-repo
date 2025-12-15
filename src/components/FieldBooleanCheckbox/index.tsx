import { Checkbox } from '@chakra-ui/react';
import { FieldProps, useField } from '@formiz/core';

import { FormGroup, FormGroupProps } from '@/components/FormGroup';

export type FieldBooleanCheckboxProps<FormattedValue = boolean> = FieldProps<
  boolean,
  FormattedValue
> &
  FormGroupProps & {
    optionLabel?: string;
    size?: 'sm' | 'md' | 'lg';
  };

export const FieldBooleanCheckbox = <FormattedValue = boolean,>(
  props: FieldBooleanCheckboxProps<FormattedValue>
) => {
  const {
    errorMessage,
    id,
    setValue,
    isRequired,
    shouldDisplayError,
    value,
    otherProps,
  } = useField({ defaultValue: false, ...props });
  const {
    children,
    label,
    helper,
    optionLabel,
    size = 'md',
    isDisabled,
    ...rest
  } = otherProps;

  const formGroupProps = {
    errorMessage,
    helper,
    id,
    isRequired,
    isDisabled,
    label,
    showError: shouldDisplayError,
    ...rest,
  };

  return (
    <FormGroup {...formGroupProps}>
      <Checkbox
        id={id}
        size={size}
        isChecked={value ?? undefined}
        isDisabled={isDisabled}
        onChange={() => setValue(!value)}
      >
        {optionLabel || <>&nbsp;</>}
      </Checkbox>
      {children}
    </FormGroup>
  );
};
