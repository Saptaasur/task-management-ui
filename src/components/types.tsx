// types.ts
export interface Task {
  _id: string;
  title: string;
  description: string;
  deadline: string;
  priority: 'Low' | 'High';
  status: 'To Do' | 'On Progress' | 'Done' | 'Timeout';
  timeoutDuration: number; // Add this line
}
