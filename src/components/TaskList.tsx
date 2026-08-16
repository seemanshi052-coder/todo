import { useTask } from '../contexts/TaskContext'
import { TaskItem } from './TaskItem'

export const TaskList = () => {
  const { tasks, toggleTask } = useTask()

  return (
    <div className="task-list">
      {tasks.length === 0 && (
        <p className="empty-state">No tasks yet. Add one above to get started.</p>
      )}
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={() => toggleTask(task.id)}
          onDelete={() => {}}
        />
      ))}
    </div>
  )
}