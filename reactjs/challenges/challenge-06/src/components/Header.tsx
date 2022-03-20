import {
	Box, Flex, Button, useDisclosure, Image, useMediaQuery
} from '@chakra-ui/react';

import { ModalAddImage } from './Modal/AddImage';

export function Header(): JSX.Element {
  const { onOpen, isOpen, onClose } = useDisclosure();
	const [isMobileDevice] = useMediaQuery('(max-width:860px)')

  return (
    <>
      <Box bgColor="pGray.800">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          maxW="100vw"
          mx="auto"
          px={20}
          py={6}
        >
          <Image src="logo.svg" h={10} />
          <Button as="button" onClick={() => onOpen()}>
            {isMobileDevice ? '+' : 'Adicionar imagem'}
          </Button>
        </Flex>
      </Box>

      <ModalAddImage isOpen={isOpen} onClose={onClose} />
    </>
  );
}
