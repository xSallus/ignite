/* eslint-disable react/jsx-no-bind */
import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [currentImageInView, setCurrentImageInView] = useState('');

  function handleViewImage(url: string): void {
    setCurrentImageInView(url);
    onOpen();
  }

  return (
    <>
      <SimpleGrid>
        {cards.map(card => (
          <Card key={card.id} data={card} viewImage={handleViewImage} />
        ))}
      </SimpleGrid>

      <ModalViewImage
        onClose={onClose}
        isOpen={isOpen}
        imgUrl={currentImageInView}
      />
    </>
  );
}
