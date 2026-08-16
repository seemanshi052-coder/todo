import type { Task } from '../types/task'

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit?: (id: string) => void
}

export const TaskItem = ({ task, onToggle, onDelete, onEdit }: TaskItemProps) => {
  const isCompleted = task.completed
  const classes = `task-item ${isCompleted ? 'completed' : ''}`

  return (
    <div className={classes} onClick={() => onToggle(task.id)} role="button" tabIndex={0}>
      <div className="task-checkbox" role="checkbox" />
      <div className="task-info">
        <span className="task-title">{task.title}</span>
        {task.description && <span className="task-description">{task.description}</span>}
      </div>

      <div className="task-actions">
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(task.id) }}
          className="task-action-btn delete"
          title="Delete"
        >
          Delete
        </button>
        {onEdit && (
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(task.id) }}
            className="task-action-btn edit"
            title="Edit"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  )
}