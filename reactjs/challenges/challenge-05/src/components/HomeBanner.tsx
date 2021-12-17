import { Flex, Image, Text, Wrap } from '@chakra-ui/react'
import { useBreakpoints } from '../styles/breakpoints'

function Banner() {
  const {
    homeBannerAirplaneBreakpoint,
    homeBannerPadding,
    homeBannerHeight,
  } = useBreakpoints();

  return (
    <Flex bgGradient="linear(to-bl, blue.700, blue.500)" alignItems="center" justify="space-between" px={homeBannerPadding} py="80px" w="100vw" h={homeBannerHeight}>
      <Wrap display="flex" direction="column">
        <Text fontWeight="medium" fontSize={{ base: 20, xl: 36 }} color="headings.light">5 Continents,<br />infinity possibilities.</Text>
        <Text fontWeight="regular" fontSize={{ base: 14, xl: 20 }} color="headings.light">The time has come to make the trip<br />of your dreams.</Text>
      </Wrap>
      <Image h={270.74} w={417.15} display={homeBannerAirplaneBreakpoint} src="/airplane.svg" alt="logo" />
    </Flex>
  )
}

export { Banner }
