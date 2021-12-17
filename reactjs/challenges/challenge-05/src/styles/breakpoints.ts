import { useBreakpointValue, useMediaQuery } from '@chakra-ui/react'

function useBreakpoints() {
  const swiperContainerBreakpoint = useBreakpointValue({ base: 250, xl: 450});
  const comeOnTextBreakpoint = useBreakpointValue({ base: 20, xl: 36});

  const homeBannerAirplaneBreakpoint = useBreakpointValue({ base: 'none', xl: 'block' });
  const homeBannerPadding = useBreakpointValue({ base: '32px', xl: '140px' });
  const homeBannerHeight = useBreakpointValue({ base: '200px', xl: '335px'})

  const tripRelatedGridColumnsBreakpoint = useBreakpointValue({ base: 2, xl: 5 });
  const tripRelatedGridSpaceBreakpoint = useBreakpointValue({ base: 50, xl: 130 });
  const [isSmallThenTablet] = useMediaQuery('(max-width: 1024px)');

  return { 
    // Home breakpoints
    swiperContainerBreakpoint,
    comeOnTextBreakpoint,
    isSmallThenTablet,
    tripRelatedGridSpaceBreakpoint,
    tripRelatedGridColumnsBreakpoint,
    homeBannerAirplaneBreakpoint,
    homeBannerPadding,
    homeBannerHeight,

    //Continent Page Breakpoints
  };
}

export { useBreakpoints }
