import Card from "./Card.jsx";


function TaskStats({ total, completed, pending }) {
  return (
    <div className="stats-grid" aria-label="Task statistics">
      <Card className="stat-card stat-total">
        <p className="stat-label">Total Tasks</p>
        <p className="stat-value">{total}</p>
      </Card>
      <Card className="stat-card stat-completed">
        <p className="stat-label">Completed Tasks</p>
        <p className="stat-value">{completed}</p>
      </Card>
      <Card className="stat-card stat-pending">
        <p className="stat-label">Pending Tasks</p>
        <p className="stat-value">{pending}</p>
      </Card>
    </div>
  );
}

export default TaskStats;
