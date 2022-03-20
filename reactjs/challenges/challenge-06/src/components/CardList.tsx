import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

export interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

type HandleViewImageFn = (url: string) => void;

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [selectedImgUrl, setSelectedImgUrl] = useState('');

  const handleViewImage: HandleViewImageFn = url => {
		setSelectedImgUrl(url)
		onOpen()
	};

  return (
    <>
      <SimpleGrid>
        {cards.map(card => (
          <Card key={card.id} data={card} viewImage={handleViewImage} />
        ))}
      </SimpleGrid>

      <ModalViewImage
        isOpen={isOpen}
        onClose={onClose}
        imgUrl={selectedImgUrl}
      />
    </>
  );
}
