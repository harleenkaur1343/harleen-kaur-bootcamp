import { useState } from 'react';
import type { Task } from '../types/task';
import './styles/TaskItem.css';
import DeleteModal from './DeleteModal';

interface Props {
  task: Task;
  onToggle: (task: Task) => void;
  onEdit: (
    id: string,
    data: { title?: string; description?: string; completed?: boolean }
  ) => void;
  onDelete: (id: string) => void;
}

function TaskItem({ task, onToggle, onEdit, onDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [showDelete, setShowDelete] = useState(false);

  function handleSave() {
    onEdit(task.id, { title, description });
    setIsEditing(false);
  }

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className='task-main'>
        <input
          type='checkbox'
          checked={task.completed}
          onChange={() => onToggle(task)}
        />

        {isEditing ? (
          <div className='task-edit'>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button onClick={handleSave}>Save</button>
          </div>
        ) : (
          <div className='task-text'>
            <h4>{task.title}</h4>
            {task.description && <p>{task.description}</p>}
          </div>
        )}
      </div>

      <div className='task-actions'>
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel' : 'Edit'}
        </button>

        <button onClick={() => setShowDelete(true) }>Delete</button>

        <DeleteModal
          isOpen={showDelete}
          onClose={() => setShowDelete(false)}
          onConfirm={() => {
            onDelete(task.id);
            setShowDelete(false);
          }}
        />
      </div>
    </div>
  );
}

export default TaskItem;
