import clsx from "clsx"

export default function Button({ label, onClick = () => { }, className, disabled = false, active }: { label: string, onClick?: () => void, className?: string, disabled?: boolean, active?: boolean }) {
    return (
        <button
            className={clsx('mx-2 p-2 border-2',
                !active ?
                    'border-white bg-black text-white rounded' :
                    'border-black bg-white text-black rounded',
                disabled && 'opacity-50 cursor-not-allowed',
                className
            )}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    )
}