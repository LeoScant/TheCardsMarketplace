'use client';
import Wrapper from "@/src/config/wrapper";
import { ICard } from "@/src/interfaces/card.interface";
import { createCard, deleteCard } from "@/src/services/cards.api";
import useStore from "@/src/store/store"
import Modal from "@/src/ui/atoms/Modal";
import AddCardModal from "@/src/ui/molecules/AddCardModal";
import CardsList from "@/src/ui/molecules/CardsList";
import ProfileData from "@/src/ui/molecules/ProfileData";
import TradeOfferModal from "@/src/ui/molecules/TradeOfferModal";
import { useState } from "react";

export default function User() {
    const user = useStore((state: any) => state.user)
    const isOpenTradeOffersModal = useStore((state: any) => state.isOpenTradeOffersModal)
    const lastTradeOffer = useStore((state: any) => state.trades?.[0])
    const [isOpenWaitingModal, setIsOpenWaitingModal] = useState(false)

    const [openAddCardModal, setOpenAddCardModal] = useState(false)
    const [card, setCard] = useState({title: '', description: '', imageurl: ''} as ICard)

    const onCloseAddCardModal = () => {
        setOpenAddCardModal(false)
        setCard({title: '', description: '', imageurl: ''} as ICard)
    }

    const addCardConfirm = async () => {
        await createCard(card)
        onCloseAddCardModal()
    }

    const onDeleteCard = async (cardId: number) => {
        setIsOpenWaitingModal(true)
        await deleteCard(cardId)
        setIsOpenWaitingModal(false)
    }

    return (
        <Wrapper>
            <div className="mx-10 mt-5">
                <ProfileData user={user}/>
                <CardsList
                    cards={user?.ownedCards}
                    likedCards={user?.likedCards}
                    title="Your Cards"
                    canEdit={true}
                    onDeleteCard={onDeleteCard}
                    canAdd={true}
                    onAddCard={()=>{setOpenAddCardModal(true)}}
                />
                <CardsList
                    cards={user?.likedCards}
                    likedCards={user?.likedCards}
                    title="Liked Cards"
                />
            </div>
            <AddCardModal isOpen={openAddCardModal} closeModal={onCloseAddCardModal} card={card} setCard={setCard} onConfirm={addCardConfirm}  />
            <TradeOfferModal 
                isOpen={isOpenTradeOffersModal} 
                closeModal={() => useStore.getState().setIsOpenTradeOffersModal(false)}
                yourCard={lastTradeOffer?.cardToRel}
                hisCard={lastTradeOffer?.cardFromRel}
                tradeId={lastTradeOffer?.id}
            />
            <Modal isOpen={isOpenWaitingModal} closeModal={() => setIsOpenWaitingModal(false)} disableConfirm={true} title='Burning' onConfirm={()=>{}}>
                <h1 className="text-black">Burning</h1>
            </Modal>

        </Wrapper>
    )
}