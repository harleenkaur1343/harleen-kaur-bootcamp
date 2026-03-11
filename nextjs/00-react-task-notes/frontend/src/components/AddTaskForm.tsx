import { useState } from 'react';
import "./styles/AddTaskForm.css"

interface Props {
  onAddTask: (data: { title: string; description?: string }) => void;
}

function AddTaskForm({ onAddTask }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // simple validation
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setError(null);

    onAddTask({
      title,
      description,
    });

    // reset form
    setTitle('');
    setDescription('');
  }
  return (
    <form className="add-task-form" onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h3>Add Task</h3>
      {error && <p className="form-error">{error}</p>}

      <div>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      </div>

      <div>
        <textarea
          placeholder='Task description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <button type='submit'>Add Task</button>
    </form>
  );
}

export default AddTaskForm;
