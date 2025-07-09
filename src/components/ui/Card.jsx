import React from 'react'
import { motion } from 'framer-motion';

const Card = ({ children, title, tcenter, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "backInOut" }}
      className={`${className} max-w-xl mx-auto p-6 bg-surface border border-border text-white rounded-xl flex flex-col gap-4`}
    >
        <h1 className={`text-2xl font-bold flex w-full ${tcenter && "text-center justify-center"}`}>{title}</h1>
        <div>
            {children}
        </div>
    </motion.div>
  )
}

export default Card
