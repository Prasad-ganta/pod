"use client"

import "./ThemeSelector.css"

const ThemeSelector = ({ currentTheme, onThemeChange }) => {
  return (
    <div className="theme-selector">
      <button
        className={`theme-button ${currentTheme === "default" ? "active" : ""}`}
        onClick={() => onThemeChange("default")}
      >
        <span className="theme-icon default-icon"></span>
        <span className="theme-label">Default</span>
      </button>
      <button
        className={`theme-button ${currentTheme === "dark" ? "active" : ""}`}
        onClick={() => onThemeChange("dark")}
      >
        <span className="theme-icon dark-icon"></span>
        <span className="theme-label">Dark</span>
      </button>
      <button
        className={`theme-button ${currentTheme === "colorful" ? "active" : ""}`}
        onClick={() => onThemeChange("colorful")}
      >
        <span className="theme-icon colorful-icon"></span>
        <span className="theme-label">Colorful</span>
      </button>
    </div>
  )
}

export default ThemeSelector
