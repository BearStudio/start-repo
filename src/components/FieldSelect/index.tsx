import { FieldProps, useField } from '@formiz/core';
import { GroupBase } from 'react-select';

import { FormGroup, FormGroupProps } from '@/components/FormGroup';
import { Select, SelectProps } from '@/components/Select';

export interface FieldSelectProps<
  Option extends { label: string; value: unknown },
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> extends FieldProps,
    FormGroupProps {
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  options?: Option[];
  isClearable?: boolean;
  isSearchable?: boolean;
  selectProps?: SelectProps<Option, IsMulti, Group>;
  autoFocus?: boolean;
}

export const FieldSelect = <
  Option extends { label: string; value: unknown },
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: FieldSelectProps<Option, IsMulti, Group>
) => {
  const {
    errorMessage,
    id,
    isRequired,
    shouldDisplayError,
    setIsTouched,
    value,
    setValue,
    otherProps,
  } = useField(props);
  const {
    children,
    label,
    options = [],
    placeholder,
    helper,
    isDisabled,
    isClearable,
    isSearchable,
    size = 'md',
    selectProps,
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
      <Select
        id={id}
        value={options?.find((option) => option.value === value) || undefined}
        onBlur={() => setIsTouched(true)}
        placeholder={placeholder || 'Select...'}
        onChange={(fieldValue) =>
          setValue(fieldValue ? fieldValue.value : null)
        }
        size={size}
        options={options}
        isDisabled={isDisabled}
        isClearable={isClearable}
        isSearchable={isSearchable}
        isError={shouldDisplayError}
        {...selectProps}
      />
      {children}
    </FormGroup>
  );
};
