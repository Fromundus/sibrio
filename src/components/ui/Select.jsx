import React from 'react'

const Select = ({ name, id, options, onChange, value, placeholder, disabled, defaultOption, error }) => {
  return (
    <div className='flex flex-col gap-1'>
        <label htmlFor={id}>{placeholder}</label>
        <select className={`rounded-lg w-full h-11 border border-border ${value === "" && "text-textSecondary"}`} disabled={disabled} name={name} id={id} onChange={onChange} value={value}>
            <option value={defaultOption.value} className='text-textSecondary'>{defaultOption.name}</option>
            {options?.map((item) => {
                return (
                    <option className='text-white' key={item.value} value={item.value}>{item.name}</option>
                )
            })}
        </select>
        {error && <span className='text-red-500 mt-1'>{error}</span>}
    </div>
  )
}

export default Select
