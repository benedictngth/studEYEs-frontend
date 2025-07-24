import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useSession } from "../context/AuthContext";
import supabase from "../utils/supabase";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { session } = useSession();
  useEffect(() => {
    if (session) {
      navigate("/dashboard");
    }
  }, [session, navigate]);
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      alert(error.message);
    }
    setLoading(false);
  };
  return (
    <div>
      <form onSubmit={handleSignUp}>
        <h2>Sign up to studEyEs</h2>

        <div className="flex flex-col ">
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            className="input"
            type="email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            className="input"
          />
          <button type="submit" disabled={loading} className="btn">
            Sign Up
          </button>
        </div>
      </form>
      <p>
        Already have an account<Link to="/"> Sign In</Link>
      </p>
    </div>
  );
};

export default Signup;
