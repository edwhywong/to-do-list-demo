import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { customTheme } from './themes';

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <TodoList />;
    </ThemeProvider>
  );
}

export default App;
