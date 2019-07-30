import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      fontWeight: 400,
      marginLeft: theme.spacing(2),
    },
    appTitle: {
      flexGrow: 1,
    },
    link: {
      margin: theme.spacing(1, 1.5),
    },
  })
);
function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.appTitle}
        >
          Comer muda o mundo
        </Typography>

        <Link
          variant="button"
          color="inherit"
          href="#"
          className={classes.link}
        >
          Quem Somos
        </Link>

        <Link
          variant="button"
          color="inherit"
          href="#"
          className={classes.link}
        >
          Mapa
        </Link>

        <Link
          variant="button"
          color="inherit"
          href="#"
          className={classes.link}
        >
          Iniciativas
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
