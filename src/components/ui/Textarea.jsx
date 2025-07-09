import React from 'react'

const Textarea = ({ name, id, onChange, value, placeholder, disabled, error }) => {
  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor={id}>{placeholder}</label>
      <textarea className='bg-background w-full rounded-lg border border-border placeholder:text-textSecondary' disabled={disabled} onChange={onChange} value={value} name={name} placeholder={placeholder} id={id}></textarea>
      {error && <span className='text-red-500 mt-1'>{error}</span>}
    </div>
  )
}

export default Textarea
