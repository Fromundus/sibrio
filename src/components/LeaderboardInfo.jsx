import React from "react";
import csgoempirelogo from "../assets/csgoempirelogo.png";
import { motion } from "framer-motion";
import coins from "../assets/coins.png"
import { format, formatDistanceToNow } from "date-fns";
import CountdownTimer from "../components/CountdownTimer";
import CodeLink from "./CodeLink";

const LeaderboardInfo = ({ settings, leaderboard, setLoading }) => {
    return (
        <div className="flex flex-col gap-4 w-full items-center justify-center text-center">
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative w-52 border-b-4 border-primary px-8"
            >
                <img src={csgoempirelogo} alt="CSGOEmpire Logo" className="w-full h-auto" />
                {/* Overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-transparent to-purple-800 opacity-40 pointer-events-none" />
            </motion.div>

            
            {leaderboard?.first_prize && leaderboard?.second_prize && leaderboard?.third_prize && 
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="z-50 mt-4">
                <div className="text-2xl text-[#ed9c07] font-extrabold">
                    <img className="max-w-sm w-8 inline-block" src={coins} alt="" /> {Number(leaderboard?.first_prize) + Number(leaderboard?.second_prize) + Number(leaderboard?.third_prize)} <span className="text-white uppercase">Every End Season</span>
                </div>
            </motion.div>}

            <motion.div 
                className="z-50"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <h1 className="text-4xl lg:text-6xl text-tertiary font-extrabold italic uppercase">{leaderboard?.name}</h1>
                <span className="text-textSecondary">{leaderboard?.description}</span>
                {/* <img className="max-w-md w-full" src={lbtext} alt="" /> */}
            </motion.div>

            {leaderboard?.leaderboard_ends_at &&
            <motion.div 
                className="my-2"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <CountdownTimer setLoading={setLoading} targetDate={leaderboard?.leaderboard_ends_at} />
            </motion.div>}
            
            {settings?.referral_code && settings?.referral_link && 
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="flex flex-col sm:flex-row md:flex-row lg:flex-row items-center gap-2 w-full max-w-md mx-auto z-50 mt-4"
            >
                <CodeLink settings={settings} />
            </motion.div>}

            {leaderboard?.updated_at && 
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, ease: "backInOut" }}
                className="flex items-center gap-2 text-sm py-2"
            >
                <span className="font-semibold uppercase text-textSecondary">UPDATED {formatDistanceToNow(leaderboard?.updated_at, { addSuffix: true })}</span>
            </motion.div>}
        </div>
    )
}

export default LeaderboardInfo
