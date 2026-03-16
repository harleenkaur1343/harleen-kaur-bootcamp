// components/task-actions.tsx
'use client';

import { useState, useTransition } from 'react';
import { toggleTaskCompletion, deleteTask } from '@/lib/actions';

interface TaskActionsProps {
  task: {
    id: string;
    title: string;
    completed: boolean;
  };
}

export function TaskActions({ task }: TaskActionsProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleToggleComplete = () => {
    startTransition(async () => {
      try {
        await toggleTaskCompletion(task.id, !task.completed);
      } catch (error) {
        console.error('Failed to toggle task:', error);
        // Could show a toast notification here
      }
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteTask(task.id);
        setIsDeleteModalOpen(false);
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleToggleComplete}
        disabled={isPending}
        className={`px-3 py-1 rounded text-sm font-medium ${
          task.completed
            ? 'bg-green-100 text-green-800 hover:bg-green-200'
            : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
        } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isPending ? 'Updating...' : task.completed ? 'Mark Incomplete' : 'Mark Complete'}
      </button>

      <button
        onClick={() => setIsDeleteModalOpen(true)}
        disabled={isPending}
        className="px-3 py-1 rounded text-sm font-medium bg-red-100 text-red-800 hover:bg-red-200"
      >
        Delete
      </button>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-2">Delete Task</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete "{task.title}"? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                {isPending ? 'Deleting...' : 'Delete'}
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}