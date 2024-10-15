import { useEffect, useState } from 'react';

import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  TextareaProps,
} from '@chakra-ui/react';
import { FieldProps, useField } from '@formiz/core';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { FormGroup, FormGroupProps, TextareaAutosize } from '@/components';

import { components } from './components';

export interface FieldMarkdownProps extends FieldProps, FormGroupProps {
  placeholder?: TextareaProps['placeholder'];
  TextareaProps?: Omit<
    TextareaProps,
    | 'id'
    | 'value'
    | 'name'
    | 'defaultValue'
    | 'onChange'
    | 'onBlur'
    | 'placeholder'
  >;
}

export const FieldMarkdown = (props: FieldMarkdownProps) => {
  const {
    errorMessage,
    id,
    isValid,
    isSubmitted,
    resetKey,
    setValue,
    value,
    otherProps,
  } = useField(props);

  const { helper, label, placeholder, MarkdownProps, ...rest } = otherProps;

  const { required } = props;
  const [isTouched, setIsTouched] = useState(false);

  const showError = !isValid && (isTouched || isSubmitted);

  useEffect(() => {
    setIsTouched(false);
  }, [resetKey]);

  const formGroupProps: FormGroupProps = {
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
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Write</Tab>
          <Tab>Preview</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px="0">
            <TextareaAutosize
              id={id}
              value={value ?? ''}
              onChange={(e) => setValue(e.target.value)}
              onBlur={() => setIsTouched(true)}
              placeholder={placeholder}
              {...MarkdownProps}
            />
          </TabPanel>
          <TabPanel>
            <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
              {value}
            </ReactMarkdown>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </FormGroup>
  );
};
