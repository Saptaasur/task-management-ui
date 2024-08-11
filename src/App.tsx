import React, { useEffect, useState } from 'react';
import apiClient from './api/axios';
import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';
import CategorySlider from './components/CategorySlider';
import { Task } from './components/types'; // Ensure consistent import
import Sidebar from './components/Sidebar';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCategory, setCurrentCategory] = useState<'To Do' | 'On Progress' | 'Done' | 'Timeout'>('To Do');

  const filteredTasks = tasks.filter(
    (task) =>
      (task.title.toLowerCase().includes(searchTerm.toLowerCase()) || task.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      task.status === currentCategory
  );

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await apiClient.get('/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleSaveTask = async (task: Task) => {
    try {
      if (task._id) {
        // Update an existing task
        await apiClient.put(`/api/tasks/${task._id}`, task);
        setTasks(tasks.map((t) => (t._id === task._id ? task : t)));
      } else {
        // Create a new task
        const response = await apiClient.post('/api/tasks', task);
        setTasks([...tasks, response.data]);
      }
      setCurrentTask(null);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleEditTask = async (taskId: string) => {
    try {
      const response = await apiClient.get(`/api/tasks/${taskId}`);
      setCurrentTask(response.data);
    } catch (error) {
      console.error('Error fetching task details:', error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await apiClient.delete(`/api/tasks/${taskId}`);
      setTasks(tasks.filter((t) => t._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-1/5 bg-white p-4 shadow-md">
        <Sidebar expiredTasks={5} activeTasks={7} completedTasks={4} />
      </aside>
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-4">
          <div className="w-2/3">
            <input
              type="text"
              placeholder="Search Task"
              className="w-full p-2 border rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className="p-2 bg-gray-200 rounded"
            onClick={() =>
              setCurrentTask({
                _id: '',
                title: '',
                description: '',
                deadline: '',
                priority: 'Low',
                status: 'To Do',
              })
            }
          >
            Add Task
          </button>
        </header>
        <CategorySlider currentCategory={currentCategory} onCategoryChange={setCurrentCategory} />
        <div className="flex space-x-4">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={() => handleEditTask(task._id)}
              onDelete={() => handleDeleteTask(task._id)}
            />
          ))}
        </div>
        {currentTask && (
          <TaskForm
            task={currentTask}
            onSave={handleSaveTask}
            onCancel={() => setCurrentTask(null)}
          />
        )}
      </main>
    </div>
  );
}

export default App;

