import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay w="100%" h="100%" p={0}>
        <ModalContent
          // p={0}
          w={{ base: '100vw', xl: 800 }}
          h={{ base: 'auto', xl: 562 }}
          display="flex"
          flexDir="column"
          ml={-300}
        >
          <ModalBody
            w={{ base: '100vw', xl: 800 }}
            h={{ base: 'auto', xl: 534 }}
            p={0}
          >
            <Image src={imgUrl} w="100%" h="100%" alt="Detailed image" />
          </ModalBody>
          <ModalFooter
            w={{ base: '100vw', xl: 800 }}
            h={{ base: 'auto', xl: 32 }}
            display="flex"
            flexDir="row"
            align="center"
            justify="left"
            bg="pGray.800"
          >
            <Link href={imgUrl} as="a" target="__blank">
              Abrir original
            </Link>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
