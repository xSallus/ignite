import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { CityCardProps } from '../@types'

function CityCard({ city }: CityCardProps) {
  return (
    <Box w={256} h={279} mx={{ base: 'auto', xl: 0}}>
      <Image w="100%" h={173} borderTopRadius={6} src={city['city-banner']} alt="city banner" />
      <Flex
        align="center"
        bg="white"
        borderBottomRadius={6}
        borderColor="highlight.half"
        borderTopWidth={0}
        borderBottomWidth={1}
        borderLeftWidth={1}
        borderRightWidth={1}
        justify="space-between"
        p="6"
      >
        <Text fontWeight="semi-bold" fontSize={20}>
          {city['city-name']}
          <br />
          <Text as="span" fontWeight="medium" color='info.dark' fontSize={16}>{city['country-name']}</Text>
        </Text>
        <Image w={30} h={30} borderRadius={60} src={city['country-flag']} alt="city banner" />
      </Flex>
    </Box>
  )
}

export { CityCard }