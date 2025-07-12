import React from "react";
import csgoempirelogo from "../assets/csgoempirelogo.png";
import { motion } from "framer-motion";
import coins from "../assets/coins.png"
import { format, formatDistanceToNow } from "date-fns";
import CountdownTimer from "../components/CountdownTimer";
import CodeLink from "./CodeLink";

const LeaderboardInfo = ({ settings, leaderboard, setLoading }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, ease: "anticipate" }}    
            className="flex flex-col gap-4 w-full items-center justify-center text-center mb-4"
        >
            <div
                className="relative w-52 border-b-4 border-primary px-8"
            >
                <img src={csgoempirelogo} alt="CSGOEmpire Logo" className="w-full h-auto" />
                {/* Overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-transparent to-purple-800 opacity-40 pointer-events-none" />
            </div>

            
            {leaderboard?.first_prize && leaderboard?.second_prize && leaderboard?.third_prize && 
            <div
                className="z-50 mt-4">
                <div className="text-2xl text-[#ed9c07] font-extrabold">
                    <img className="max-w-sm w-8 inline-block" src={coins} alt="" /> {Number(leaderboard?.first_prize) + Number(leaderboard?.second_prize) + Number(leaderboard?.third_prize)} <span className="text-white uppercase">Every End Season</span>
                </div>
            </div>}

            <div 
                className="z-50"
            >
                <h1 className="text-4xl lg:text-6xl text-tertiary font-extrabold italic uppercase">{leaderboard?.name}</h1>
                <span className="text-textSecondary">{leaderboard?.description}</span>
                {/* <img className="max-w-md w-full" src={lbtext} alt="" /> */}
            </div>

            {leaderboard?.leaderboard_ends_at &&
            <div 
                className="my-2"
            >
                <CountdownTimer setLoading={setLoading} targetDate={leaderboard?.leaderboard_ends_at} />
            </div>}
            
            {settings?.referral_code && settings?.referral_link && 
            <div 
                className="flex flex-col sm:flex-row md:flex-row lg:flex-row items-center gap-2 w-full max-w-md mx-auto z-50 mt-4"
            >
                <CodeLink settings={settings} />
            </div>}

            {leaderboard?.updated_at && leaderboard?.status === "active" &&
            <div
                className="flex items-center gap-2 text-sm py-2"
            >
                <span className="font-semibold uppercase text-textSecondary">UPDATED {formatDistanceToNow(leaderboard?.updated_at, { addSuffix: true })}</span>
            </div>}
        </motion.div>
    )
}

export default LeaderboardInfo
