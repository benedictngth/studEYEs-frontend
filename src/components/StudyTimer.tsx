import type { Dispatch, SetStateAction } from "react";

interface TimerProps {
  minutes: number;
  seconds: number;
  isTimerRunning: boolean;
  setStudyDurationMin: Dispatch<SetStateAction<number>>;
  setStudyDurationSec: Dispatch<SetStateAction<number>>;
  studyDurationMin: number;
  studyDurationSec: number;
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
  studyDurationMin,
  studyDurationSec,
  setStudyDurationSec,
  setStudyDurationMin,
}: TimerProps) {
  const displayTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  const handleMinuteChange = (newMinutes: number) => {
    setStudyDurationMin(newMinutes);
    if (!isTimerRunning) {
      resetCountdown(); // Immediately update countdown display
    }
  };

  const handleSecondChange = (newSeconds: number) => {
    setStudyDurationSec(newSeconds);
    if (!isTimerRunning) {
      resetCountdown(); // Immediately update countdown display
    }
  };

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
      <div className="flex py-4 justify-center">
        <input
          type="number"
          min="0"
          value={studyDurationMin}
          className="input"
          onChange={(e) => handleMinuteChange(Number(e.target.value))}
          disabled={isTimerRunning} // Prevent changes during timer
        />
        <input
          type="number"
          min="0"
          value={studyDurationSec}
          className="input"
          onChange={(e) => handleSecondChange(Number(e.target.value))}
          disabled={isTimerRunning} // Prevent changes during timer
        />
      </div>
    </div>
  );
}
