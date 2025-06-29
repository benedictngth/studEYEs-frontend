import { useState } from "react";
import { useCountdown } from "../hooks/useTimer";
import StudyTimer from "./StudyTimer";
import BreakTimer from "./BreakTimer";
import SummaryPage from "./SummaryPage";
import { fetchBreakFact } from "../lib/fetchBreakFact";

export default function TimerComponent() {
  //onComplete prop is a function that will be called when the timer completes
  //now when click end study session, TODO what happens next?
  type TimerMode = "study" | "break" | "summary";
  const [mode, setMode] = useState<TimerMode>("study");
  const [breakCompleteModal, setBreakCompleteModal] = useState(false);
  const [breakLoading, setBreakLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [breakMsg, setBreakMsg] = useState("");
  const [timercycle, setTimerCycle] = useState(0);
  const [totalBreaks, setTotalBreaks] = useState(0);
  const [totalStudyDuration, setTotalStudyDuration] = useState(0);
  
  const handleStudyComplete = () => {
    setTimerCycle((prev) => prev + 1);
    setTimeout(() => {
      setTotalStudyDuration((prev) => prev + lastElapsedRef.current);
      setElapsedTime(0);
    }, 0);
    setShowModal(true);
  }
  const handleBreakComplete = () => {
    setBreakCompleteModal(true);
  };

  const handleContinueToBreak = async () => {
    // Retrieve past break fact from localStorage
    const pastBreakFact = JSON.parse(
      localStorage.getItem("pastBreakFact") ||
        JSON.stringify("No Past Break Fact")
    );
    console.log("pastBreakFact", pastBreakFact);
    setShowModal(false);
    setMode("break");
    setTotalBreaks((prev) => prev + 1);

    // Fetch a new break fact, passing the past fact to avoid repetition
    setBreakLoading(true);
    try {
      const message = await fetchBreakFact(
        `new unique response. Do not repeat past prompts below under the [past prompts] section. [past prompts] ${pastBreakFact}`
      );
      localStorage.setItem("pastBreakFact", JSON.stringify(message));
      setBreakMsg(message);
      setMode("break");
    } finally {
      setBreakLoading(false);
    }
  };

  const {
    minutes,
    seconds,
    isTimerRunning,
    startCountdown,
    pauseCountdown,
    resetCountdown,
    progressPercentage,
    elapsedTime,
    lastElapsedRef,
    setElapsedTime,
  } = useCountdown({
    minutes: 0,
    seconds: 5,
    onComplete: handleStudyComplete,
  });


  const handleEndSession = () => {
    setShowModal(false);
    setBreakCompleteModal(false);
    setMode("summary");
    resetCountdown();
  }
  
  return (
    <div className="App mt-10 mx-auto text-center">
      {mode === "study" && (
        <StudyTimer 
          minutes={minutes}
          seconds={seconds}
          isTimerRunning={isTimerRunning}
          startCountdown={startCountdown}
          pauseCountdown={pauseCountdown}
          resetCountdown={resetCountdown}
          progressPercentage={progressPercentage}
        />
      )}
      {mode === "break" && (
        <BreakTimer
          onComplete={handleBreakComplete}
          message={breakMsg}
          breakLoading={breakLoading}
        />
      )}
      {mode === "summary" && (
        <SummaryPage
        totalStudySessions = {timercycle}
        totalBreaks = {totalBreaks}
        totalStudyDuration= {totalStudyDuration}
        onClose={() => {
          setMode("study");
          resetCountdown();
          setTimerCycle(0);
          setTotalBreaks(0);
          setTotalStudyDuration(0);
          }}
        />
      )}

      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="card bg-neutral text-neutral-content w-96">
            <div className="card-body items-center text-center">
              <h2 className="card-title">Study session complete!</h2>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={handleContinueToBreak}
                >
                  Break Time!
                </button>
                <button
                  className="btn btn-ghost"
                  onClick={handleEndSession}
                >
                  End Study Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {breakCompleteModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="card bg-neutral text-neutral-content w-96">
            <div className="card-body items-center text-center">
              <h2 className="card-title">Break session complete!</h2>
              <div className="card-actions justify-end"></div>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setBreakCompleteModal(false);
                  resetCountdown();
                  setMode("study"); // return to study session
                }}
              >
                Back to work!
              </button>
              <button
                  className="btn btn-ghost"
                  onClick={handleEndSession}
                >
                  End Study Session
                </button>
            </div>
          </div>
        </div>
      )}

      <div className="font-bold py-2">
        Number of cycles completed: {timercycle}
      </div>
    </div>
  );
}