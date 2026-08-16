import { useTask } from '../contexts/TaskContext'

export const Filters = () => {
  const { activeCount, completedCount } = useTask()

  return (
    <div className="filters">
      <button
        onClick={() => window.location.hash = ''}
        className="filter-btn active"
        aria-current="page"
      >
        All {activeCount + completedCount}
      </button>
      <button
        onClick={() => window.location.hash = 'active'}
        className="filter-btn"
      >
        Active {activeCount}
      </button>
      <button
        onClick={() => window.location.hash = 'completed'}
        className="filter-btn"
      >
        Completed {completedCount}
      </button>
    </div>
  )
}