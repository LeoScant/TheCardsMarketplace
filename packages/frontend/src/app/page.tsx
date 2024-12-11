'use client';
import useStore from '../store/store';
import { useEffect, useMemo, useState } from 'react';
import { getCards } from '../services/cards.api';
import Wrapper from '../config/wrapper';
import CardsList from '../ui/molecules/CardsList';
import Slideover from '../ui/molecules/Slideover';
import { ICard } from '../interfaces/card.interface';
import TradeModal from '../ui/molecules/TradeModal';
import TradeOfferModal from '../ui/molecules/TradeOfferModal';

export default function Home() {
  const cards = useStore((state: any) => state.cards)
  const user = useStore((state: any) => state.user)
  const isLoggedIn = useStore((state: any) => state.isLoggedIn)
  const [selectedCard, setSelectedCard] = useState<ICard | undefined>();
  const [openDetails, setOpenDetails] = useState(false);
  const [isOpenTradeModal, setIsOpenTradeModal] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<number>();

  const isTradeAvailable = useMemo(() => {
    return isLoggedIn && selectedCard?.ownerId !== user?.id && user?.ownedCards?.length > 0;
  }, [selectedCard, user])

  const onClickTrade = () => {
    setOpenDetails(false);
    setIsOpenTradeModal(true);
  }

  const onOpenDetails = (card: ICard) => {
    setSelectedCard(card);
    setOpenDetails(true);
  }

  useEffect(() => {
    getCards();
  }, [])

  return (
    <Wrapper>
      <main className="p-10 h-min flex-wrap">
        <CardsList
          cards={cards}
          likedCards={user?.likedCards}
          title="All Cards"
          openDetails={onOpenDetails}
        />

        {selectedCard &&
          <Slideover
            open={openDetails}
            setOpen={setOpenDetails}
            card={selectedCard}
            onClickTrade={onClickTrade}
            isTradeAvailable={isTradeAvailable}
          />}

        <TradeModal
          isOpen={isOpenTradeModal}
          closeModal={() => setIsOpenTradeModal(false)}
          wantedCard={selectedCard}
          ownedCards={user?.ownedCards}
          selectedCardId={selectedCardId}
          setSelectedCardId={setSelectedCardId}
        />
      </main>
    </Wrapper>
  )
}
