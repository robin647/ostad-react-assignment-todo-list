
function TaskItem({ task, onToggle, onDelete }) {
  const checkboxId = `task-${task.id}`;

  return (
    <li className={`task-item ${task.completed ? "task-completed" : ""}`}>
      <input
        id={checkboxId}
        type="checkbox"
        className="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <label htmlFor={checkboxId} className="task-title">
        {task.title}
      </label>

      {/* CONDITIONAL RENDERING: badge changes with completion status */}
      <span className={`badge ${task.completed ? "badge-done" : "badge-pending"}`}>
        {task.completed ? "Completed" : "Pending"}
      </span>

      <button
        type="button"
        className="btn btn-danger"
        onClick={() => onDelete(task.id)}
        aria-label={`Delete task: ${task.title}`}
      >
        Delete
      </button>
    </li>
  );
}

export default TaskItem;
