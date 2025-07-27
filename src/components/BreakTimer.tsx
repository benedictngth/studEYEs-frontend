import { useCountdown } from "../hooks/useTimer";

interface TimerProps {
  onComplete: () => void;
  message?: string;
  breakLoading?: boolean;
}

export default function BreakTimer({
  onComplete,
  message,
  breakLoading,
}: TimerProps) {
  const {
    minutes,
    seconds,
    isTimerRunning,
    startCountdown,
    pauseCountdown,
    resetCountdown,
    progressPercentage,
  } = useCountdown({
    minutes: 5,
    seconds: 0,
    onComplete,
  });
  const displayTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  return (
    <div>
      <div
        className="radial-progress bg-primary text-primary-content border-primary border-4 mb-6"
        style={
          {
            "--value": progressPercentage,
            "--size": "20rem",
            "--thickness": "15px",
          } as React.CSSProperties
        }
      >
        <span className="text-5xl font-bold">{displayTime}</span>
      </div>

      {breakLoading ? (
        <div className="flex flex-col items-center">
          <span className="loading loading-spinner loading-sm mt-2"></span>
        </div>
      ) : (
        <div className="mb-4 p-2 bg-blue-100 text-blue-800 rounded shadow max-w-md mx-auto text-center">
          <p className="italic"> {message}</p>
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
