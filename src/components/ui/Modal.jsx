import { motion } from 'framer-motion'
import React from 'react'
import { IoClose } from 'react-icons/io5'

function Modal({title, onClose, loading, children, className }) {
    return (
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start p-2 sm:p-8 md:p-8 lg:p-8 overflow-y-auto not-printable-components text-sm font-normal ${className}`}
            style={{ zIndex: 1000 }}
            onClick={(e) => e.stopPropagation()}
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-surface rounded-2xl shadow-xl max-w-lg w-full h-auto relative border border-border"
                onClick={(e) => e.stopPropagation()}
            >   
                <div className='flex items-center justify-center w-full relative p-6 border-b border-border'>
                    <span className='font-semibold text-lg'>{title}</span>
                    <button
                        className="absolute right-4 p-2 border border-border rounded-lg hover:bg-background"
                        onClick={onClose}
                        disabled={loading}
                    >
                        <IoClose className="text-xl" />
                    </button>
                </div>
                <div className='p-6'>
                    {children}
                </div>
            </motion.div>
        </div>
    )
}

export default Modal