import Navbar from "./components/NavBar";
import TimerComponent from "./components/TimerComponent";
import "./App.css";

function App() {
  return (
    <main>
      <Navbar />
      <div>
        <TimerComponent />
      </div>
    </main>
  );
}

export default App;
