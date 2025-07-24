import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useSession } from "../context/AuthContext";
import supabase from "../utils/supabase";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { session } = useSession();

  useEffect(() => {
    if (session) {
      navigate("/dashboard");
    }
  }, [session, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignIn}>
        <h2>Sign in to studEyEs</h2>
        <p>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
        <div className="flex flex-col">
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            className="input"
            type="email"
            value={email}
            required
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            className="input"
            value={password}
            required
          />
          <button type="submit" disabled={loading} className="btn">
            {loading ? "Signing in..." : "Sign In"}
          </button>
          {error && <p className="error-message">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default Signin;
