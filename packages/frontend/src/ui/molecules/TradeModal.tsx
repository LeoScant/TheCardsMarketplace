import { ICard } from "@/src/interfaces/card.interface";
import Modal from "../atoms/Modal";
import { useMemo, useState } from "react";
import Icon from "../atoms/Icon";
import { DEFAULT_IMAGE_URL, isValidUrl } from "@/src/utils/general.utils";
import CardTradeDisplay from "./CardTradeDisplay";
import { useWriteContract } from 'wagmi';
import contractABI from '../../utils/TheCardsEmporiumContractAbi.json';
import { createTrade } from "@/src/services/trades.api";

export default function TradeModal({ isOpen, closeModal, wantedCard, ownedCards, selectedCardId, setSelectedCardId }: { isOpen: boolean, closeModal: any, wantedCard?: ICard, ownedCards?: ICard[], selectedCardId?: number, setSelectedCardId?: any }) {
    const { writeContractAsync } = useWriteContract()
    const [isLoading, setIsLoading] = useState(false)

    const trade = async () => {
        if (selectedCard?.tokenId && wantedCard?.id && selectedCardId) {
            try {
                await writeContractAsync({
                    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
                    abi: contractABI,
                    functionName: 'approve',
                    args: [process.env.NEXT_PUBLIC_CONTRACT_OWNER_ADDRESS, selectedCard?.tokenId]
                })

                await createTrade(selectedCardId, wantedCard.id)
            } catch (e) {
                console.log(e)
            }
        }
    }

    const onConfirmTrade = async () => {
        setIsLoading(true);
        await trade();
        setIsLoading(false);
        closeModal();
    }

    const url = useMemo(() => {
        return wantedCard?.imageurl && isValidUrl(wantedCard?.imageurl) ? wantedCard?.imageurl : DEFAULT_IMAGE_URL;
    }, [wantedCard?.imageurl]);

    const [selectedCard, urlSelected] = useMemo(() => {
        const selectedCard = ownedCards?.find(card => card.id === selectedCardId);
        const urlSelected = selectedCard?.imageurl && isValidUrl(selectedCard?.imageurl) ? selectedCard?.imageurl : DEFAULT_IMAGE_URL;
        return [selectedCard, urlSelected];
    }, [selectedCardId])

    return (
        <Modal isOpen={isOpen} closeModal={closeModal} title='Trade' onConfirm={onConfirmTrade} disableConfirm={isLoading}>
            <div className="flex items-center justify-center">
                {isLoading ?
                    <p className="text-black">Loading</p> :
                    <>
                        <CardTradeDisplay imageUrl={url} title="You ask:" />
                        <Icon type="trade" onClick={() => { }} className="text-black w-16 h-16" />
                        <CardTradeDisplay
                            imageUrl={urlSelected}
                            title="You offer:"
                            showSelector={true}
                            ownedCards={ownedCards}
                            selectedCardId={selectedCardId}
                            setSelectedCardId={setSelectedCardId}
                        />
                    </>
                }
            </div>
        </Modal>
    )
}