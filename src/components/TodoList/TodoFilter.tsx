import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  selectVisibilityFilter,
  setVisbilityFilter,
  TodoVisibilityFilter,
} from '../../redux/slices/todoSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    filterBtn: {
      marginLef: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  })
);

const availableFilters: TodoVisibilityFilter[] = ['All', 'Active', 'Completed'];

export function TodoFilter() {
  const visibilityFilter = useAppSelector(selectVisibilityFilter);
  const classes = useStyles();
  const dispatch = useAppDispatch();

  return (
    <Grid container direction="row" alignItems="center" justify="center">
      {availableFilters.map((filter) => {
        return (
          <Button
            key={`todoFilter-${filter}`}
            variant={visibilityFilter === filter ? 'contained' : 'outlined'}
            color={visibilityFilter === filter ? 'primary' : undefined}
            onClick={() => {
              dispatch(setVisbilityFilter(filter));
            }}
            className={classes.filterBtn}
          >
            {filter}
          </Button>
        );
      })}
    </Grid>
  );
}
