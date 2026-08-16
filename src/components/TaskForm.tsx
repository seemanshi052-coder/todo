import { useState } from 'react'
import { useTask } from '../contexts/TaskContext'

interface TaskFormProps {
  onClose?: () => void
}

export const TaskForm = ({ onClose }: TaskFormProps = {}) => {
  const [form, setForm] = useState<{
    title: string
    description: string
    priority: 'low' | 'medium' | 'high'
    dueDate: Date | undefined
    completed: boolean
  }>({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: undefined,
    completed: false,
  })
  const { addTask } = useTask()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim()) return
    addTask({
      title: form.title,
      description: form.description,
      priority: form.priority,
      dueDate: form.dueDate,
      completed: form.completed,
    })
    setForm({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: undefined,
      completed: false,
    })
    onClose?.()
  }

  return (
    <div className="task-form">
      <h2>Add New Task</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            placeholder="Add details..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          ></textarea>
        </div>

        <div className="form-group">
          <label>Priority</label>
          <select
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value as 'low' | 'medium' | 'high' })}
            className="priority-select"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            value={form.dueDate?.toISOString().split('T')[0] || ''}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value ? new Date(e.target.value) : undefined })}
            className="priority-select"
          />
        </div>

        <button
          type="submit"
          className="add-btn"
        >
          Add Task
        </button>
      </form>
    </div>
  )
}