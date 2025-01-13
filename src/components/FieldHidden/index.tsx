import React from 'react';

import { FieldProps, useField } from '@formiz/core';

import { FormGroup, FormGroupProps } from '@/components/FormGroup';

interface FieldHiddenProps extends FieldProps, FormGroupProps {}

export const FieldHidden: React.FC<FieldHiddenProps> = (props) => {
  const {
    errorMessage,
    otherProps: rest,
    shouldDisplayError,
  } = useField(props);
  const formGroupProps = {
    errorMessage,
    shouldDisplayError,
  };

  if (shouldDisplayError) {
    return <FormGroup {...formGroupProps} {...rest} />;
  }
  return null;
};
