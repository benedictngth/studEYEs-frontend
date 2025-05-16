import { useEffect, useState, useRef } from 'react';

interface CountdownOptions {
  minutes?: number;
  seconds?: number;
  onComplete?: () => void;
}

export const useCountdown = (options?: CountdownOptions) => {
  const [totalInitialSeconds, setTotalInitialSeconds] = useState(
    (options?.minutes ?? 25) * 60 + (options?.seconds ?? 0)
  );

  const oneMS = 1000;

  const [remainingSeconds, setRemainingSeconds] = useState(totalInitialSeconds);
  const [minutes, setMinutes] = useState(Math.floor((totalInitialSeconds % 3600) / 60));
  const [seconds, setSeconds] = useState(totalInitialSeconds % 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(0);

  // timerRef used to store the total time remaining and whether the timer is running
  const timerRef = useRef<number | null>(null);
  //used to keep track of whether the countdown has completed
  const completedRef = useRef<boolean>(false);
  const totalInitialSecondsRef = useRef(totalInitialSeconds);

  const updateTime = (total: number) => {
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
          updateProgress(totalInitialSecondsRef.current);
          
          if (options?.onComplete && !completedRef.current) {
            completedRef.current = true;
            options.onComplete();
          }
          return 0;
        }
        // update remaining time
        const newTime = prevTime - 1;
        updateTime(newTime);
        updateProgress(totalInitialSecondsRef.current - newTime);
        return newTime;
      });
    }, oneMS);
  };

  const resetCountdown = () => {
    clearInterval(timerRef.current!);
    timerRef.current = null;
    setIsTimerRunning(false);
    const resetTime = totalInitialSecondsRef.current; // ✅ use the latest
    setRemainingSeconds(resetTime);
    updateTime(resetTime);
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

  const setInitialTime = (minutes: number, seconds: number) => {
    const newTotalSeconds = minutes * 60 + seconds;
    clearInterval(timerRef.current!);
    timerRef.current = null;
    setTotalInitialSeconds(newTotalSeconds);
    totalInitialSecondsRef.current = newTotalSeconds;
    setRemainingSeconds(newTotalSeconds);
    updateTime(newTotalSeconds);
    setElapsedTime(0);
    setProgressPercentage(0);
    completedRef.current = false;
  };

  return {
    minutes,
    seconds,
    isTimerRunning,
    elapsedTime,
    progressPercentage,
    startCountdown,
    pauseCountdown,
    resetCountdown,
    timerRef,
    setInitialTime,
  };
};
