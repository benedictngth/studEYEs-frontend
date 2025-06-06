import { useState } from "react";
import StudyTimer from "./StudyTimer";
import BreakTimer from "./BreakTimer";
import { fetchBreakFact } from "../lib/fetchBreakFact";

export default function TimerComponent() {
  //onComplete prop is a function that will be called when the timer completes
  //now when click end study session, TODO what happens next?
  type TimerMode = "study" | "break";
  const [mode, setMode] = useState<TimerMode>("study");
  const [breakCompleteModal, setBreakCompleteModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [breakMsg, setBreakMsg] = useState("");

  const handleStudyComplete = () => setShowModal(true);

  const handleBreakComplete = () => setBreakCompleteModal(true);

  const handleContinueToBreak = async () => {
    setShowModal(false);
    setMode("break");

    const message = await fetchBreakFact("new unique response");
    setBreakMsg(message);
    setMode("break");
  };

  return (
    <div className="App mt-10 mx-auto text-center">
      {mode === "study" && <StudyTimer onComplete={handleStudyComplete} />}
      {mode === "break" && (
        <BreakTimer onComplete={handleBreakComplete} message={breakMsg} />
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
                  onClick={() => {
                    setShowModal(false);
                    setMode("study");
                  }}
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
                  setMode("study"); // return to study session
                }}
              >
                Back to work!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
