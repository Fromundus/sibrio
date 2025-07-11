import React from "react";
import csgoempirelogo from "../assets/csgoempirelogo.png";
import { FaCoins, FaGift, FaInfo, FaPause, FaPlay, FaRegCopy } from "react-icons/fa";
import { FaBell, FaCheck, FaClock, FaLink } from "react-icons/fa6";
import { useNavigate, useOutletContext } from "react-router-dom";
import { IoAlertCircle } from "react-icons/io5";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { BiSolidParty } from "react-icons/bi";
import { motion } from "framer-motion";
import lbtext from "../assets/lbtext.webp"
import coins from "../assets/coins.png"
import { format, formatDistanceToNow } from "date-fns";
import LeaderboardHistory from "../components/LeaderboardHistory";
import { IoSettingsSharp } from "react-icons/io5";
import axiosClient from "../axios-client";
import CountdownTimer from "../components/CountdownTimer";

export default function Leaderboard({ userType }) {
    const [leaderboard, setLeaderboard] = React.useState();
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(true);
    const { settings, settingsLoading } = useOutletContext();
    const [users, setUsers] = React.useState();
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        settings?.referral_code && navigator.clipboard.writeText(settings?.referral_code).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 10000); // Reset after 2s
        });
    };
    
    async function fetchReferredUsers() {
        try {
            const res = await axiosClient.get('leaderboard');
            console.log("res",res);
            setUsers(res.data.data);
            setLeaderboard(res.data.leaderboard);
            setLoading(false);
        } catch(err){
            console.log(err)
            // setUsers(hardUsers);
            setLoading(false);
        }
    }
    
    console.log(settingsLoading);

    React.useEffect(() => {
        window.scrollTo(0, 0);
        if(settings?.is_active === 1){
            fetchReferredUsers().catch(console.error);
        } else if(settings?.is_active === 0){
            setLoading(false);
        } else if (!settingsLoading){
            setLoading(false);
        }
    }, [settings, settingsLoading]);

    console.log("settings", settings);
    console.log("users", users);

    if(loading){
        return (
            <div className="p-6 min-h-[80svh] flex items-center justify-center">
                <span className="font-semibold">LOADING...</span>
            </div>
        )
    }

    if(!settings && !loading){
        return (
            <div className="p-6 min-h-[80svh] flex items-center justify-center">
                <Card tcenter={1} title={
                    <span className="flex flex-col md:flex-row lg:flex-row items-center gap-4">
                        <IoSettingsSharp className="w-8 h-8 text-yellow-500 animate-spin" />
                        <span>Leaderboard Not Yet Ready</span>
                    </span>
                }>
                    <div className="text-sm text-white mt-2 text-center">
                        <p className="mb-3">We're setting things up!</p>
                        <p className="text-textSecondary">Leaderboard settings haven’t been configured yet. Please check back later for referral codes and rewards!</p>
                    </div>
                </Card>
            </div>
        )
    }

    if(settings && settings?.is_active && !users && !settingsLoading){
        return (
            <div className="p-6 min-h-[80svh] flex items-center justify-center">
                <Card tcenter={1} title={
                    <span className="flex flex-col md:flex-row lg:flex-row items-center gap-4">
                        <FaPlay className="w-8 h-8 text-yellow-500 animate-bounce" />
                        <span>No Players Yet</span>
                    </span>
                }>
                    <div className="text-sm text-white mt-2 text-center">
                        <p className="mb-3">Be the first to join the leaderboard!</p>
                        <p className="text-textSecondary">
                            No one has joined yet — this is your chance to grab an early lead and earn rewards. Use the referral code and start wagering on <span className="font-semibold">CSGOEmpire</span> today!
                        </p>

                        <div className="flex flex-col md:flex-row lg:flex-row items-center max-w-md mx-auto mt-4 gap-2">
                            <Button
                                className={"bg-primary text-white w-full flex justify-center"}
                                label={<span className="flex items-center gap-2 uppercase">CODE: {settings?.referral_code} {!copied ? <FaRegCopy /> : <FaCheck className="text-green-200" />}</span>}
                                onClick={handleCopy}
                            />
                            <a href={`${settings?.referral_link}`} target="_blank" className='w-full h-11 justify-center bg-accent text-white font-[700] px-5 hover:opacity-90 transition text-[14px] rounded-md py-2 font-nunito flex items-center gap-1.5' style={{boxShadow: "rgba(0, 0, 0, 0.25) 0px -2px 0px inset, rgba(255, 255, 255, 0.25) 0px 1.5px 0px inset", padding: "0.5rem 1rem"}}>
                                <FaLink /> JOIN CSGOEMPIRE
                            </a>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }

    if(settings && !settings?.is_active && !loading){
        return (
            <div className="p-6 min-h-[80svh] flex flex-col items-center justify-center">
                <Card tcenter={1} title={
                    <span className="flex flex-col md:flex-row lg:flex-row items-center gap-4">
                        <FaPause className="w-8 h-8 text-yellow-500 animate-bounce" />
                        <span>Leaderboard Paused</span>
                    </span>
                }>
                    <div className="text-sm text-white mt-2 text-center">
                        <p className="mb-3">Leaderboard is temporarily paused.</p>
                        <p className="text-textSecondary">
                            We’re making improvements behind the scenes. Please check back soon for updates, new prizes, and the next chance to climb the ranks!
                        </p>

                        <div className="flex flex-col md:flex-row lg:flex-row items-center max-w-md mx-auto mt-4 gap-2">
                            <Button
                                className={"bg-primary text-white w-full flex justify-center"}
                                label={<span className="flex items-center gap-2 uppercase">CODE: {settings?.referral_code} {!copied ? <FaRegCopy /> : <FaCheck className="text-green-200" />}</span>}
                                onClick={handleCopy}
                            />
                            <a href={`${settings?.referral_link}`} target="_blank" className='w-full h-11 justify-center bg-accent text-white font-[700] px-5 hover:opacity-90 transition text-[14px] rounded-md py-2 font-nunito flex items-center gap-1.5' style={{boxShadow: "rgba(0, 0, 0, 0.25) 0px -2px 0px inset, rgba(255, 255, 255, 0.25) 0px 1.5px 0px inset", padding: "0.5rem 1rem"}}>
                                <FaLink /> JOIN CSGOEMPIRE
                            </a>
                        </div>
                    </div>
                </Card>
                <LeaderboardHistory />
            </div>
        )
    }

    return (
        <div className="p-6 bg-gradient-to-b from-background via-surface to-background min-h-[100svh]">
            {/* <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" /> */}
            <div className="w-full flex flex-col items-center gap-4">
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

                
                    {settings?.first_prize && settings?.second_prize && settings?.third_prize && 
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="z-50 mt-4">
                        <h1 className="text-2xl text-[#ed9c07] font-extrabold flex items-center gap-2"><div><img className="max-w-sm w-8" src={coins} alt="" /></div> {Number(settings?.first_prize) + Number(settings?.second_prize) + Number(settings?.third_prize)} <span className="text-white uppercase">Every End Season</span></h1>
                    </motion.div>}

                    <motion.div 
                        className="z-50"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        {/* <h1 className="text-4xl lg:text-6xl text-white font-extrabold italic">LEADERBOARD</h1> */}
                        <img className="max-w-md w-full" src={lbtext} alt="" />
                    </motion.div>

                    {settings?.leaderboard_ends_at &&
                    <motion.div 
                        className="my-2"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <CountdownTimer targetDate={settings?.leaderboard_ends_at} />
                    </motion.div>}
                    
                    {!userType && settings?.referral_code && settings?.referral_link && 
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row md:flex-row lg:flex-row items-center gap-2 w-full max-w-md mx-auto z-50 mt-4"
                    >
                        <Button
                            className={"bg-primary text-white w-full flex justify-center"}
                            label={<span className="flex items-center gap-2 uppercase">CODE: {settings?.referral_code} {!copied ? <FaRegCopy /> : <FaCheck className="text-green-200" />}</span>}
                            onClick={handleCopy}
                        />
                        <a href={`${settings?.referral_link}`} target="_blank" className='w-full h-11 justify-center bg-accent text-white font-[700] px-5 hover:opacity-90 transition text-[14px] rounded-md py-2 font-nunito flex items-center gap-1.5' style={{boxShadow: "rgba(0, 0, 0, 0.25) 0px -2px 0px inset, rgba(255, 255, 255, 0.25) 0px 1.5px 0px inset", padding: "0.5rem 1rem"}}>
                            <FaLink /> JOIN CSGOEMPIRE
                        </a>
                    </motion.div>}

                    {leaderboard?.created_at && 
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, ease: "backInOut" }}
                        className="flex items-center gap-2 text-sm py-2"
                    >
                        <span className="font-semibold uppercase text-textSecondary">UPDATED {formatDistanceToNow(leaderboard?.created_at, { addSuffix: true })}</span>
                    </motion.div>}

                    {/* Top 3 Section */}
                    {users?.length >= 1 && (
                        <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="justify-center items-end gap-6 mt-10 mb-10 hidden md:flex lg:flex z-50"
                        >
                            

                            {/* 🥈 2nd Place */}
                            {users?.length >= 2 && (
                            <div className="flex flex-col py-8 px-14 rounded-2xl items-center flex-shrink-0 border-2 border-b-0 rounded-es-none rounded-ee-none border-blue-300 bg-gradient-to-b from-blue-900 to-transparent bg-opacity-50 hover:scale-105 transition-all">
                                <div className="relative flex w-full items-center justify-center">
                                <img
                                    src={users[1]?.avatar}
                                    alt={users[1]?.name}
                                    className="rounded-full border w-24 h-24"
                                />
                                <div className="w-7 h-7 flex items-center justify-center rounded-full absolute bottom-[-12px] bg-blue-500">
                                    <span className="text-lg text-white font-bold">2</span>
                                </div>
                                </div>
                                <p className="mt-6 font-semibold">{users[1]?.name}</p>
                                <div className="py-1 px-2 rounded-xl font-semibold mt-2 flex flex-col items-center">
                                    <div className="flex items-center gap-2">
                                        <FaCoins className="text-[#ed9c07]" /> {Number(users[1]?.total_wagered).toFixed(2)}
                                    </div>
                                    <span className="text-xs text-textSecondary">WAGERED</span>
                                </div>
                                <div className="py-1 px-2 rounded-xl font-semibold mt-2 flex flex-col items-center">
                                    <div className="flex items-center gap-2 text-lg font-bold">
                                        <img className="w-4" src={coins} alt="" /> {Number(settings?.second_prize).toFixed(2)}
                                    </div>
                                    <span className="text-xs text-textSecondary">PRICE</span>
                                </div>
                            </div>
                            )}

                            {/* 🥇 1st Place */}
                            <div className="flex flex-col py-8 px-14 rounded-2xl items-center flex-shrink-0 border-2 border-b-0 rounded-es-none rounded-ee-none border-yellow-300 bg-gradient-to-b from-yellow-900 to-transparent bg-opacity-50 hover:scale-105 transition-all">
                                <div className="relative flex w-full items-center justify-center">
                                    <img
                                    src={users[0]?.avatar}
                                    alt={users[0]?.name}
                                    className="rounded-full border w-36 h-36"
                                    />
                                    <div className="w-7 h-7 flex items-center justify-center rounded-full absolute bottom-[-12px] bg-yellow-500">
                                    <span className="text-lg text-white font-bold">1</span>
                                    </div>
                                </div>
                                <p className="mt-6 font-semibold">{users[0]?.name}</p>
                                <div className="py-1 px-2 rounded-xl font-semibold mt-2 flex flex-col items-center">
                                    <div className="flex items-center gap-2">
                                        <FaCoins className="text-[#ed9c07]" /> {Number(users[0]?.total_wagered).toFixed(2)}
                                    </div>
                                    <span className="text-xs text-textSecondary">WAGERED</span>
                                </div>
                                <div className="py-1 px-2 rounded-xl font-semibold mt-2 flex flex-col items-center">
                                    <div className="flex items-center gap-2 text-lg font-bold">
                                        <img className="w-4" src={coins} alt="" /> {Number(settings?.first_prize).toFixed(2)}
                                    </div>
                                    <span className="text-xs text-textSecondary">PRICE</span>
                                </div>
                            </div>

                            {/* 🥉 3rd Place */}
                            {users?.length >= 3 && (
                            <div className="flex flex-col py-8 px-14 rounded-2xl items-center flex-shrink-0 border-2 border-b-0 rounded-es-none rounded-ee-none border-green-300 bg-gradient-to-b from-green-900 to-transparent bg-opacity-50 hover:scale-105 transition-all">
                                <div className="relative flex w-full items-center justify-center">
                                <img
                                    src={users[2]?.avatar}
                                    alt={users[2]?.name}
                                    className="rounded-full border w-24 h-24"
                                />
                                <div className="w-7 h-7 flex items-center justify-center rounded-full absolute bottom-[-12px] bg-green-500">
                                    <span className="text-lg text-white font-bold">3</span>
                                </div>
                                </div>
                                <p className="mt-6 font-semibold">{users[2]?.name}</p>
                                <div className="py-1 px-2 rounded-xl font-semibold mt-2 flex flex-col items-center">
                                    <div className="flex items-center gap-2">
                                        <FaCoins className="text-[#ed9c07]" /> {Number(users[2]?.total_wagered).toFixed(2)}
                                    </div>
                                    <span className="text-xs text-textSecondary">WAGERED</span>
                                </div>
                                <div className="py-1 px-2 rounded-xl font-semibold mt-2 flex flex-col items-center">
                                    <div className="flex items-center gap-2 text-lg font-bold">
                                        <img className="w-4" src={coins} alt="" /> {Number(settings?.third_prize).toFixed(2)}
                                    </div>
                                    <span className="text-xs text-textSecondary">PRICE</span>
                                </div>
                            </div>
                            )}
                        </motion.div>
                    )}


                    {/* Mobile Top 3 */}
                    {users?.length >= 1 && (
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="items-center gap-6 mt-10 mb-10 flex flex-col md:hidden lg:hidden max-w-4xl mx-auto w-full z-50"
                        >
                            
                            {/* 🥇 1st Place */}
                            <div className="flex flex-col py-8 px-14 rounded-2xl items-center flex-shrink-0 border-2 border-b-0 rounded-es-none rounded-ee-none border-yellow-300 bg-gradient-to-b from-yellow-900 to-transparent bg-opacity-50 hover:scale-105 transition-all">
                                <div className="relative flex w-full items-center justify-center">
                                    <img
                                    src={users[0]?.avatar}
                                    alt={users[0]?.name}
                                    className="rounded-full border w-36 h-36"
                                    />
                                    <div className="w-7 h-7 flex items-center justify-center rounded-full absolute bottom-[-12px] bg-yellow-500">
                                    <span className="text-lg text-white font-bold">1</span>
                                    </div>
                                </div>
                                <p className="mt-6 font-semibold">{users[0]?.name}</p>
                                <div className="py-1 px-2 rounded-xl font-semibold mt-2 flex flex-col items-center">
                                    <div className="flex items-center gap-2">
                                        <FaCoins className="text-[#ed9c07]" /> {Number(users[0]?.total_wagered).toFixed(2)}
                                    </div>
                                    <span className="text-xs text-textSecondary">WAGERED</span>
                                </div>
                                <div className="py-1 px-2 rounded-xl font-semibold mt-2 flex flex-col items-center">
                                    <div className="flex items-center gap-2 text-lg font-bold">
                                        <img className="w-4" src={coins} alt="" /> {Number(settings?.first_prize).toFixed(2)}
                                    </div>
                                    <span className="text-xs text-textSecondary">PRICE</span>
                                </div>
                            </div>

                            {/* 🥈 2nd Place */}
                            {users?.length >= 2 && (
                            <div className="flex flex-col py-8 px-14 rounded-2xl items-center flex-shrink-0 border-2 border-b-0 rounded-es-none rounded-ee-none border-blue-300 bg-gradient-to-b from-blue-900 to-transparent bg-opacity-50 hover:scale-105 transition-all">
                                <div className="relative flex w-full items-center justify-center">
                                <img
                                    src={users[1]?.avatar}
                                    alt={users[1]?.name}
                                    className="rounded-full border w-24 h-24"
                                />
                                <div className="w-7 h-7 flex items-center justify-center rounded-full absolute bottom-[-12px] bg-blue-500">
                                    <span className="text-lg text-white font-bold">2</span>
                                </div>
                                </div>
                                <p className="mt-6 font-semibold">{users[1]?.name}</p>
                                <div className="py-1 px-2 rounded-xl font-semibold mt-2 flex flex-col items-center">
                                    <div className="flex items-center gap-2">
                                        <FaCoins className="text-[#ed9c07]" /> {Number(users[1]?.total_wagered).toFixed(2)}
                                    </div>
                                    <span className="text-xs text-textSecondary">WAGERED</span>
                                </div>
                                <div className="py-1 px-2 rounded-xl font-semibold mt-2 flex flex-col items-center">
                                    <div className="flex items-center gap-2 text-lg font-bold">
                                        <img className="w-4" src={coins} alt="" /> {Number(settings?.second_prize).toFixed(2)}
                                    </div>
                                    <span className="text-xs text-textSecondary">PRICE</span>
                                </div>
                            </div>
                            )}

                            {/* 🥉 3rd Place */}
                            {users?.length >= 3 && (
                            <div className="flex flex-col py-8 px-14 rounded-2xl items-center flex-shrink-0 border-2 border-b-0 rounded-es-none rounded-ee-none border-green-300 bg-gradient-to-b from-green-900 to-transparent bg-opacity-50 hover:scale-105 transition-all">
                                <div className="relative flex w-full items-center justify-center">
                                <img
                                    src={users[2]?.avatar}
                                    alt={users[2]?.name}
                                    className="rounded-full border w-24 h-24"
                                />
                                <div className="w-7 h-7 flex items-center justify-center rounded-full absolute bottom-[-12px] bg-green-500">
                                    <span className="text-lg text-white font-bold">3</span>
                                </div>
                                </div>
                                <p className="mt-6 font-semibold">{users[2]?.name}</p>
                                <div className="py-1 px-2 rounded-xl font-semibold mt-2 flex flex-col items-center">
                                    <div className="flex items-center gap-2">
                                        <FaCoins className="text-[#ed9c07]" /> {Number(users[2]?.total_wagered).toFixed(2)}
                                    </div>
                                    <span className="text-xs text-textSecondary">WAGERED</span>
                                </div>
                                <div className="py-1 px-2 rounded-xl font-semibold mt-2 flex flex-col items-center">
                                    <div className="flex items-center gap-2 text-lg font-bold">
                                        <img className="w-4" src={coins} alt="" /> {Number(settings?.third_prize).toFixed(2)}
                                    </div>
                                    <span className="text-xs text-textSecondary">PRICE</span>
                                </div>
                            </div>
                            )}
                        </motion.div>
                    )}


                    {/* Others List */}
                    {users?.length > 3 && <div className="space-y-2 max-w-4xl mx-auto w-full z-50">
                        <div
                            className="flex items-center justify-between px-2 ps-3 py-2 rounded-lg shadow"
                        >
                            <div className="flex items-center">
                                <span className="font-bold w-6 text-center mr-4 text-white">
                                    Rank
                                </span>
                            </div>
                            <div className={`py-1 px-2 rounded-xl flex flex-col items-center`}>
                                <div className="flex items-center gap-2">
                                    <FaCoins className="text-[#ed9c07]" /> Wagered
                                </div>
                            </div>
                        </div>
                        {users?.slice(3).map((user, index) => (
                            <motion.div
                                initial={{ x: 50, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                key={user?.name}
                                className="flex items-center justify-between bg-gray-900 bg-opacity-80 px-4 py-2 rounded-lg shadow border border-gray-700"
                            >
                                <div className="flex items-center">
                                    <span className="text-lg font-bold w-6 text-center mr-4 text-white">
                                        {index + 4}
                                    </span>
                                    <img
                                        src={user?.avatar}
                                        alt={user?.name}
                                        className="w-10 h-10 rounded-full mr-4 border-2 border-gray-700"
                                    />
                                    <span className="font-medium text-white">{user?.name}</span>
                                </div>
                                <div className={`py-1 px-2 rounded-xl flex flex-col items-center`}>
                                    <div className="flex items-center gap-2">
                                        <FaCoins className="text-[#ed9c07]" /> {Number(user?.total_wagered).toFixed(2)}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>}

                <LeaderboardHistory />
            </div>
        </div>
    );
}
