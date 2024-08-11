import React from 'react';

interface SidebarProps {
  expiredTasks: number;
  activeTasks: number;
  completedTasks: number;
}

const Sidebar: React.FC<SidebarProps> = ({ expiredTasks, activeTasks, completedTasks }) => {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-red-100 rounded">
        <p className="text-red-500 font-bold">Expired Tasks</p>
        <p className="text-2xl">{expiredTasks}</p>
      </div>
      <div className="p-4 bg-orange-100 rounded">
        <p className="text-orange-500 font-bold">All Active Tasks</p>
        <p className="text-2xl">{activeTasks}</p>
      </div>
      <div className="p-4 bg-blue-100 rounded">
        <p className="text-blue-500 font-bold">Completed Tasks</p>
        <p className="text-2xl">{completedTasks}</p>
      </div>
    </div>
  );
}

export default Sidebar;
