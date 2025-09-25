import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() =>
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.body.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      style={{
        padding: "6px 12px",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        backgroundColor: "var(--primary-color)",
        color: "white",
        transition: "0.3s",
      }}
    >
      {isDark ? "☀ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
