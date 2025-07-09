import React from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ id, name, type, value, onChange, disabled, className, error, placeholder }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(prev => !prev);
  }

  function capitalizeFirstLetter(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className={`${className} relative flex flex-col`}>
      <div className='flex w-full flex-col gap-1'>
        <label className='text-white' htmlFor={id}>{capitalizeFirstLetter(placeholder)}</label>
        <input
          id={id}
          className={`rounded-lg w-full h-11 bg-background border border-border placeholder:text-textSecondary`}
          name={name}
          type={type === "password" ? showPassword ? "text" : "password" : type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={capitalizeFirstLetter(placeholder)}
        />
        {type === "password" &&
          <div className='absolute right-3 top-9 text-xl'>
            {showPassword ? 
              <FaRegEye onClick={handlePasswordToggle} /> 
              : 
              <FaRegEyeSlash onClick={handlePasswordToggle} />
            }
          </div>
        }
      </div>
      {error && <span className='text-red-500 mt-1'>{error}</span>}
    </div>
  )
}

export default Input
