import React from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { FaCheck, FaCrown, FaRegCopy } from "react-icons/fa6";
import Button from '../components/ui/Button';
import image from '../assets/brad.avif';
import logo from '../assets/logo.png';
import { motion } from "framer-motion";

import ct from "../assets/csgoect.png";
import t from "../assets/csgoet.png";

import m4 from "../assets/guns/m4.png";
import awp from "../assets/guns/awp.png";
import crate from "../assets/guns/crate.png";
import crate2 from "../assets/guns/crate2.png";
import deagle from "../assets/guns/deagle.png";
import karambit from "../assets/guns/karambit.png";
import ak47 from "../assets/guns/ak47.webp";

const Landing = () => {
  const { settings } = useOutletContext();
  const navigate = useNavigate();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
      settings?.referral_code && navigator.clipboard.writeText(settings?.referral_code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 10000); // Reset after 2s
      });
  };

  return (
    // <div className="w-full flex flex-col items-center gap-4">
    //   <div className="mt-20">
    //       <h1 className="text-6xl text-primary font-extrabold">SIBIRO</h1>
    //   </div>

    //   <span className='text-white mt-4'>Enjoy juicy rewards & VIP perks everyday for playing under the code DRWGAMBA</span>
    // </div>

    <div className="w-full flex flex-col items-center gap-4 text-center p-6 z-50 bg-gradient-to-b from-background via-surface to-primaryHover min-h-[100svh]">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full flex justify-center flex-col items-center"
      >
        <img 
          className='w-full max-w-md mx-auto' 
          loading='lazy' 
          src={logo} 
          alt=""
        />
        {/* <h1 className="text-8xl text-primary font-extrabold tracking-wide">SIBRIO</h1> */}
        {settings?.referral_code && <span className="text-white max-w-sm z-50 text-center mx-auto">
            <strong className="text-tertiary text-lg">Enjoy rewards</strong> and exclusive bonuses, {settings?.leaderboard_type} when you play under the code <span className='font-bold uppercase'>{settings?.referral_code}</span>.
        </span>}
        <div className="flex flex-col sm:flex-row items-center gap-4 z-50 pb-6 mt-4">
          <Button
            className={"bg-accent text-white"}
            label={<span className='flex items-center gap-2'>LEADERBOARDS <FaCrown /></span>}
            onClick={() => navigate('/leaderboards')}
          />
        </div>
      </motion.div>

      
      <div className='hidden lg:block opacity-85'>
        <motion.img    
            className="absolute top-20 left-72 w-20"
            animate={{ 
                y: [0, -15, 0],
                rotate: [0, 20, -5, 0] // Slight rotation for a subtle sway effect
            }}
            transition={{ 
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
            }}
            src={ct}
            alt=""
        />

        <motion.img    
            className="absolute top-72 right-24 w-20"
            animate={{ 
                y: [0, -15, 0],
                rotate: [0, 5, -10, 0] // Slight rotation for a subtle sway effect
            }}
            transition={{ 
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
            }}
            src={t}
            alt=""
        />

        <motion.img    
            className="absolute top-[420px] left-14 w-20"
            animate={{ 
                y: [0, -15, 0],
                rotate: [0, 10, -10, 0] // Slight rotation for a subtle sway effect
            }}
            transition={{ 
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
            }}
            src={t}
            alt=""
        />

        <motion.img    
            className="absolute top-60 left-24 w-72"
            animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0, 0] // Slight rotation for a subtle sway effect
            }}
            transition={{ 
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
            }}
            src={awp}
            alt=""
        />

        <motion.img    
            className="absolute top-20 right-52 w-52"
            animate={{ 
                y: [0, -5, 0],
                rotate: [0, 2, 0, 0] // Slight rotation for a subtle sway effect
            }}
            transition={{ 
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
            }}
            src={crate}
            alt=""
        />

        <motion.img    
            className="absolute top-[450px] right-24 w-64"
            animate={{ 
                y: [0, 5, 0],
                rotate: [0, 0, 3, 0] // Slight rotation for a subtle sway effect
            }}
            transition={{ 
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
            }}
            src={ak47}
            alt=""
        />

        <motion.img    
            className="absolute top-[550px] left-52 w-48"
            animate={{ 
                y: [0, -10, 0],
                rotate: [0, 0, -3, 0] // Slight rotation for a subtle sway effect
            }}
            transition={{ 
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
            }}
            src={karambit}
            alt=""
        />
      </div>
    </div>

  )
}

export default Landing
