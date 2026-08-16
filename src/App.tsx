import './index.css'
import { TaskProvider } from './contexts/TaskContext'
import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'
import { Filters } from './components/Filters'
import { Stats } from './components/Stats'
import { useEffect } from 'react'

export const App = () => {
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash === '#active') window.location.hash = '#active'
      else if (hash === '#completed') window.location.hash = '#completed'
      else window.location.hash = ''
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <TaskProvider>
      <div className="app-container">
        <header className="header">
          <h1>Todos</h1>
          <p>Your tasks, simplified</p>
        </header>

        <TaskForm onClose={() => setTimeout(() => window.location.reload(), 0)} />

        <TaskList />

        <Filters />

        <Stats />
      </div>
    </TaskProvider>
  )
}