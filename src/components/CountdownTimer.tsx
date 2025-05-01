
import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  initialHours?: number;
  initialMinutes?: number;
  initialSeconds?: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialHours = 23,
  initialMinutes = 59,
  initialSeconds = 59
}) => {
  const [hours, setHours] = useState(initialHours);
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    // Load saved time from localStorage if exists
    const savedTime = localStorage.getItem('countdown_time');
    
    if (savedTime) {
      const timeObj = JSON.parse(savedTime);
      const savedTimestamp = timeObj.timestamp;
      const currentTime = new Date().getTime();
      const elapsedSeconds = Math.floor((currentTime - savedTimestamp) / 1000);
      
      // Calculate remaining time
      let totalSeconds = timeObj.totalSeconds - elapsedSeconds;
      
      // If timer expired, reset it
      if (totalSeconds <= 0) {
        totalSeconds = initialHours * 3600 + initialMinutes * 60 + initialSeconds;
        localStorage.setItem('countdown_time', JSON.stringify({
          timestamp: currentTime,
          totalSeconds: totalSeconds
        }));
      }
      
      // Calculate hours, minutes, seconds
      setHours(Math.floor(totalSeconds / 3600));
      setMinutes(Math.floor((totalSeconds % 3600) / 60));
      setSeconds(totalSeconds % 60);
    } else {
      // Initialize countdown in localStorage
      const totalSeconds = initialHours * 3600 + initialMinutes * 60 + initialSeconds;
      localStorage.setItem('countdown_time', JSON.stringify({
        timestamp: new Date().getTime(),
        totalSeconds: totalSeconds
      }));
    }
    
    // Set up interval
    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev === 0) {
          setMinutes(prevMin => {
            if (prevMin === 0) {
              setHours(prevHr => {
                if (prevHr === 0) {
                  return initialHours; // Reset to initial values
                }
                return prevHr - 1;
              });
              return initialMinutes;
            }
            return prevMin - 1;
          });
          return 59;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [initialHours, initialMinutes, initialSeconds]);
  
  // Save the current timer state to localStorage
  useEffect(() => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    localStorage.setItem('countdown_time', JSON.stringify({
      timestamp: new Date().getTime(),
      totalSeconds: totalSeconds
    }));
  }, [hours, minutes, seconds]);

  return (
    <div className="flex justify-center space-x-2">
      <div className="bg-white/10 rounded-md p-2 min-w-[2.5rem] text-center">
        <div className="text-white font-bold text-xl">{hours.toString().padStart(2, '0')}</div>
        <div className="text-white/70 text-xs">horas</div>
      </div>
      <div className="text-white font-bold text-xl self-center">:</div>
      <div className="bg-white/10 rounded-md p-2 min-w-[2.5rem] text-center">
        <div className="text-white font-bold text-xl">{minutes.toString().padStart(2, '0')}</div>
        <div className="text-white/70 text-xs">min</div>
      </div>
      <div className="text-white font-bold text-xl self-center">:</div>
      <div className="bg-white/10 rounded-md p-2 min-w-[2.5rem] text-center">
        <div className="text-white font-bold text-xl">{seconds.toString().padStart(2, '0')}</div>
        <div className="text-white/70 text-xs">seg</div>
      </div>
    </div>
  );
};

export default CountdownTimer;
