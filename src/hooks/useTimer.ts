import { useEffect, useState, useRef } from 'react';

interface CountdownOptions {
  minutes: number;
  seconds: number;
  onComplete?: () => void;
}
//todos
//using observable pattern to track completion of the timer https://www.patterns.dev/vanilla/observer-pattern/
//or use prop drilling to better pass the countdown length from parent component Timer Component to child (BreakTimer/StudyTimer) components

  //figure out how to auto-reset the timer when the timer is complete
export const useCountdown = (options: CountdownOptions) => {
  const initialTotalSecond = options.minutes * 60 + options.seconds;

  const oneMS = 1000;

  const [remainingTotal, setRemainingTotal] = useState(initialTotalSecond);
  const [minutes, setMinutes] = useState(Math.floor((initialTotalSecond % 3600) / 60));
  const [seconds, setSeconds] = useState(initialTotalSecond % 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(0);

  // timerRef used to store the total time remaining and whether the timer is running
  const timerRef = useRef<number>(initialTotalSecond)
  //used to keep track of whether the countdown has completed
  const completedRef = useRef<boolean>(false);

  const updateTime = (total: number) => {
    setMinutes(Math.floor((total % 3600) / 60));
    setSeconds(total % 60);
  };

  const updateProgress = (elapsed: number) => {
    setElapsedTime(elapsed);
    setProgressPercentage(Math.round((elapsed / initialTotalSecond) * 100));
  };

  const startCountdown = () => {
    console.log("startCountdown called");
    setIsTimerRunning(true);
    completedRef.current = false;
    
    timerRef.current = window.setInterval(() => {
      setRemainingTotal((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timerRef.current!);
          timerRef.current = 0;
          setIsTimerRunning(false);
          updateTime(0);
          updateProgress(remainingTotal);

          if (!completedRef.current && options?.onComplete) {
            completedRef.current = true;
            setTimeout(() => {
              options.onComplete?.(); // defer callback to avoid state-during-render
            }, 0);
          }

          return 0;
        }
        // update remaining time
        const newTime = prevTime - 1;
        updateTime(newTime);
        updateProgress(remainingTotal - newTime);
        return newTime;
      });
    }, oneMS);
  };

  const resetCountdown = () => {
    clearInterval(timerRef.current!);
    timerRef.current = null;
    setIsTimerRunning(false);
    setRemainingTotal(initialTotalSecond);
    updateTime(initialTotalSecond);
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
    minutes,
    seconds,
    isTimerRunning,
    elapsedTime,
    progressPercentage,
    startCountdown,
    pauseCountdown,
    resetCountdown,
    timerRef,
  };
};
