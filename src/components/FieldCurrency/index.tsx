import React, { useEffect, useState } from 'react';

import { InputGroup, InputRightElement, Spinner } from '@chakra-ui/react';
import { FieldProps, useField } from '@formiz/core';

import { FormGroup, FormGroupProps } from '@/components/FormGroup';
import { InputCurrency, InputCurrencyProps } from '@/components/InputCurrency';

export type FieldCurrencyProps<FormattedValue = number> = Omit<
  FieldProps<number, FormattedValue>,
  'value'
> &
  Omit<FormGroupProps, 'placeholder'> &
  Pick<
    InputCurrencyProps,
    'currency' | 'locale' | 'decimals' | 'placeholder'
  > & {
    size?: 'sm' | 'md' | 'lg';
  };

export const FieldCurrency = (props: FieldCurrencyProps) => {
  const {
    errorMessage,
    id,
    shouldDisplayError,
    isSubmitted,
    isValidating,
    isTouched,
    setIsTouched,
    isRequired,
    setValue,
    value,
    otherProps,
  } = useField(props);
  const {
    children,
    label,
    placeholder,
    helper,
    size = 'md',
    currency,
    locale,
    decimals,
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
      <InputGroup size={size}>
        <InputCurrency
          id={id}
          value={value ?? undefined}
          onChange={(newValue) => setValue(newValue ?? null)}
          onBlur={() => setIsTouched(true)}
          placeholder={placeholder}
          currency={currency}
          locale={locale}
          decimals={decimals}
        />
        {(isTouched || isSubmitted) && isValidating && (
          <InputRightElement>
            <Spinner size="sm" flex="none" />
          </InputRightElement>
        )}
      </InputGroup>
      {children}
    </FormGroup>
  );
};
