import { useTheme } from "./ThemeProvider" // adjust path if needed

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    return (
        <button
            onClick={toggleTheme}
            style={{
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
                background: theme === "dark" ? "#333" : "#eee",
                color: theme === "dark" ? "#fff" : "#000",
                border: "none",
            }}
        >
            Switch to {theme === "dark" ? "Light" : "Dark"} Mode
        </button>
    )
}