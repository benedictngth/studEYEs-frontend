import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.tsx";
//import FaceModel from "./components/FaceModel.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        {/* <Route path="/faceDetect" element={<FaceModel />} /> */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
