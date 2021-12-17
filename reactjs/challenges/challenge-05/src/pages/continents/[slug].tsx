/* eslint-disable @next/next/link-passhref */
import { useState, useEffect } from 'react'
import type { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import { Text, Flex, Stack, HStack, VStack, Wrap, SkeletonText } from '@chakra-ui/react'
import Prismic from "@prismicio/client";
import { Banner } from '../../components/ContinentBanner'
import { Header } from '../../components/Header'
import { ContinentCities } from '../../components/ContinentCities'
import { getPrismicClient } from '../../services/prismic'
import { Continent, ContinentProps } from '../../@types'

const ContinentPage: NextPage<ContinentProps> = ({ continent }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 4000);
  }, [])

  return (
    <>
      <Head>
        <title>{continent.data.name} | WorldTrip&trade;</title>
      </Head>
      {!isLoaded ? (
        <Flex as="main" align="center" justify="center" w="100vw" minH="100vh">
          <SkeletonText isLoaded={isLoaded} noOfLines={10} spacing="4" />
        </Flex>
      ) : (
        <Flex as="main" align="center" flexDir="column" w="100vw" minH="100vh">
          <Header path={`/continents/${continent.uid}`} />
          <Banner name={continent.data.name} bg={continent.data.banner} />
          <Flex
            w={1160}
            maxW="100vw"
            align="flex-start"
            px={{ base: 4, xl: 0 }}
            my={{ base: '8', xl: '20' }}
          >
            <Stack
              direction={{ base: 'column', xl: 'row' }}
              spacing={{ base: '5', xl: '20' }}
            >
              <Text w={{ base: 'auto', xl: 600 }} fontSize={18} textAlign="justify">{continent.data['description-long']}</Text>
              <HStack spacing="20">
                <Wrap centerContent display="flex" flexDir="column" align="center" h="25" w={{ base: '12', xl: "25" }}>
                  <VStack spacing={2}>
                    <Text as="h1" color="highlight.full" fontSize={{ base: 32, xl: 48 }}>{continent.data.countries}</Text>
                    <Text fontSize={{ base: 16, xl: 18 }}>countries</Text>
                  </VStack>
                </Wrap>
                <Wrap centerContent display="flex" flexDir="column" align="center" h="25" w={{ base: '12', xl: "25" }}>
                  <VStack spacing={2}>
                    <Text as="h1" color="highlight.full" fontSize={{ base: 32, xl: 48 }}>{continent.data.idioms}</Text>
                    <Text fontSize={{ base: 16, xl: 18 }}>idioms</Text>
                  </VStack>
                </Wrap>
                <Wrap centerContent display="flex" flexDir="column" align="center" h="25" w={{ base: '12', xl: "25" }}>
                  <VStack spacing={2}>
                    <Text as="h1" color="highlight.full" fontSize={{ base: 32, xl: 48 }}>{continent.data.cities.length}</Text>
                    <Text fontSize={{ base: 16, xl: 18 }}>cities +100</Text>
                  </VStack>
                </Wrap>
              </HStack>
            </Stack>
          </Flex>
          <ContinentCities cities={continent.data.cities} />
        </Flex>
      )}
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const { results } = await prismic.query(Prismic.Predicates.at('document.type', 'continent'));
  const slugs = results.map(continent => ({
    params: {
      slug: continent.uid,
    },
  }));

  return {
    paths: slugs ?? [],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const uid = params?.slug?.toString() ?? (params?.slug as string);
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('continent', uid, {});

  const continent: Continent = {
    id: response.id,
    uid: response.uid as string,
    data: {
      ...response.data,
      cities: response.data.cities.map((city: any) => ({
        'city-banner': city['city-banner'].url,
        'city-name': city['city-name'][0].text,
        'country-flag': city['city-country-brand'].url,
        'country-name': city['city-country-name'][0].text,
      })),
      name: response.data['name'][0].text,
      'description-long': response.data['description-long'].map((description: any) => description.text),
      'description-short': response.data['description-short'][0]['text'],
      banner: response.data.banner.url,
    },
  };

  return {
    props: {
      continent,
    },
    revalidate: 60 * 60 * 24 * 30,
  }
}

export default ContinentPage
