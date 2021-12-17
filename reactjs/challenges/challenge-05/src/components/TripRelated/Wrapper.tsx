import { Wrap, Image, HStack, Text } from '@chakra-ui/react'
import { useBreakpoints } from '../../styles/breakpoints'
import { WrapperProps } from '../../@types'

function Wrapper({ icon, children }: WrapperProps) {
  const { isSmallThenTablet } = useBreakpoints();

  return (
    <>
      {isSmallThenTablet ? (
        <Wrap
          display="flex"
          flexDir="row"
          w={135}
        >
          <HStack spacing={2}>
            <Text
              align="center"
              justify="center"
              fontSize={36}
              lineHeight={0}
              color="highlight.full"
            >*</Text>
            <Text
              as="span"
              textAlign="center"
              fontWeight="regular"
              fontSize={18}
              width="fit-content"
              color="headings.dark"
            >
              {children}
            </Text>
          </HStack>
        </Wrap>
      ) : (
        <Wrap display="flex" w={110} direction="column" alignItems="flex-end">
          <Image h={85} w={85} src={icon} alt={children} />
          <Text textAlign="center" fontWeight="regular" fontSize={20} color="headings.dark">
            {children}
          </Text>
        </Wrap>
      )}
    </>
  )
}

export { Wrapper }