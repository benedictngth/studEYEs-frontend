import { useState } from "react";
import StudyTimer from "./StudyTimer";
import BreakTimer from "./BreakTimer";

export default function TimerContainer() {
  const [mode, setMode] = useState<"study" | "break" | null>("study");
  const [showModal, setShowModal] = useState(false);
  const [breakCompleteModal, setBreakCompleteModal] = useState(false);
  const handleStudyComplete = () => {
    setShowModal(true);
  };

  const handleBreakComplete = () => {
    setBreakCompleteModal(true);
};

  return (
    <div className="App mt-10 mx-auto text-center">
        {mode === "study" && <StudyTimer onComplete={handleStudyComplete} />}
        {mode === "break" && <BreakTimer onComplete={handleBreakComplete} />}

        {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-md text-center">
                <h2 className="text-xl font-bold mb-4 text-black">Study session complete!</h2>
                <div className="space-x-4">
                <button
                    className="btn btn-primary"
                    onClick={() => {
                    setShowModal(false);
                    setMode("break");
                    }}
                >
                    Break Time!
                </button>
                <button
                    className="btn"
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
        )}

        {breakCompleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-md text-center">
            <h2 className="text-xl font-bold mb-4 text-black">Break Complete!</h2>
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
        )}
    </div>
  );
}