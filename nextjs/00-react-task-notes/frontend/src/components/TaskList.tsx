import { useState } from "react"
import { useTasks } from "../hooks/useTasks"
import TaskItem from "./TaskItem"
import AddTaskForm from "./AddTaskForm"
import LoadingSpinner from "./LoadingSpinner"
import ErrorMessage from "./ErrorMessage"
import "./styles/TaskList.css"

function TaskList() {
    const [filter, setFilter] = useState("all")

  const {
    tasks,
    loading,
    error,
    addTask,
    editTask,
    toggleTask,
    removeTask
  } = useTasks()
   console.log("Tasks :", tasks)
   if (loading) return <p>Loading tasks...</p>
  if (error)   return <p>Error: {error}</p>
  if (!tasks.length) return <p>No tasks yet</p>


 const filteredTasks = (tasks ?? []).filter((task) => {
  if (filter === "completed") return task.completed
  if (filter === "active") return !task.completed
  return true
})

  return (
       <div className="task-container">

      <div className="task-header">
        <h2>My Tasks</h2>
      </div>

      <AddTaskForm onAddTask={addTask} />

      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      {loading && <LoadingSpinner />}

      {error && <ErrorMessage message={error} />}

      <div className="task-list">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onEdit={editTask}
            onDelete={removeTask}
          />
        ))}
      </div>

    </div>
  )
}

export default TaskList