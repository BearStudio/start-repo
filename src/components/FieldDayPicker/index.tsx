import { FieldProps, useField, useForm } from '@formiz/core';
import { useTranslation } from 'react-i18next';

import { DayPicker, FormGroup, FormGroupProps } from '@/components';

export interface FieldDayPickerProps
  extends FieldProps<string | Date | null | undefined>,
    FormGroupProps {
  placeholder: string;
  invalidMessage?: string;
}

export const FieldDayPicker = (props: FieldDayPickerProps) => {
  const { t } = useTranslation();
  const { invalidMessage, ...fieldProps } = props;
  const { setErrors } = useForm();
  const {
    errorMessage,
    id,
    shouldDisplayError,
    isRequired,
    setValue,
    value,
    otherProps,
  } = useField({
    debounce: 0,
    ...fieldProps,
  });
  const { children, label, placeholder, helper, size, ...rest } = otherProps;

  const formGroupProps = {
    errorMessage,
    helper,
    id,
    isRequired,
    label,
    shouldDisplayError,
    ...rest,
  };

  const handleChange = (date, isValidDate) => {
    setValue(date);
    if (!isValidDate) {
      setErrors({
        [props.name]:
          invalidMessage ?? t('components:fieldDayPicker.invalidMessage'),
      });
    }
  };

  return (
    <FormGroup {...formGroupProps}>
      <DayPicker
        id={id}
        value={value ?? ''}
        onChange={handleChange}
        placeholder={placeholder ? String(placeholder) : ''}
      />
      {children}
    </FormGroup>
  );
};
