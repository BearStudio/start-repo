import React from 'react';

import { Box, Text, useTheme } from '@chakra-ui/react';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { withTRPC } from '@trpc/next';
import { TRPCError } from '@trpc/server';
import Head from 'next/head';

import { Providers } from '@/Providers';
import { Viewport } from '@/components';
import { ErrorBoundary } from '@/errors';
import { AppRouter } from '@/server/routers/_app';
import { isBrowser } from '@/utils/ssr';
import { transformer } from '@/utils/trpc';

const AppDevHint = () => {
  const envName =
    process.env.NODE_ENV === 'development'
      ? 'Development'
      : process.env.NEXT_PUBLIC_DEV_ENV_NAME;
  const colorScheme =
    process.env.NODE_ENV === 'development'
      ? 'warning'
      : process.env.NEXT_PUBLIC_DEV_ENV_COLOR_SCHEME ?? 'success';

  if (!envName) {
    return null;
  }

  return (
    <Box
      zIndex="100"
      position="fixed"
      top="0"
      insetStart="0"
      insetEnd="0"
      h="2px"
      bg={`${colorScheme}.400`}
    >
      <Text
        position="fixed"
        top="0"
        insetStart="4"
        bg={`${colorScheme}.400`}
        color={`${colorScheme}.900`}
        fontSize="0.6rem"
        fontWeight="bold"
        px="1"
        borderBottomStartRadius="sm"
        borderBottomEndRadius="sm"
        textTransform="uppercase"
      >
        {envName}
      </Text>
    </Box>
  );
};

const AppHead = () => {
  const theme = useTheme();

  return (
    <Head>
      <title>Start REPO</title>
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,viewport-fit=cover"
      />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="apple-mobile-web-app-capable" content="yes"></meta>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/safari-pinned-tab.svg"
        color={theme.colors.gray?.['800']}
      />
      <meta
        name="msapplication-TileColor"
        content={theme.colors.gray?.['800']}
      />
      <meta name="theme-color" content={theme.colors.gray?.['800']} />
    </Head>
  );
};

const App = ({ Component, pageProps }) => {
  return (
    <Providers>
      <AppHead />
      <ErrorBoundary>
        <Viewport>
          <Component {...pageProps} />
        </Viewport>
        <AppDevHint />
      </ErrorBoundary>
    </Providers>
  );
};

function getBaseUrl() {
  if (isBrowser) {
    return '';
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
      transformer,
      queryClientConfig: {
        defaultOptions: {
          queries: {
            retry: (failureCount, error: any) => {
              const trcpErrorCode = error?.data?.code as TRPCError['code'];
              if (trcpErrorCode === 'NOT_FOUND') {
                return false;
              }
              if (failureCount < 3) {
                return true;
              }
              return false;
            },
          },
        },
      },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(App);
