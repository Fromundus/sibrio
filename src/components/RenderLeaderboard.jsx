import React from 'react'
import Card from './ui/Card'
import { IoSettingsSharp } from 'react-icons/io5'
import CodeLink from './CodeLink'
import LeaderboardHistory from './LeaderboardHistory'
import { motion } from 'framer-motion'
import LeaderboardInfo from './LeaderboardInfo'
import { FaPause, FaPlay } from "react-icons/fa";
import coins from "../assets/coins.png"
import ribbon from "../assets/purple-ribbon.png";
import { MdError } from "react-icons/md";

const RenderLeaderboard = ({ leaderboard, users, loading, setLoading, settings, settingsLoading }) => {
    console.log("users", users);

  if(loading){
        return (
            <div className="min-h-[80svh] flex items-center justify-center">
                <span className="font-semibold">LOADING...</span>
            </div>
        )
    }

    if(settings && !settingsLoading && !loading && !leaderboard){
        return (
            <div className="min-h-[80svh] flex flex-col items-center justify-center">
                <Card tcenter={1} title={
                    <span className="flex flex-col md:flex-row lg:flex-row items-center gap-4">
                        <MdError className="w-8 h-8 text-yellow-500 animate-bounce" />
                        <span>No Active Leaderboards</span>
                    </span>
                }>
                    <div className="text-sm text-white mt-2 text-center">
                        <p className="mb-3">There are currently no leaderboards running.</p>
                        <p className="text-textSecondary">Please check back later for upcoming events, referral codes, and rewards!</p>

                        <div className="flex flex-col md:flex-row lg:flex-row items-center max-w-md mx-auto mt-4 gap-2">
                          <CodeLink settings={settings} />
                        </div>
                    </div>
                </Card>
                <LeaderboardHistory />
            </div>
        )
    }

    if(!settings && !settingsLoading && !loading){
        return (
            <div className="min-h-[80svh] flex items-center justify-center">
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

    if(settings && users?.length === 0 && !settingsLoading){
        return (
            <div className="min-h-[80svh] flex items-center justify-center">
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
                            <CodeLink settings={settings} />
                        </div>
                    </div>
                </Card>
            </div>
        )
    }

    if(settings && leaderboard?.status === "paused" && !loading){
        return (
            <div className="min-h-[80svh] flex flex-col items-center justify-center">
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
                          <CodeLink settings={settings} />
                        </div>
                    </div>
                </Card>
                <LeaderboardHistory />
            </div>
        )
    }

  return (
    <div className="w-full flex flex-col items-center gap-4">
        <LeaderboardInfo setLoading={setLoading} settings={settings} leaderboard={leaderboard} />

        {/* Top 3 Section */}
        {users?.length >= 1 && (
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="justify-center items-end gap-10 mt-10 mb-10 hidden md:flex lg:flex z-50"
            >
                

                {/* 🥈 2nd Place */}
                {users?.length >= 2 && (
                <div className="flex flex-col py-8 px-16 rounded-2xl items-center flex-shrink-0 border-2 border-b-0 rounded-es-none rounded-ee-none border-blue-300 bg-gradient-to-b from-blue-900 to-transparent bg-opacity-50 hover:scale-105 transition-all relative">
                    <img src={ribbon} className='absolute w-20 -top-8 -right-6' alt="" />
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
                            <img src={coins} className={"w-4"} /> {Number(users[1]?.wagered_in_leaderboard).toFixed(2)}
                        </div>
                        <span className="text-xs text-textSecondary">WAGERED</span>
                    </div>
                    <div className="py-1 px-2 rounded-xl font-semibold mt-2 flex flex-col items-center">
                        <div className="flex items-center gap-2 text-lg font-bold">
                            <img className="w-4" src={coins} alt="" /> {Number(leaderboard?.second_prize).toFixed(2)}
                        </div>
                        <span className="text-xs text-textSecondary">PRICE</span>
                    </div>
                </div>
                )}

                {/* 🥇 1st Place */}
                <div className="flex flex-col py-8 px-16 rounded-2xl items-center flex-shrink-0 border-2 border-b-0 rounded-es-none rounded-ee-none border-red-300 bg-gradient-to-b from-red-900 to-transparent bg-opacity-50 hover:scale-105 transition-all relative">
                    <img src={ribbon} className='absolute w-20 -top-8 -right-6' alt="" />
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
                            <img src={coins} className={"w-4"} /> {Number(users[0]?.wagered_in_leaderboard).toFixed(2)}
                        </div>
                        <span className="text-xs text-textSecondary">WAGERED</span>
                    </div>
                    <div className="py-1 px-2 rounded-xl font-semibold mt-2 flex flex-col items-center">
                        <div className="flex items-center gap-2 text-lg font-bold">
                            <img className="w-4" src={coins} alt="" /> {Number(leaderboard?.first_prize).toFixed(2)}
                        </div>
                        <span className="text-xs text-textSecondary">PRICE</span>
                    </div>
                </div>

                {/* 🥉 3rd Place */}
                {users?.length >= 3 && (
                <div className="flex flex-col py-8 px-16 rounded-2xl items-center flex-shrink-0 border-2 border-b-0 rounded-es-none rounded-ee-none border-green-300 bg-gradient-to-b from-green-900 to-transparent bg-opacity-50 hover:scale-105 transition-all relative">
                    <img src={ribbon} className='absolute w-20 -top-8 -right-6' alt="" />
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
                            <img src={coins} className={"w-4"} /> {Number(users[2]?.wagered_in_leaderboard).toFixed(2)}
                        </div>
                        <span className="text-xs text-textSecondary">WAGERED</span>
                    </div>
                    <div className="py-1 px-2 rounded-xl font-semibold mt-2 flex flex-col items-center">
                        <div className="flex items-center gap-2 text-lg font-bold">
                            <img className="w-4" src={coins} alt="" /> {Number(leaderboard?.third_prize).toFixed(2)}
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
                className="items-center gap-10 mt-10 mb-10 flex flex-col md:hidden lg:hidden max-w-4xl mx-auto w-full z-50"
            >
                
                {/* 🥇 1st Place */}
                <div className="flex flex-col py-8 px-16 rounded-2xl items-center flex-shrink-0 border-2 border-b-0 rounded-es-none rounded-ee-none border-red-300 bg-gradient-to-b from-red-900 to-transparent bg-opacity-50 hover:scale-105 transition-all relative">
                    <img src={ribbon} className='absolute w-20 -top-8 -right-6' alt="" />
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
                            <img src={coins} className={"w-4"} /> {Number(users[0]?.wagered_in_leaderboard).toFixed(2)}
                        </div>
                        <span className="text-xs text-textSecondary">WAGERED</span>
                    </div>
                    <div className="py-1 px-2 rounded-xl font-semibold mt-2 flex flex-col items-center">
                        <div className="flex items-center gap-2 text-lg font-bold">
                            <img className="w-4" src={coins} alt="" /> {Number(leaderboard?.first_prize).toFixed(2)}
                        </div>
                        <span className="text-xs text-textSecondary">PRICE</span>
                    </div>
                </div>

                {/* 🥈 2nd Place */}
                {users?.length >= 2 && (
                <div className="flex flex-col py-8 px-16 rounded-2xl items-center flex-shrink-0 border-2 border-b-0 rounded-es-none rounded-ee-none border-blue-300 bg-gradient-to-b from-blue-900 to-transparent bg-opacity-50 hover:scale-105 transition-all relative">
                    <img src={ribbon} className='absolute w-20 -top-8 -right-6' alt="" />
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
                            <img src={coins} className={"w-4"} /> {Number(users[1]?.wagered_in_leaderboard).toFixed(2)}
                        </div>
                        <span className="text-xs text-textSecondary">WAGERED</span>
                    </div>
                    <div className="py-1 px-2 rounded-xl font-semibold mt-2 flex flex-col items-center">
                        <div className="flex items-center gap-2 text-lg font-bold">
                            <img className="w-4" src={coins} alt="" /> {Number(leaderboard?.second_prize).toFixed(2)}
                        </div>
                        <span className="text-xs text-textSecondary">PRICE</span>
                    </div>
                </div>
                )}

                {/* 🥉 3rd Place */}
                {users?.length >= 3 && (
                <div className="flex flex-col py-8 px-16 rounded-2xl items-center flex-shrink-0 border-2 border-b-0 rounded-es-none rounded-ee-none border-green-300 bg-gradient-to-b from-green-900 to-transparent bg-opacity-50 hover:scale-105 transition-all relative">
                    <img src={ribbon} className='absolute w-20 -top-8 -right-6' alt="" />
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
                            <img src={coins} className={"w-4"} /> {Number(users[2]?.wagered_in_leaderboard).toFixed(2)}
                        </div>
                        <span className="text-xs text-textSecondary">WAGERED</span>
                    </div>
                    <div className="py-1 px-2 rounded-xl font-semibold mt-2 flex flex-col items-center">
                        <div className="flex items-center gap-2 text-lg font-bold">
                            <img className="w-4" src={coins} alt="" /> {Number(leaderboard?.third_prize).toFixed(2)}
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
                        <img src={coins} className={"w-4"} /> Wagered
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
                            <img src={coins} className={"w-4"} /> {Number(user?.wagered_in_leaderboard).toFixed(2)}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>}

        <LeaderboardHistory />
    </div>
  )
}

export default RenderLeaderboard
