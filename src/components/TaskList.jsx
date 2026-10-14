import TaskItem from "./TaskItem.jsx";

function TaskList({ tasks, totalCount, filter, onToggle, onDelete }) {
  // Empty state 1: there are no tasks at all
  if (totalCount === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon" aria-hidden="true">
          📝
        </div>
        <h3>No tasks available</h3>
        <p>Add your first task above to get started.</p>
      </div>
    );
  }

  // Empty state 2: tasks exist, but the active filter matches none
  if (tasks.length === 0) {
    const text =
      filter === "completed"
        ? "No completed tasks yet. Finish a task to see it here."
        : "No pending tasks. Great job, you're all caught up!";
    return (
      <div className="empty-state">
        <div className="empty-icon" aria-hidden="true">
          🔍
        </div>
        <h3>No matching tasks</h3>
        <p>{text}</p>
      </div>
    );
  }

  // LIST RENDERING: map() with a stable, unique key (task.id)
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default TaskList;
