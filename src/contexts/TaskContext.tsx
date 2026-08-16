import { createContext, useContext, useState, useEffect } from 'react'
import type { Task } from '../types/task'
import type { ReactNode } from 'react'

interface TaskContextValue {
  tasks: Task[]
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  toggleTask: (id: string) => void
  tasksCount: number
  completedCount: number
  activeCount: number
}

const TaskContext = createContext<TaskContextValue | null>(null)

export const useTask = () => {
  const context = useContext(TaskContext)
  if (!context) throw new Error('useTask must be used within a TaskProvider')
  return context
}

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem('tasks')
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const completedCount = tasks.filter((t) => t.completed).length
  const activeCount = tasks.filter((t) => !t.completed).length

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      id: crypto.randomUUID().toString(),
      ...task,
      completed: false,
      createdAt: new Date(),
    }
    setTasks((prev) => [...prev, newTask])
  }

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) => prev.map((task) => task.id === id ? { ...task, ...updates } : task))
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, toggleTask, tasksCount: tasks.length, completedCount, activeCount }}>
      {children}
    </TaskContext.Provider>
  )
}

export default TaskContext