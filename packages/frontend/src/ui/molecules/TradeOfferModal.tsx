import { ICard } from "@/src/interfaces/card.interface";
import Modal from "../atoms/Modal";
import CardTradeDisplay from "./CardTradeDisplay";
import { DEFAULT_IMAGE_URL, isValidUrl } from "@/src/utils/general.utils";
import { useMemo, useState } from "react";
import Icon from "../atoms/Icon";
import { useWriteContract } from "wagmi";
import contractABI from '../../utils/TheCardsEmporiumContractAbi.json';
import { acceptTrade } from "@/src/services/trades.api";

interface ITradeOfferModal {
    isOpen: boolean;
    closeModal: () => void;
    yourCard: ICard;
    hisCard: ICard;
    tradeId: number;
}

export default function TradeOfferModal({ isOpen, closeModal, yourCard, hisCard, tradeId }: ITradeOfferModal) {
    const { writeContractAsync } = useWriteContract()
    const [isLoading, setIsLoading] = useState(false)
    const [isApproving, setIsApproving] = useState(false)
    const yourCardImageurl = useMemo(() => {
        return yourCard?.imageurl && isValidUrl(yourCard?.imageurl) ? yourCard?.imageurl : DEFAULT_IMAGE_URL;
    }, [yourCard]);

    const hisCardImageurl = useMemo(() => {
        return hisCard?.imageurl && isValidUrl(hisCard?.imageurl) ? hisCard?.imageurl : DEFAULT_IMAGE_URL;
    }, [hisCard]);
    
    /**
     * Approves a trade offer by calling the 'approve' function on the contract.
     * @returns {Promise<void>} A promise that resolves when the approval is successful.
     */
    const approve = async (): Promise<void> => {
        try {
            setIsLoading(true);
            setIsApproving(true)
            await writeContractAsync({
                address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
                abi: contractABI,
                functionName: 'approve',
                args: [process.env.NEXT_PUBLIC_CONTRACT_OWNER_ADDRESS, yourCard?.tokenId]
            })
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const trade = async () => {
        await acceptTrade(tradeId)
    }

    const onConfirmTrade = async () => {
        try {
            setIsLoading(true);
            if (!isApproving) await approve()
            else {
                await trade()
                setIsApproving(false)
                closeModal();
            }
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal isOpen={isOpen} closeModal={closeModal} title='Trade' onConfirm={onConfirmTrade} disableConfirm={isLoading}>
            <div className="flex items-center justify-center">
                {isLoading ?
                    <p className="text-black">Loading</p> :
                    isApproving ?
                        <p className="text-black">Wait for transaction to be approved and then press Confirm</p> :
                        <>
                            <CardTradeDisplay imageUrl={yourCardImageurl} title="You give:" />
                            <Icon type="trade" onClick={() => { }} className="text-black w-16 h-16" />
                            <CardTradeDisplay imageUrl={hisCardImageurl} title="You get:" />
                        </>
                }
            </div>
        </Modal>
    )
}