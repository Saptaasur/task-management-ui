import React from 'react';
import { Task } from './types';

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-4 mb-4 shadow rounded">
      <h3 className="font-semibold text-lg">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>
      <p className="text-gray-500">Deadline: {task.deadline}</p>
      <p className={`text-${task.priority === 'High' ? 'red-500' : 'green-500'}`}>
        Priority: {task.priority}
      </p>
      <div className="mt-2 flex space-x-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
