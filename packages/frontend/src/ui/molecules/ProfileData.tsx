import { IUser } from "@/src/interfaces/card.interface";
import Button from "../atoms/Button";
import { useMemo, useState } from "react";
import useStore from "@/src/store/store";

export default function ProfileData({ user}: { user: IUser }) {
    const trades = useStore((state: any) => state.trades)

    return (
        <div>
            <div className="flex items-center space-x-2 mb-4">
                <h1 className="text-2xl font-bold">Your Profile</h1>
                <p className="text-xl">[{user?.walletAddress}]</p>
            </div>
            <div className="flex items-center space-x-2 mb-4">
                <h1 className="text-xl">Your have {trades?.length || 0} trade offers</h1>
                {trades?.length > 0 && <Button label='Show' onClick={() => useStore.getState().setIsOpenTradeOffersModal(true)} />}
            </div>
        </div>
    )
}
