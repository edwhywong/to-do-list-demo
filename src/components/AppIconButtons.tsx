import { IconButton, PropTypes } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

interface AppIconButtonProps {
  name: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
  color?: PropTypes.Color;
}

export function AppIconButton(props: AppIconButtonProps) {
  const { name, onClick, style, color } = props;
  return (
    <IconButton onClick={onClick} style={{ backgroundColor: 'transparent' }}>
      <Icon style={style} color={color}>
        {name}
      </Icon>
    </IconButton>
  );
}
