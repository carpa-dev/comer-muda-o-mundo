import Container from '@material-ui/core/Container';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import Navbar from './Navbar';

interface AdminPageProps {
  children: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingBottom: `${theme.spacing(2)}px`,
      paddingTop: `${theme.spacing(2)}px`,
    },
  })
);

function AdminPage({ children }: AdminPageProps) {
  const classes = useStyles();

  return (
    <>
      <Navbar admin />
      <Container component="main" className={classes.container}>
        {children}
      </Container>
    </>
  );
}

export default AdminPage;
