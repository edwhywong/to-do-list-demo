import {
  Container,
  createStyles,
  List,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  fetchRandomTodos,
  selectIsTodosLoading,
  selectRemainingTodoItemsLength,
  selectTodos,
  selectVisibleTodos,
} from '../../redux/slices/todoSlice';
import { AddTodo } from './AddTodo';
import { TodoFilter } from './TodoFilter';
import { TodoItem } from './TodoItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      textAlign: 'center',
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(1),
    },
  })
);

const initialTodosToFetch = 10;

export function TodoList() {
  // const { visibilityFilter, todos, isLoading } = useAppSelector(selectTodos);
  const todos = useAppSelector(selectTodos);
  const isLoading = useAppSelector(selectIsTodosLoading);
  const visibleTodos = useAppSelector(selectVisibleTodos);
  const remainingItemsLength = useAppSelector(selectRemainingTodoItemsLength);
  const dispatch = useAppDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (todos.length === 0) {
      dispatch(fetchRandomTodos(initialTodosToFetch));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" className={classes.title}>
        React Todo Demo
      </Typography>
      <TodoFilter />
      <AddTodo />
      {isLoading ? (
        Array(initialTodosToFetch)
          .fill(1)
          .map((v, idx) => {
            return <Skeleton key={`skeleton-${idx}`} height={64} />;
          })
      ) : (
        <List>
          {visibleTodos.map((todo) => (
            <TodoItem data={todo} />
          ))}
        </List>
      )}
      <>
        <Typography>
          {remainingItemsLength} item{remainingItemsLength > 1 && 's'} left
        </Typography>
      </>
    </Container>
  );
}
