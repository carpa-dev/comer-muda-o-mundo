import { Fade, Paper, Typography } from '@material-ui/core';

import theme from '@app/config/theme';

interface MarkerTooltipProps {
  children: React.ReactNode;
  open: boolean;
  position: google.maps.Point;
}

function MarkerTooltip({ children, open, position }: MarkerTooltipProps) {
  const offset = theme.spacing(1);
  return (
    <Fade in={open}>
      <Typography
        component={Paper}
        style={{
          padding: theme.spacing(1),
          position: 'absolute',
          left: position.x + offset,
          top: position.y + offset,
        }}
        variant="subtitle2"
      >
        {children}
      </Typography>
    </Fade>
  );
}

export default MarkerTooltip;
