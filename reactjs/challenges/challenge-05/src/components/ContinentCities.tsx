import { Container, SimpleGrid, VStack, Text } from '@chakra-ui/react'
import { CityCard } from './CityCard'
import { ContinentCitiesProps } from '../@types'

function ContinentCities({ cities }: ContinentCitiesProps) {
  return (
    <Container w={1160} maxW="100vw" my="8">
      <VStack spacing={8}>
        <Text as="h1" mr="auto" fontSize="36">Cities +100</Text>
        <SimpleGrid w={1160} maxW="100vw" gap={{ base: 8, xl: 0 }} columns={{base: 1, xl: 4}}>
          {cities.map(city => (<CityCard key={city['city-name']} city={city} />))}
        </SimpleGrid>
      </VStack>
    </Container>
  )
}

export { ContinentCities }