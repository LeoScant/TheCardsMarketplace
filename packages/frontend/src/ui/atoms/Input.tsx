export default function Input({label, type='text', placeholder, name, value, setValue}: {label: string, type?: string, placeholder: string, name: string, value: string, setValue: any}) {
    return (
      <div>
        <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
        <div className="mt-2">
          <input
            type={type}
            name={name}
            id={name}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder={placeholder || ''}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
    )
  }
  