import {
  AppBar,
  Container,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from '@material-ui/core/styles';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ExitToApp as ExitIcon,
  Home as HomeIcon,
  Menu as MenuIcon,
  Place as PlaceIcon,
} from '@material-ui/icons';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';

const DRAWER_WIDTH = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        marginLeft: DRAWER_WIDTH,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
    menuButton: {
      [theme.breakpoints.up('sm')]: {
        marginRight: 36,
      },
    },
    hide: {
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    drawer: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: DRAWER_WIDTH,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      width: theme.spacing(7) + 1,
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: `0 ${theme.spacing(1)}px`,
      ...theme.mixins.toolbar,
    },
    listItem: {
      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(3),
      },
    },
    content: {
      flexGrow: 1,
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3),
    },
  })
);

const navigation = [
  {
    icon: HomeIcon,
    href: '/admin',
    text: 'Início',
  },
  {
    icon: PlaceIcon,
    href: '/admin/producers',
    text: 'Iniciativas',
  },
  {
    icon: ExitIcon,
    href: '/admin/logout',
    text: 'Sair',
  },
];

interface AdminPageProps {
  children: React.ReactNode;
}

function AdminPage({ children }: AdminPageProps) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            aria-label="Abrir menu principal"
            color="inherit"
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Comer muda o mundo
          </Typography>
        </Toolbar>
      </AppBar>

      <Hidden smUp>
        <Drawer
          variant="temporary"
          classes={{ paper: classes.drawer }}
          onClose={handleDrawerClose}
          open={open}
        >
          <nav aria-label="Páginas de administração">
            <List>
              {navigation.map(({ href, icon: Icon, text }) => (
                <li key={text}>
                  <Link href={href}>
                    <ListItem
                      component="a"
                      role={undefined}
                      className={classes.listItem}
                      button
                    >
                      <ListItemIcon>
                        <Icon />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  </Link>
                </li>
              ))}
            </List>
          </nav>
        </Drawer>
      </Hidden>

      <Hidden xsDown implementation="css">
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
          open={open}
        >
          <div className={classes.toolbar}>
            <IconButton
              aria-label="Fechar menu principal"
              onClick={handleDrawerClose}
            >
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <nav aria-label="Páginas de administração">
            <List>
              {navigation.map(({ href, icon: Icon, text }) => (
                <li key={text}>
                  <Link href={href}>
                    <ListItem
                      component="a"
                      role={undefined}
                      className={classes.listItem}
                      button
                    >
                      <ListItemIcon>
                        <Icon />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  </Link>
                </li>
              ))}
            </List>
          </nav>
        </Drawer>
      </Hidden>

      <Container component="main" className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </Container>
    </div>
  );
}

export default AdminPage;
