import { motion } from 'framer-motion'
import React from 'react'
import axiosClient from '../axios-client';
import { FaCoins } from 'react-icons/fa6';
import { format } from 'date-fns';
import LeaderboardCard from './LeaderboardCard';

const LeaderboardHistory = () => {
  const [history, setHistory] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const fetchHistory = async () => {
      setLoading(true);

      try {
          const res = await axiosClient.get('/leaderboardhistory');
          console.log(res);
          setLoading(false);
          setHistory(res.data.data);
      } catch (err) {
          console.log(err);
          setLoading(false);
      }
  };

  React.useEffect(() => {
    fetchHistory();
  }, []);

  const renderHistory = history.map((item, idx) => {
    return (
      // <div key={idx} className="flex flex-col rounded-2xl items-center flex-shrink-0 border-2 border-b-0 rounded-es-none rounded-ee-none border-pink-300 bg-gradient-to-b from-pink-900 to-transparent bg-opacity-50 hover:scale-105 transition-all">
      //     <div className='border-b border-pink-700 w-full py-2 px-4 flex justify-end'>
      //       <span className='uppercase font-medium text-xs'>{format(item?.created_at, "MMMM d, yyyy | hh:mm:a")}</span>
      //     </div>
      //     <div className='py-4 px-14'>
      //       <div className="relative flex w-full items-center justify-center">
      //           <img
      //           src={item.referred_users[0]?.avatar}
      //           alt={item.referred_users[0]?.name}
      //           className="rounded-full border w-20 h-20"
      //           />
      //       </div>
      //       <p className="mt-6 font-semibold">{item.referred_users[0]?.name}</p>
      //       <span className='text-textSecondary text-xs font-semibold'>WINNER</span>
      //       <div className="py-1 px-2 rounded-xl font-semibold mt-2 flex flex-col items-center">
      //           <div className="flex items-center gap-2">
      //               <FaCoins className="text-[#ed9c07]" /> {Number(item?.first_prize).toFixed(2)}
      //           </div>
      //           <span className="text-xs text-textSecondary">TOTAL PRIZE POOL</span>
      //       </div>
      //     </div>
      // </div>
      <LeaderboardCard key={idx} item={item} />
    )
  })

  return (
    <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="z-50 text-center flex flex-col gap-2 items-center py-10"
    >
        <h1 className="text-2xl text-white font-extrabold flex items-center gap-2">LEADERBOARD <span className='text-primary'>HISTORY</span></h1>

        {history?.length === 0 ? 
          <span className="text-textSecondary">No leaderboards history yet.</span>
          :
          <div className='flex flex-wrap gap-10 justify-center mt-8'>
            {renderHistory}
          </div>
        }

    </motion.div>
  )
}

export default LeaderboardHistory
