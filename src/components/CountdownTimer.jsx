import React, { useEffect, useState } from 'react';

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate) - new Date();
    if (difference <= 0) {
      return null;
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTime = calculateTimeLeft();
      setTimeLeft(updatedTime);
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return <span className="text-red-500 font-semibold">Countdown ended</span>;
  }

  return (
    <div className="flex gap-8 font-mono">
      <div><strong className='text-2xl'>{timeLeft.days}</strong> <span className='text-textSecondary'>DAYS</span></div>
      <div><strong className='text-2xl'>{timeLeft.hours}</strong> <span className='text-textSecondary'>HOURS</span></div>
      <div><strong className='text-2xl'>{timeLeft.minutes}</strong> <span className='text-textSecondary'>MIN</span></div>
      <div><strong className='text-2xl'>{timeLeft.seconds}</strong> <span className='text-textSecondary'>SEC</span></div>
    </div>
  );
};

export default CountdownTimer;
