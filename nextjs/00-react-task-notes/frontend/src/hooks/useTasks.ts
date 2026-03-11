import { useState, useEffect } from 'react';

import { getTasks, createTask, updateTask, deleteTask } from '../api/tasksApi';

import type { Task, CreateTaskInput, UpdateTaskInput } from '../types/task';

export function useTasks() {
  //list of all tasks
  //fetching state - loading or not
  //error state -

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchTasks() {
    try {
      setLoading(true);
      setError(null);
      const { data } = await getTasks();
      const safeData = Array.isArray(data) ? data : [];
      setTasks(safeData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function addTask(input: CreateTaskInput) {
    try {
      const newTask = await createTask(input);

      setTasks((prev) => [...prev, newTask]);
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function editTask(id: string, data: UpdateTaskInput) {
    try {
      const updated = await updateTask(id, data);

      setTasks((prev) => prev.map((task) => (task.id === id ? updated : task)));
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function toggleTask(task: Task) {
    await editTask(task.id, {
      completed: !task.completed,
    });
  }

  async function removeTask(id: string) {
    try {
      await deleteTask(id);

      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    setLoading,
    error,
    fetchTasks,
    addTask,
    editTask,
    toggleTask,
    removeTask,
  };
}
