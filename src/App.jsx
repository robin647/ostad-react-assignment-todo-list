import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Card from "./components/Card.jsx";
import TaskForm from "./components/TaskForm.jsx";
import TaskStats from "./components/TaskStats.jsx";
import TaskFilter from "./components/TaskFilter.jsx";
import TaskList from "./components/TaskList.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import "./App.css";

const STORAGE_KEY = "mhrobin-student-task-manager.tasks";

// Create a unique ID for each task (used for React keys and updates)
function createId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

// Load tasks from localStorage. Handles missing, invalid or corrupted data.
function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];
    // Keep only well-formed task objects
    return parsed.filter(
      (t) =>
        t &&
        typeof t.id === "string" &&
        typeof t.title === "string" &&
        typeof t.completed === "boolean"
    );
  } catch {
    // Corrupted JSON or storage unavailable -> start with an empty list
    return [];
  }
}

function App() {
  // STATE MANAGEMENT: tasks, active filter and a success message
  const [tasks, setTasks] = useState(loadTasks);
  const [filter, setFilter] = useState("all");
  const [successMessage, setSuccessMessage] = useState("");

  // Persist tasks whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // Storage may be full or blocked; the app keeps working in memory
    }
  }, [tasks]);

  // Auto-hide the success message after a few seconds
  useEffect(() => {
    if (!successMessage) return;
    const timer = setTimeout(() => setSuccessMessage(""), 3000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  // ADD: immutable update -> new array with the new task first
  const handleAddTask = (title) => {
    const newTask = { id: createId(), title, completed: false };
    setTasks((prev) => [newTask, ...prev]);
    setSuccessMessage("Task added successfully!");
  };

  // TOGGLE: only the matching task is replaced; the others are untouched
  const handleToggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // DELETE: confirm first, then filter the task out
  const handleDeleteTask = (id) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    if (!window.confirm(`Delete this task?\n\n"${task.title}"`)) return;
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setSuccessMessage("Task deleted.");
  };

  // DERIVED VALUES: calculated from state on every render (no separate counters)
  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = totalCount - completedCount;

  // Filtering affects only the list, never the statistics
  const visibleTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const remainingText =
    pendingCount === 0
      ? "No tasks remaining"
      : `${pendingCount} ${pendingCount === 1 ? "task" : "tasks"} remaining`;

  return (
    <div className="app">
      <Header />

      <main className="app-main">
        <Card title="Add a task">
          <TaskForm onAddTask={handleAddTask} successMessage={successMessage} />
        </Card>

        <TaskStats total={totalCount} completed={completedCount} pending={pendingCount} />

        <Card title="Your tasks">
          <div className="toolbar">
            <TaskFilter currentFilter={filter} onFilterChange={setFilter} />
            <p className="remaining" aria-live="polite">
              {remainingText}
            </p>
          </div>

          {/* ERROR BOUNDARY: if TaskList crashes, show a fallback with retry */}
          <ErrorBoundary message="We couldn't display your task list.">
            <TaskList
              tasks={visibleTasks}
              totalCount={totalCount}
              filter={filter}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
            />
          </ErrorBoundary>
        </Card>
      </main>

      <Footer />
    </div>
  );
}

export default App;
