import { SimpleGrid } from '@chakra-ui/react'
import { Wrapper } from './Wrapper'
import { useBreakpoints } from '../../styles/breakpoints'

function TripRelated() {
  const {
    tripRelatedGridSpaceBreakpoint,
    tripRelatedGridColumnsBreakpoint,
  } = useBreakpoints();

  return (
    <SimpleGrid
      position="relative"
      alignItems="center"
      spacing={tripRelatedGridSpaceBreakpoint}
      columns={tripRelatedGridColumnsBreakpoint}
      my={{ base: '1rem', xl: '0' }}
      px={{ base: '1rem',  xl: '140px' }}
      pt={{ base: '1rem', xl : '80px' }}
      pb={0}
      w={{ base: 275, xl: '100vw' }}
    >
      <Wrapper icon="/cocktail.svg">Night life</Wrapper>
      <Wrapper icon="/surf.svg">Beach</Wrapper>
      <Wrapper icon="/building.svg">Modern</Wrapper>
      <Wrapper icon="/museum.svg">Classic</Wrapper>
      <Wrapper icon="/earth.svg">and more..</Wrapper>
    </SimpleGrid>
  )
}

export { TripRelated }
