import { useCountdown } from "../hooks/useTimer";

interface TimerProps {
  onComplete: () => void;
}
export default function StudyTimer({ onComplete }: TimerProps) {
  const {
    minutes,
    seconds,
    isTimerRunning,
    startCountdown,
    pauseCountdown,
    resetCountdown,
    timerRef,
  } = useCountdown({
    minutes: 0,
    seconds: 25,
    onComplete,
  });

  return (
    <div>
      <h1 className="text-4xl text-center font-bold">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </h1>
      <div className="space-x-4 mt-2 text-center">
        <button
          onClick={pauseCountdown}
          disabled={!isTimerRunning}
          className="btn"
        >
          Pause
        </button>
        <button
          onClick={startCountdown}
          disabled={isTimerRunning}
          className="btn btn-primary"
        >
          {timerRef.current ? "Resume" : "Start"}
        </button>
        <button
          onClick={resetCountdown}
          disabled={!!isTimerRunning}
          className="btn"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
