import { Tag } from '@chakra-ui/react';
import { Scope } from '@prisma/client';

import { generateSwatch } from '@/utils/colors';

export type ScopeTagProps = {
  scope: Scope;
};

export const ScopeTag = ({ scope, ...rest }: ScopeTagProps) => {
  return (
    <Tag
      key={scope?.id}
      color={generateSwatch(scope?.color ?? 'brand.500')[700]}
      bg={generateSwatch(scope?.color ?? 'brand.500')[100]}
      _dark={{
        color: generateSwatch(scope?.color ?? 'brand.500')[50],
        bg: generateSwatch(scope?.color ?? 'brand.500')[700],
      }}
      {...rest}
    >
      {scope?.name}
    </Tag>
  );
};
