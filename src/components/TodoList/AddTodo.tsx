import {
  createStyles,
  Grid,
  InputAdornment,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { addTodo } from '../../redux/slices/todoSlice';
import { AppIconButton } from '../AppIconButtons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
    },
  })
);

export function AddTodo() {
  const dispatch = useAppDispatch();
  const [todoDesc, setTodoDesc] = useState<string>('');
  const classes = useStyles();

  const handleAddTodo = useCallback(() => {
    if (todoDesc) {
      dispatch(addTodo(todoDesc));
      setTodoDesc('');
    }
  }, [dispatch, todoDesc]);

  return (
    <Grid className={classes.container}>
      <TextField
        variant="outlined"
        fullWidth
        onChange={(e) => setTodoDesc(e.target.value)}
        value={todoDesc}
        placeholder="What needs to be done?"
        InputProps={{
          endAdornment: todoDesc ? (
            <InputAdornment position="end">
              <AppIconButton
                name="add_circle"
                color="primary"
                onClick={(_e) => {
                  handleAddTodo();
                }}
              />
            </InputAdornment>
          ) : undefined,
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAddTodo();
          }
        }}
      />
    </Grid>
  );
}
