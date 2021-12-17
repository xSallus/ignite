import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<Card[]>(
    'images',
    async () => {
      const response = await api.get('api/images');
      const results: Card[] = response.data.data ?? [];
      return results;
    }
    // TODO GET AND RETURN NEXT PAGE PARAM
  );

  const formattedData = useMemo<Card[]>(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
    const results: Card[] = data?.pages[0] ?? [];
    return results;
  }, [data]);

  if (isLoading && !isFetchingNextPage) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />
      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button as="button" type="button" onClick={() => fetchNextPage()}>
            Carregar mais
          </Button>
        )}
      </Box>
    </>
  );
}
