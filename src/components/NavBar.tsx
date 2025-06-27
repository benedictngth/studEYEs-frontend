import { useEffect, useState } from "react";
const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme") || "light";
    document.querySelector("html")?.setAttribute("data-theme", localTheme);
  }, [theme]);

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("garden");
    } else {
      setTheme("dark");
    }
  };
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">studEyEs</a>
      </div>
      <label className="flex  cursor-pointer gap-2">
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
  );
};

export default Navbar;
