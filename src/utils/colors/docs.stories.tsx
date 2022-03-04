import React from 'react';

import { Box, HStack, Stack, chakra } from '@chakra-ui/react';

import { generateSwatch } from '.';

export default {
  title: 'Utils/Colors',
};

export const GenerateSwatch = () => (
  <Stack spacing="6">
    {['#d53f8c', '#48bb78'].map((color) => (
      <Stack>
        <chakra.pre fontFamily="mono">generateSwatch({color})</chakra.pre>
        <HStack spacing="0">
          {Object.values(generateSwatch(color)).map((c) => (
            <Box flex="1" h="16" bg={c} />
          ))}
        </HStack>
      </Stack>
    ))}
  </Stack>
);
