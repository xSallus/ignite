/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { Card } from '../components/CardList';

type QueryData = {
  data: Card[];
  after: any;
};

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    async () => {
      const res = await api.get<QueryData>('http://localhost:3000/api/images');
      return res.data;
    }
    // TODO: GET AND RETURN NEXT PAGE PARAM
  );

  const formattedData = useMemo(() => {
    const flattenedQueryArray = data?.pages[0].data;
    return flattenedQueryArray;
  }, [data]);

  if (isError) {
    return <Error />;
  }

  if (isLoading && !isFetchingNextPage) {
    return <Loading />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && <Button as="button">Carregar mais</Button>}
      </Box>
    </>
  );
}
