import { useTask } from '../contexts/TaskContext'

export const Stats = () => {
  const { activeCount, completedCount } = useTask()

  return (
    <div className="stats">
      <span>{activeCount} active</span>
      <span>{completedCount} completed</span>
    </div>
  )
}