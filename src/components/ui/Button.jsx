import React from 'react'
import { ImSpinner8 } from "react-icons/im";

const Button = ({ className, label, disabled, loading, type, onClick, appearance }) => {
  return (
    <button
      className={`${className} ${appearance === "submit" && "bg-primary text-white"} ${disabled && "cursor-not-allowed"} h-11 font-[700] px-5 hover:opacity-90 transition text-[14px] rounded-md py-2 font-nunito flex items-center gap-1.5`}
      style={{boxShadow: "rgba(0, 0, 0, 0.25) 0px -2px 0px inset, rgba(255, 255, 255, 0.25) 0px 1.5px 0px inset", padding: "0.5rem 1rem"}}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {loading && <ImSpinner8 className='animate-spin' />}
      {label}
    </button>
  )
}

export default Button
