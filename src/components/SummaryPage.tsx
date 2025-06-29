import { useState } from "react";

interface SumProps {
    totalStudySessions: number;
    totalBreaks: number;
    totalStudyDuration: number;
    onClose: () => void;
}

export default function SummaryPage({
    totalStudySessions,
    totalBreaks,
    totalStudyDuration,
    onClose,
}: SumProps) {
    const [title, setTitle] = useState(() => {
        const today = new Date().toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
        });
        return `Study Session on ${today}`;
    });

    const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

    return (
    <div className="card bg-base-100 shadow-xl max-w-3xl mx-auto mt-6">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-2xl">Session Summary</h2>

        <input
          className="input input-bordered text-lg font-semibold text-center w-full max-w-md mt-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 w-full max-w-xl">
          <div className="stats shadow bg-base-200">
            <div className="stat">
              <div className="stat-title">Study Sessions</div>
              <div className="stat-value">{totalStudySessions}</div>
            </div>
          </div>

          <div className="stats shadow bg-base-200">
            <div className="stat">
              <div className="stat-title">Breaks Taken</div>
              <div className="stat-value">{totalBreaks}</div>
            </div>
          </div>

          <div className="stats shadow bg-base-200">
            <div className="stat">
              <div className="stat-title">Total Study Time</div>
              <div className="stat-value">{formatDuration(totalStudyDuration)}</div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button className="btn btn-primary" onClick={onClose}>
            Start New Session
          </button>
        </div>
      </div>
    </div>
  );
}