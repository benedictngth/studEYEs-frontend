import { useCountdown } from "../hooks/useTimer";
export default function Countdown() {
  // useCountdown is a custom hook that manages the countdown timer
  // It takes an object with initial hours, minutes, seconds, and an optional onComplete callback
  const {
    hours,
    minutes,
    seconds,
    isTimerRunning,
    elapsedTime,
    progressPercentage,
    startCountdown,
    pauseCountdown,
    resetCountdown,
    timerRef,
  } = useCountdown({
    hours: 0,
    minutes: 1,
    seconds: 2,
    //causes a duplicate alert
    onComplete: () => {
      alert("Timer completed!");
    },
  });
  const handleOnClickStart = () => {
    startCountdown();
  };

  const handleOnClickStop = () => {
    pauseCountdown();
  };

  const handleOnClickReset = () => {
    resetCountdown();
  };

  return (
    <div className="App mt-mid mx-auto">
      <h1 className="text-4xl font-bold text-center">
        {hours}:{minutes}:{seconds}
      </h1>
      <div className="mx-4 my-2 space-x-4">
        <button
          className="btn"
          disabled={!isTimerRunning}
          onClick={handleOnClickStop}
        >
          Pause
        </button>
        <button
          className="btn btn-primary"
          disabled={isTimerRunning}
          onClick={handleOnClickStart}
        >
          {timerRef.current ? "Resume" : "Start"}
        </button>
        <button
          className="btn"
          disabled={!!isTimerRunning}
          onClick={handleOnClickReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
