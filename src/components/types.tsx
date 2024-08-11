// types.ts
export interface Task {
  _id: string; // Updated to _id
  title: string;
  description: string;
  deadline: string;
  priority: 'Low' | 'High';
  status: 'To Do' | 'On Progress' | 'Done'|'Timeout' ;
}
