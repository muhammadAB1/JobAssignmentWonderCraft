import TaskList from "./components/TaskList"
import { ThemeProvider, useTheme } from "./components/ThemeProvider"
import { ThemeToggle } from "./components/ThemeToggle"

function App() {

  const tasks = [
    { title: "Task 1", description: "First task", status: "pending" },
    { title: "Task 2", description: "Second task", status: "in-progress" },
    { title: "Task 3", description: "Third task", status: "completed" },
  ]

  return (
    <ThemeProvider>
      <ThemeToggle />
      <TaskList />
    </ThemeProvider>

  )
}

export default App
