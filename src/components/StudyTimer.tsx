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
  onEndSession: () => void;
  progressPercentage: number;
  sessionTitle: string;
  setSessionTitle: Dispatch<SetStateAction<string>>;
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
  onEndSession,
  sessionTitle,
  setSessionTitle,
}: TimerProps) {
  const displayTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  const handleMinuteChange = (newMinutes: number) => {
    const maxMin = Math.min(newMinutes, 59);
    setStudyDurationMin(maxMin);
    if (!isTimerRunning) {
      resetCountdown(); // Immediately update countdown display
    }
  };

  const handleSecondChange = (newSeconds: number) => {
    const maxSec = Math.min(newSeconds, 59)
    setStudyDurationSec(maxSec);
    if (!isTimerRunning) {
      resetCountdown(); // Immediately update countdown display
    }
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          className="input input-bordered w-full max-w-md"
          placeholder="Study Session (rename)"
          value={sessionTitle}
          onChange={(e) => setSessionTitle(e.target.value)}
        />
      </div>

      <h3 className="text-lg font-semibold mb-0">Set Custom Study Duration</h3>
      <div className="flex gap-10 py-6 justify-center">
        <div className="flex flex-col items-center">
          <input
            type="number"
            min="0"
            max="59"
            value={studyDurationMin}
            className="input"
            onChange={(e) => handleMinuteChange(Number(e.target.value))}
            disabled={isTimerRunning} // Prevent changes during timer
          />
          <span className="text-sm mt-1">minutes</span>
        </div>

        <div className="flex flex-col items-center">
          <input
            type="number"
            min="0"
            max="59"
            value={studyDurationSec}
            className="input"
            onChange={(e) => handleSecondChange(Number(e.target.value))}
            disabled={isTimerRunning} // Prevent changes during timer
          />
          <span className="text-sm mt-1">seconds</span>
        </div>
      </div>
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
          {"Start"}
        </button>
        <button
          onClick={resetCountdown}
          disabled={!!isTimerRunning}
          className="btn"
        >
          Reset
        </button>
        <button
          onClick={onEndSession}
          disabled={!isTimerRunning}
          className="btn ${isTimerRunning ? 'btn' : 'btn-primary'}`"
        >
          End Session
        </button>
      </div>
    </div>
  );
}
