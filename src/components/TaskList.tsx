import React from 'react';
import TaskItem from './TaskItem';
import { Task } from './types';

interface TaskListProps {
  tasks: Task[];
  onEdit: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
  const categories = ["To Do", "On Progress", "Done", "Timeout"];

  return (
    <div className="flex space-x-4">
      {categories.map((category) => (
        <div key={category} className="w-1/4">
          <h2 className="font-bold text-lg mb-4 text-center">{category}</h2>
          {tasks
            .filter((task) => task.status === category)
            .map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onEdit={() => onEdit(task._id)}
                onDelete={() => onDelete(task._id)}
              />
            ))}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
