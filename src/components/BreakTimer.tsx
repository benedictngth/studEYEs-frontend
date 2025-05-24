import { useCountdown } from "../hooks/useTimer";

interface TimerProps {
  onComplete: () => void;
  message?: string;
}

export default function BreakTimer({ onComplete, message }: TimerProps) {
  const {
    minutes,
    seconds,
    isTimerRunning,
    startCountdown,
    pauseCountdown,
    resetCountdown,
    progressPercentage,
  } = useCountdown({
    minutes: 0,
    seconds: 5,
    onComplete,
  });
  console.log("Break message received:", message);
  const displayTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div>
      <div
        className="radial-progress bg-primary text-primary-content border-primary border-4 mb-6"
        style={{
          "--value": progressPercentage,
          "--size": "20rem",
          "--thickness": "15px",
        } as React.CSSProperties}
      >
        <span className="text-5xl font-bold">{displayTime}</span>
      </div>

      {message && (
        <div className="mt-4 p-4 bg-blue-100 text-blue-800 rounded shadow max-w-md text-center">
          <p className="text-lg italic"> {message}</p>
        </div>
      )}

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
          {isTimerRunning ? "Resume" : "Start"}
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
