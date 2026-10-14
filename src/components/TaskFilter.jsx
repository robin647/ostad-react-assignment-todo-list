
const FILTERS = [
  { value: "all", label: "All" },
  { value: "completed", label: "Completed" },
  { value: "pending", label: "Pending" },
];

function TaskFilter({ currentFilter, onFilterChange }) {
  return (
    <div className="filter-group" role="group" aria-label="Filter tasks">
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          type="button"
          className={`filter-btn ${currentFilter === filter.value ? "active" : ""}`}
          onClick={() => onFilterChange(filter.value)}
          aria-pressed={currentFilter === filter.value}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default TaskFilter;
