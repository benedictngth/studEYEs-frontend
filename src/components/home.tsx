import Navbar from "../components/NavBar";
import TimerComponent from "../components/TimerComponent";
import "../App.css";
import { useSession } from "../context/AuthContext";
import { useNavigate } from "react-router";
import supabase from "../utils/supabase";
import { useEffect } from "react";

function Home() {
  const navigate = useNavigate();
  const { session } = useSession();

  useEffect(() => {
    if (!session) {
      navigate("/");
    }
  }, [session, navigate]);

  const handleSignOut = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    console.log("signing out");
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out", error);
    }
  };
  return (
    <main>
      <Navbar />
      <div>
        <TimerComponent />

        <div>
          <button className="btn" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>
    </main>
  );
}

export default Home;
