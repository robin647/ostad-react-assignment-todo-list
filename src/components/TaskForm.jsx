import { useRef, useState } from "react";

function TaskForm({ onAddTask, successMessage }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const lockRef = useRef(false); // blocks double-submits even before a re-render

  // EVENT HANDLING: typing in the input
  const handleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
    // Clear the validation message as soon as the input becomes valid
    if (error && value.trim() !== "") setError("");
  };

  // EVENT HANDLING: submitting the form
  const handleSubmit = (event) => {
    event.preventDefault();
    if (lockRef.current) return; // ignore accidental repeated submissions

    const trimmed = title.trim(); // trim extra whitespace
    if (trimmed === "") {
      setError("Please enter a task title. Empty or space-only tasks aren't allowed.");
      return;
    }

    lockRef.current = true;
    setIsLocked(true);
    onAddTask(trimmed);
    setTitle("");
    setError("");

    // Unlock shortly after, so rapid double clicks only add one task
    setTimeout(() => {
      lockRef.current = false;
      setIsLocked(false);
    }, 400);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="task-title" className="form-label">
        New task
      </label>
      <div className="form-row">
        <input
          id="task-title"
          type="text"
          className={`input ${error ? "input-error" : ""}`}
          placeholder="e.g. Finish math homework"
          value={title}
          onChange={handleChange}
          maxLength={120}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? "task-error" : undefined}
          autoComplete="off"
        />
        <button type="submit" className="btn btn-primary" disabled={isLocked}>
          Add Task
        </button>
      </div>

      {/* CONDITIONAL RENDERING: show messages only when they exist */}
      {error && (
        <p id="task-error" className="message message-error" role="alert">
          {error}
        </p>
      )}
      {!error && successMessage && (
        <p className="message message-success" role="status">
          {successMessage}
        </p>
      )}
    </form>
  );
}

export default TaskForm;
