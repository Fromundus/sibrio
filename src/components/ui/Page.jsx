import React from 'react'

const Page = ({ children, className }) => {
  return (
    <div className={`${className} p-6`}>
      {children}
    </div>
  )
}

export default Page
