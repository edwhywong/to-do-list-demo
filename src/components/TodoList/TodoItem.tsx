import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import {
  removeTodo,
  setTodoStatus,
  Todo as TodoModel,
} from '../../redux/slices/todoSlice';
import { AppIconButton } from '../AppIconButtons';

interface TodoItemProps {
  data: TodoModel;
}

export function TodoItem(props: TodoItemProps) {
  const { id, desc, isCompleted } = props.data;
  const [isShowRemoveIcon, setIsShowRemoveIcon] = useState(false);
  const [delayHandler, setDelayHandler] = useState<any>(null);
  const dispatch = useAppDispatch();
  return (
    <div
      onMouseEnter={() => {
        setDelayHandler(
          setTimeout(() => {
            setIsShowRemoveIcon(true);
          }, 100)
        );
      }}
      onMouseLeave={() => {
        clearTimeout(delayHandler);
        if (isShowRemoveIcon) {
          setIsShowRemoveIcon(false);
        }
      }}
    >
      <ListItem key={id}>
        <ListItemIcon>
          <AppIconButton
            name={isCompleted ? 'check_circle' : 'radio_button_unchecked'}
            color={isCompleted ? 'primary' : undefined}
            onClick={(e) => {
              dispatch(
                setTodoStatus({
                  id,
                  isCompleted: !isCompleted,
                })
              );
            }}
          />
        </ListItemIcon>
        <ListItemText
          style={{
            textDecoration: isCompleted ? 'line-through' : 'none',
          }}
        >
          <Typography>{desc}</Typography>
        </ListItemText>
        <ListItemSecondaryAction>
          {isShowRemoveIcon && (
            <AppIconButton
              name="close"
              onClick={(e) => {
                dispatch(removeTodo(id));
              }}
            />
          )}
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </div>
  );
}
