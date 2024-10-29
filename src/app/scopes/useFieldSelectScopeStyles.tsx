import { useColorMode, useToken } from '@chakra-ui/react';
import chroma from 'chroma-js';
import { StylesConfig } from 'react-select';

import { FieldSelectScopeOptions } from '@/app/issues/IssueForm';
import { generateSwatch } from '@/utils/colors';

export const useFieldSelectScopeStyles = (): StylesConfig<
  FieldSelectScopeOptions,
  true
> => {
  const brandColor = useToken('colors', 'brand.500');
  const { colorMode } = useColorMode();

  return {
    control: (styles) => ({ ...styles }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const swatch = generateSwatch(data.color ?? brandColor);
      const color = chroma(swatch[700]);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
            ? swatch[500]
            : isFocused
              ? color.alpha(0.2).css()
              : undefined,
        color: isDisabled
          ? '#ccc'
          : isSelected
            ? chroma.contrast(color, 'white') > 2
              ? 'white'
              : 'black'
            : swatch[colorMode === 'light' ? 700 : 400],
        cursor: isDisabled ? 'not-allowed' : 'default',

        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? swatch[500]
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    multiValue: (styles, { data }) => {
      const color = chroma(data.color ?? brandColor);
      return {
        ...styles,
        backgroundColor: color.alpha(colorMode === 'light' ? 0.2 : 0.8).css(),
      };
    },
    multiValueLabel: (styles, { data }) => {
      const swatch = generateSwatch(data.color ?? brandColor);
      return {
        ...styles,
        color: swatch[colorMode === 'light' ? 700 : 50],
      };
    },
    multiValueRemove: (styles, { data }) => {
      const swatch = generateSwatch(data.color ?? brandColor);
      return {
        ...styles,
        color: swatch[700],
        ':hover': {
          backgroundColor: swatch[50],
          color: 'white',
        },
      };
    },
  };
};
