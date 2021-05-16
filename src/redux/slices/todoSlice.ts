import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { AppDispatch, RootState } from '../store';
import { fetchTodo } from '../../api/todoAPI';

export interface Todo {
  id: string;
  desc: string;
  isCompleted: boolean;
}

export type TodoVisibilityFilter = 'All' | 'Active' | 'Completed';

export interface TodoState {
  todos: Todo[];
  visibilityFilter: TodoVisibilityFilter;
  isLoading: boolean;
}

const initialState: TodoState = {
  todos: [],
  visibilityFilter: 'All',
  isLoading: false,
};

export const fetchRandomTodos = createAsyncThunk<
  Todo[],
  number,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('todo/fetchRandomTodos', async (numberToFetech) => {
  const response = await fetchTodo();
  const fetechedTodos = response.data.slice(0, numberToFetech);
  const normalizedTodos: Todo[] = fetechedTodos.map((todo) => ({
    id: uuidv4(),
    desc: todo.title,
    isCompleted: todo.completed,
  }));
  return normalizedTodos;
});

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload);
      },
      prepare: (desc: string) => ({
        payload: {
          id: uuidv4(),
          desc,
          isCompleted: false,
        },
      }),
    },
    removeTodo(state, action: PayloadAction<string>) {
      const idx = state.todos.findIndex((todo) => todo.id === action.payload);
      state.todos.splice(idx, 1);
    },
    setTodoStatus(
      state,
      action: PayloadAction<{ id: string; isCompleted: boolean }>
    ) {
      const idx = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.todos[idx].isCompleted = action.payload.isCompleted;
    },
    setVisbilityFilter(state, action: PayloadAction<TodoVisibilityFilter>) {
      state.visibilityFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRandomTodos.pending, (state, _action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchRandomTodos.fulfilled, (state, action) => {
      state.todos = state.todos.concat(action.payload);
      state.isLoading = false;
    });
    builder.addCase(fetchRandomTodos.rejected, (state, _action) => {
      state.isLoading = false;
    });
  },
});

export const { addTodo, removeTodo, setTodoStatus, setVisbilityFilter } =
  todoSlice.actions;

export const selectTodos = (state: RootState) => state.todo.todos;
export const selectIsTodosLoading = (state: RootState) => state.todo.isLoading;
export const selectVisibilityFilter = (state: RootState) =>
  state.todo.visibilityFilter;
export const selectRemainingTodoItemsLength = createSelector(
  selectTodos,
  (todos) => {
    return todos.filter((todo) => !todo.isCompleted).length;
  }
);
export const selectVisibleTodos = createSelector(
  [selectTodos, selectVisibilityFilter],
  (todos, visibilityFilter) => {
    switch (visibilityFilter) {
      case 'Active':
        return todos.filter((todo) => !todo.isCompleted);
      case 'Completed':
        return todos.filter((todo) => todo.isCompleted);
      case 'All':
        return todos;
    }
  }
);

export default todoSlice.reducer;
