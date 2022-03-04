import { FC } from 'react';

import { Textarea, TextareaProps } from '@chakra-ui/react';
import {
  default as TextareaAutosizeReact,
  TextareaAutosizeProps as TextareaAutosizeReactProps,
} from 'react-textarea-autosize';

export interface TextareaAutosizeProps
  extends Overwrite<TextareaProps, TextareaAutosizeReactProps> {}

export const TextareaAutosize: FC<TextareaAutosizeProps> = (props) => (
  <Textarea as={TextareaAutosizeReact} minRows={4} {...props} />
);
