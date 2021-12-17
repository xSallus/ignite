import { Flex, Text, Image } from '@chakra-ui/react'
import { ContinentBannerProps } from '../@types'

function Banner({name, bg}: ContinentBannerProps) {
  return (
    <Flex
      align={{ base: 'center', xl: 'flex-end' }}
      justify={{ base: 'center', xl: 'flex-start' }}
      w="100vw"
      h={{ base: '150px', xl: '450px' }}
      pb={{ base: 0, xl: '14' }}
      pl={{ base: 0, xl: '36' }}
      pos="relative"
    >
      <Text
        color="headings.light"
        fontSize={{ base: 28, xl: 48 }}
        zIndex={99}
      >{name}</Text>

      <Image
        pos="absolute"
        src={bg}
        alt={name}
        top={0}
        left={0}
        w="100vw"
        h={{ base: '150px', xl: '450px' }}
      />
    </Flex>
  )
}

export { Banner }