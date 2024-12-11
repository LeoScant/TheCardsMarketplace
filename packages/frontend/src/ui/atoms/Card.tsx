import Image from 'next/image';
import React, { useMemo } from 'react';
import Icon from './Icon';
import { DEFAULT_IMAGE_URL, isValidUrl } from '@/src/utils/general.utils';

type CardProps = {
    imageUrl: string;
    title: string;
    description: string;
    altText?: string;
    like?: boolean;
    onClickCard?: () => void;
    onClickLike?: () => void;
    canEdit?: boolean;
    onDelete?: () => void;
};

export default function Card({ imageUrl, title, description, altText = "card image", like = false, onClickLike = () => { }, onClickCard = () => { }, canEdit=false, onDelete=()=>{} }: CardProps) {
    // If the image url is not a valid url, use a default image
    const url = useMemo(() => {
        return imageUrl && isValidUrl(imageUrl) ? imageUrl : DEFAULT_IMAGE_URL;
    }, [imageUrl]);

    return (
        <div className="p-4" onClick={onClickCard}>
            <div className="max-w-sm mx-auto shadow-lg rounded-lg overflow-hidden">
                <div className="flex justify-end relative top-0 right-0">
                    {like ?
                        <Icon type='full-heart' onClick={onClickLike} className="absolute top-2 right-2 cursor-pointer hover:text-red-400" /> :
                        <Icon type='empty-heart' onClick={onClickLike} className="absolute top-2 right-2 cursor-pointer hover:text-red-600" />
                    }
                    <Image 
                        src={url}
                        className="h-48 object-top object-cover"
                        width={300}
                        height={100}
                        alt={altText}
                    />
                </div>

                <div className="p-4 bg-white">
                    <div className='flex justify-between'>
                        <h1 className="text-2xl font-semibold mb-3 text-black">{title}</h1>
                        {canEdit && <Icon type='delete' className="cursor-pointer text-red-600" onClick={onDelete} />}
                    </div>
                    <p className="text-black">{description}</p>
                </div>
            </div>
        </div>
    );
}