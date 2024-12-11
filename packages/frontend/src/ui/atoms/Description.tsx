export default function Description({ label, value }: { label: string, value: string }) {
    return (
        <div className='flex py-2 space-x-2 items-end'>
            <h1 className="text-black text-xl font-bold">{label}:</h1>
            <p className="text-black text-xl">{value}</p>
        </div>
    )
}