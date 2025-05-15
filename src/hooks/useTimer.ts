import { useEffect, useState, useRef } from 'react';

interface CountdownOptions {
  hours?: number;
  minutes?: number;
  seconds?: number;
  onComplete?: () => void;
}

export const useCountdown = (options?: CountdownOptions) => {
  const totalInitialSeconds = 
    (options?.hours ?? 0) * 3600 + 
    (options?.minutes ?? 25) * 60 + 
    (options?.seconds ?? 0);

  const oneMS = 1000;

  const [remainingSeconds, setRemainingSeconds] = useState(totalInitialSeconds);
  const [hours, setHours] = useState(Math.floor(totalInitialSeconds / 3600));
  const [minutes, setMinutes] = useState(Math.floor((totalInitialSeconds % 3600) / 60));
  const [seconds, setSeconds] = useState(totalInitialSeconds % 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(0);

  // timerRef used to store the total time remaining and whether the timer is running
  const timerRef = useRef<number | null>(null);
  //used to keep track of whether the countdown has completed
  const completedRef = useRef<boolean>(false);

  const updateTime = (total: number) => {
    setHours(Math.floor(total / 3600));
    setMinutes(Math.floor((total % 3600) / 60));
    setSeconds(total % 60);
  };

  const updateProgress = (elapsed: number) => {
    setElapsedTime(elapsed);
    setProgressPercentage(Math.round((elapsed / totalInitialSeconds) * 100));
  };

  const startCountdown = () => {
    setIsTimerRunning(true);
    completedRef.current = false;
    
    timerRef.current = setInterval(() => {
      setRemainingSeconds((prevTime) => {
        if (prevTime === 0) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = 0;
          }
          setIsTimerRunning(false);
          updateTime(0);
          updateProgress(totalInitialSeconds);
          
          if (options?.onComplete && !completedRef.current) {
            completedRef.current = true;
            options.onComplete();
          }
          return 0;
        }
        // update remaining time
        const newTime = prevTime - 1;
        updateTime(newTime);
        updateProgress(totalInitialSeconds - newTime);
        return newTime;
      });
    }, oneMS);
  };

  const resetCountdown = () => {
    clearInterval(timerRef.current!);
    timerRef.current = null;
    setIsTimerRunning(false);
    setRemainingSeconds(totalInitialSeconds);
    updateTime(totalInitialSeconds);
    setElapsedTime(0);
    setProgressPercentage(0);
    completedRef.current = false;
  };

  const pauseCountdown = () => {
    clearInterval(timerRef.current!);
    timerRef.current = 1;
    setIsTimerRunning(false);
  };

  useEffect(() => {
    // This cleanup ensures the timer is cleared if the component using the hook unmounts
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return {
    hours,
    minutes,
    seconds,
    isTimerRunning,
    elapsedTime,
    progressPercentage,
    startCountdown,
    pauseCountdown,
    resetCountdown,
    timerRef
  };
};
