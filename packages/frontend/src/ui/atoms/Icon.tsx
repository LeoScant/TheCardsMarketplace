import { ArrowsRightLeftIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { HeartIcon as EmptyHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as FullHeartIcon } from "@heroicons/react/24/solid";
import { MinusCircleIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/24/outline";


export default function Icon({ type, onClick, className }: { type: string, onClick: () => void, className?: string }) {
    switch (type) {
        case "full-heart":
            return <FullHeartIcon className={`h-8 w-8 text-red-500 ${className}`} onClick={onClick} data-testid={`${type}-icon`}/>;
        case "empty-heart":
            return <EmptyHeartIcon className={`h-8 w-8 text-black ${className}`} onClick={onClick} data-testid={`${type}-icon`}/>;
        case "delete":
            return <MinusCircleIcon className={`h-8 w-8 text-black ${className}`} onClick={onClick} data-testid={`${type}-icon`}/>;
        case "add":
            return <PlusCircleIcon className={`h-8 w-8 text-black ${className}`} onClick={onClick} data-testid={`${type}-icon`}/>;
        case "trade":
            return <ArrowsRightLeftIcon className={`h-8 w-8 text-black ${className}`} onClick={onClick} data-testid={`${type}-icon`}/>;
        default:
            return <EmptyHeartIcon className={`h-8 w-8 text-black ${className}`} onClick={onClick} data-testid={`${type}-icon`}/>;
    }
}