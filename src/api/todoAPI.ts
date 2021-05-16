import axios from 'axios';

interface ToDoResponse {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export function fetchTodo() {
  return axios.get<ToDoResponse[]>(
    'https://jsonplaceholder.typicode.com/todos'
  );
}
