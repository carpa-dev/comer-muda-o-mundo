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

const defaultLinks = [
  { href: '#', label: 'Mapa' },
  { href: '#', label: 'Quem somos' },
  { href: '#', label: 'Iniciativas' },
];

const adminLinks = [{ href: '#', label: 'o_o' }];

interface NavbarProps {
  admin?: boolean;
}

function Navbar({ admin }: NavbarProps) {
  const classes = useStyles();
  const links = admin ? adminLinks : defaultLinks;

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

        {links.map(link => (
          <Link
            key={link.href}
            variant="button"
            color="inherit"
            href={link.href}
            className={classes.link}
          >
            {link.label}
          </Link>
        ))}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
