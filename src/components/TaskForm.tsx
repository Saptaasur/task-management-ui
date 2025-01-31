import React, { useState, useEffect } from 'react';

interface Task {
  _id: string;
  title: string;
  description: string;
  deadline: string;
  priority: 'Low' | 'High';
  status: 'To Do' | 'On Progress' | 'Done' | 'Timeout';
  timeoutDuration: number; // Add this line
}
interface TaskFormProps {
  task: Task | null;
  onSave: (task: Task) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSave, onCancel }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState<Task>({
    _id: '',
    title: '',
    description: '',
    deadline: '',
    priority: 'Low',
    status: 'To Do',
    timeoutDuration: 0, // Add this line
  });
  
  useEffect(() => {
    if (task) {
      setFormData({
        _id: task._id,
        title: task.title,
        description: task.description,
        deadline: task.deadline,
        priority: task.priority,
        status: task.status,
        timeoutDuration:task.timeoutDuration
      });
    }
  }, [task]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'timeoutDuration' ? Number(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData); // Log the form data before submission
    if (formData.title && formData.description && formData.deadline) {
      setErrorMessage(null);
      onSave(formData);
    } else {
      setErrorMessage('Please fill out all fields.');
    }
  };
  

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
    <div className="task-form-container bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">{task ? 'Edit Task' : 'Add Task'}</h2>
        <form onSubmit={handleSubmit}>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Deadline</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="Low">Low</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="mb-4">
  <label className="block text-gray-700">Timeout Duration (in minutes)</label>
  <input
    type="number"
    name="timeoutDuration"
    value={formData.timeoutDuration}
    onChange={handleChange}
    className="w-full p-2 border rounded"
    required
  />
</div>
          <div className="mb-4">
            <label className="block text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="To Do">To Do</option>
              <option value="On Progress">On Progress</option>
              <option value="Done">Done</option>
              <option value="Timeout">Timeout</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={onCancel}>Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{task ? 'Update' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
