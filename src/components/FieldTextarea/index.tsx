import { useEffect, useState } from 'react';

import { Textarea, TextareaProps } from '@chakra-ui/react';
import { FieldProps, useField } from '@formiz/core';

import { FormGroup, FormGroupProps } from '@/components';

export interface FieldTextareaProps
  extends FieldProps<string | number | undefined>,
    FormGroupProps {
  placeholder?: TextareaProps['placeholder'];
  textareaProps?: Omit<
    TextareaProps,
    | 'id'
    | 'value'
    | 'name'
    | 'defaultValue'
    | 'onChange'
    | 'onBlur'
    | 'placeholder'
  >;
  autoFocus?: boolean;
}

export const FieldTextarea = (props: FieldTextareaProps) => {
  const {
    errorMessage,
    id,
    isRequired,
    shouldDisplayError,
    setIsTouched,
    setValue,
    value,
    otherProps,
  } = useField(props);

  const { helper, label, placeholder, textareaProps, autoFocus, ...rest } =
    otherProps;

  const formGroupProps: FormGroupProps = {
    errorMessage,
    helper,
    id,
    isRequired,
    label,
    showError: shouldDisplayError,
    ...rest,
  };

  return (
    <FormGroup {...formGroupProps}>
      <Textarea
        id={id}
        value={value ?? undefined}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => setIsTouched(true)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        {...textareaProps}
      />
    </FormGroup>
  );
};
