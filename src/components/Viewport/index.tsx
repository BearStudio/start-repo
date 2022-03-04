import React, { useEffect } from 'react';

import { Flex, useMediaQuery } from '@chakra-ui/react';

import { isBrowser } from '@/utils/ssr';

const useFixViewport = () => {
  useEffect(() => {
    const updateCssViewportHeight = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    if (isBrowser) {
      updateCssViewportHeight();
      window.addEventListener('resize', updateCssViewportHeight);
    }

    return () => {
      if (isBrowser) {
        window.removeEventListener('resize', updateCssViewportHeight);
      }
    };
  }, []);
};

export const Viewport = (props) => {
  const [isStandalone] = useMediaQuery('(display-mode: standalone)');
  useFixViewport();

  return (
    <Flex
      direction="column"
      overflowX="auto"
      minH="100vh"
      w="full"
      maxW="100vw"
      style={
        !isStandalone
          ? {
              minHeight: 'calc(var(--vh, 1vh) * 100)',
            }
          : {}
      }
      {...props}
    />
  );
};
