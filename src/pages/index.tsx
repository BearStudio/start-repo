import React, { useEffect } from 'react';

import { Center } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Loader } from '@/app/layout';

const Index = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/app');
  }, [router]);

  return (
    <>
      <Head>
        <title>Start REPO</title>
      </Head>
      <Center flex="1">
        <Loader />
      </Center>
    </>
  );
};
export default Index;
