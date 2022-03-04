import { useState } from 'react';

import { TextareaAutosize } from '.';

export default {
  title: 'components/TextareaAutosize',
};

export const Default = () => <TextareaAutosize onChange={console.log} />;

export const Controlled = () => {
  const [value, setValue] = useState('🚀 Start UI [web]');
  return (
    <TextareaAutosize
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
