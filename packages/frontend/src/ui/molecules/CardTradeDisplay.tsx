import Image from 'next/image'
import Select from '../atoms/Select'
import { useEffect } from 'react'
interface ICardTradeDisplay {
    imageUrl: string,
    title: string,
    showSelector?: boolean,
    ownedCards?: any[],
    selectedCardId?: number,
    setSelectedCardId?: any
}

export default function CardTradeDisplay({ imageUrl, title, showSelector, ownedCards, selectedCardId, setSelectedCardId }: ICardTradeDisplay) {
    useEffect(() => {
        if (ownedCards?.length) {
            setSelectedCardId(ownedCards[0].id);
        }
    }, [ownedCards])

    return (
    <div className="w-80">
        <div className='flex justify-between'>
        <h1 className="text-black my-3">{title}</h1>
        {showSelector && (
            <div className="flex items-center justify-between mb-2">
                <Select
                    options={ownedCards?.map(card => ({ key: card.title, value: card.id }))}
                    setValue={(value) => { setSelectedCardId(parseInt(value)) }}
                    value={selectedCardId}
                />
            </div>
        )}
        </div>
        
        <Image
            src={imageUrl}
            className="w-full object-cover"
            width={600}
            height={100}
            alt='card image'
        />
    </div>
    )
}
