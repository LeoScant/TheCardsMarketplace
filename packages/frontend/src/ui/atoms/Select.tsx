interface ISelect {
    options?: {key: string, value: string | number}[],
    label?: string,
    value?: string | number,
    setValue: (value: string) => void

}
export default function Select({options=[], label, value='', setValue}: ISelect) {
    return (
        <div>
          {label && <label htmlFor={label} className="block text-sm font-medium leading-6 text-gray-900">
            {label}
          </label>}
          <select
            id={label}
            name={label}
            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={value ?? ''}
            onChange={(e) => {setValue(e.target.value)}}
            
          >
            {options?.map(opt => <option key={opt.value} value={opt.value}>{opt.key}</option>)}
          </select>
        </div>
      )
}