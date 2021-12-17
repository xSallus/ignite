/* eslint-disable @next/next/link-passhref */
import Link from 'next/link'
import { Text, Image, Flex, VStack, Link as ChakraLink } from '@chakra-ui/react'
import { useBreakpoints } from '../../styles/breakpoints'
import { LinkProps } from '../../@types'

function ContinentLink({continent}: LinkProps) {
  const { swiperContainerBreakpoint } = useBreakpoints();
  return (
    <Link href={`/continents/${continent.uid}`}>
      <ChakraLink as="a">
        <Flex
          w={1240}
          maxW="100vw"
          h={swiperContainerBreakpoint}
          pos="relative"
          align="center"
          justify="center"
          ml={0}
        >
          <Flex
            direction="column"
            pos="fixed"
            zIndex={99}
            w={1240}
            maxW="100vw"
            h={swiperContainerBreakpoint}
            top={0}
            left={0}
            bg="black.half"
            justify="center"
          >
            <VStack spacing={4}>
              <Text as="h1" fontWeight="bold" fontSize={{ base: 24, xl: 48 }} color="white">{continent.data.name}</Text>
              <Text color="info.light" fontWeight="bold" fontSize={{ base: 14, xl: 24 }}>{continent.data['description-short']}</Text>
            </VStack>
          </Flex>
          <Image
            src={continent.data.banner}
            w={1240}
            maxW="100vw"
            h={swiperContainerBreakpoint}
            alt={continent.data.name}
          />
        </Flex>
      </ChakraLink>
    </Link>
  )
}

export { ContinentLink }