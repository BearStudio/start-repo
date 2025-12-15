import React, { ReactNode, useEffect, useState } from 'react';

import { Radio, RadioGroup, Wrap, WrapItem } from '@chakra-ui/react';
import { FieldProps, useField } from '@formiz/core';

import { FormGroup, FormGroupProps } from '@/components/FormGroup';

interface Option {
  value: string | undefined;
  label?: ReactNode;
}

export interface FieldRadiosProps extends FieldProps<string>, FormGroupProps {
  size?: 'sm' | 'md' | 'lg';
  options?: Option[];
}

export const FieldRadios = (props: FieldRadiosProps) => {
  const {
    errorMessage,
    id,
    isRequired,
    shouldDisplayError,
    setValue,
    value,
    otherProps,
  } = useField(props);
  const { required } = props;
  const {
    children,
    label,
    options = [],
    helper,
    size = 'md',
    ...rest
  } = otherProps;
  const formGroupProps = {
    errorMessage,
    helper,
    id,
    isRequired,
    label,
    shouldDisplayError,
    ...rest,
  };

  return (
    <FormGroup {...formGroupProps}>
      <RadioGroup
        size={size}
        id={id}
        value={value ?? undefined}
        onChange={setValue}
      >
        <Wrap spacing="4">
          {options.map((option) => (
            <WrapItem key={option.value}>
              <Radio
                id={`${id}-${option.value}`}
                name={id}
                value={option.value}
              >
                {option.label ?? option.value}
              </Radio>
            </WrapItem>
          ))}
        </Wrap>
      </RadioGroup>
      {children}
    </FormGroup>
  );
};
