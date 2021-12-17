import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import { Container, Text, Divider } from '@chakra-ui/react'
import Prismic from "@prismicio/client"
import { getPrismicClient } from '../services/prismic'
import { Swiper } from '../components/Swiper'
import { TripRelated } from '../components/TripRelated'
import { Banner } from '../components/HomeBanner'
import { Header } from '../components/Header'
import { useBreakpoints } from '../styles/breakpoints'
import { ContinentShort, HomeProps } from '../@types'

const Home: NextPage<HomeProps> = (props) => {
  const { comeOnTextBreakpoint } = useBreakpoints();
  return (
    <>
      <Head>
        <title>Home | WorldTrip&trade;</title>
      </Head>
      <Container as="main" centerContent w="100vw" minH="100vh">
        <Header path="/" />
        <Banner />
        <TripRelated />
        <Divider h={{ base: 0.35, xl: 0.5 }} w={85} borderRadius={85} bg="headings.dark" mx="auto" my="2rem" />
        <Text fontWeight="medium" textAlign="center" mb="52px" fontSize={comeOnTextBreakpoint}>Come on?<br />So choose your continent.</Text>
        <Swiper continents={props.continents} />
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const prismic = getPrismicClient();
  const { results } = await prismic.query(Prismic.Predicates.at('document.type', 'continent'));

  const continents: ContinentShort[] = results.map(continent => ({
    id: continent.id,
    uid: continent.uid as string,
    data: {
      name: continent.data['name'][0].text,
      'description-short': continent.data['description-short'][0]['text'],
      banner: continent.data.banner.url,
    },
  }));

  return {
    props: {
      continents,
    }
  }
}

export default Home
