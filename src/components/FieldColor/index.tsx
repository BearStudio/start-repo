import { Box, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { useField } from '@formiz/core';
import { ColorPicker, toColor } from 'react-color-palette';
import 'react-color-palette/lib/css/styles.css';

import { FormGroup } from '@/components';

export const FieldColor = (props) => {
  const {
    value,
    setValue,
    errorMessage,
    id,
    isValid,
    isSubmitted,
    otherProps,
  } = useField({
    defaultValue: '#FF0000',
    ...props,
  });
  const { colorMode } = useColorMode();

  const { required } = props;
  const { children, label, helper, ...rest } = otherProps;
  const showError = !isValid && isSubmitted;
  const bgColor = useColorModeValue('blackAlpha.50', 'whiteAlpha.50');

  const formGroupProps = {
    errorMessage,
    helper,
    id,
    isRequired: !!required,
    label,
    showError,
    ...rest,
  };

  return (
    <FormGroup {...formGroupProps}>
      <Box sx={{ '.rcp': { background: bgColor } }}>
        <ColorPicker
          width={240}
          height={120}
          hideRGB
          hideHSV
          color={toColor('hex', value)}
          onChange={(color) => {
            setValue(color.hex);
          }}
          dark={colorMode === 'dark'}
        />
      </Box>
    </FormGroup>
  );
};
