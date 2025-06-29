interface TimerProps {
  minutes: number;
  seconds: number;
  isTimerRunning: boolean;
  startCountdown: () => void;
  pauseCountdown: () => void;
  resetCountdown: () => void;
  progressPercentage: number;
}
export default function StudyTimer({ 
  minutes,
  seconds,
  isTimerRunning,
  startCountdown,
  pauseCountdown,
  resetCountdown,
  progressPercentage,
 }: TimerProps) {
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
