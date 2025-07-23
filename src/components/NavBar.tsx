import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme") || "light";
    document.querySelector("html")?.setAttribute("data-theme", localTheme);
  }, [theme]);

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setTheme("garden");
    } else {
      setTheme("dark");
    }
  };

  const goToStats = () => {
    navigate("/stats");
  };

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="navbar-start">
        <button onClick={goToStats} className="btn btn-sm btn-outline">
          View Study Statistics
        </button>
      </div>
      
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">studEyEs</a>
      </div>

      <div className="navbar-end">
        <label className="flex cursor-pointer gap-2">
          <span className="label-text">Dark</span>
          <input
            type="checkbox"
            value="garden"
            className="toggle theme-controller"
            defaultChecked={theme === "garden"}
            onChange={handleToggle}
          />
          <span className="label-text">Light</span>
        </label>
      </div>
    </div>
  );
};

export default Navbar;
