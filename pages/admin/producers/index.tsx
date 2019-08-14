import { Navbar } from '@components/index';
import {
  Container,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Theme,
  Breadcrumbs,
  Typography,
} from '@material-ui/core';
import withAuth from '@app/containers/withAuth';
import { useEffect, useState } from 'react';
import { getAll, Producer } from '@api/producer';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, createStyles } from '@material-ui/styles';
import Link from 'next/link';
import { Link as MuiLink } from '@material-ui/core';
import './index.css';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      right: theme.spacing(2),
      bottom: theme.spacing(2),
      position: 'fixed',
    },
    breadcrumbPaper: {
      padding: theme.spacing(1, 2),
    },
  })
);

function ProducerIndex() {
  const classes = useStyles();
  const [producers, setProducers] = useState<Producer[]>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getAll()
      .then(setProducers)
      .then(() => setLoaded(true));
  }, []);

  const renderRows = () => {
    if (!loaded) {
      return <></>;
    }

    if (producers && producers.length > 0) {
      return producers.map(p => (
        <TableRow key={p.id}>
          <TableCell>{p.name}</TableCell>
          <TableCell>{p.address}</TableCell>
        </TableRow>
      ));
    }

    return (
      <TableRow>
        <TableCell>No data yet</TableCell>
      </TableRow>
    );
  };

  return (
    <>
      <Navbar admin />

      <Container>
        <Paper className={classes.breadcrumbPaper}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link href="/admin">
              <MuiLink>Admin</MuiLink>
            </Link>

            <Link href="/admin/producers">
              <MuiLink>Producers</MuiLink>
            </Link>
          </Breadcrumbs>

          <Typography variant="h4" gutterBottom>
            Producers
          </Typography>
        </Paper>

        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderRows()}</TableBody>
          </Table>
        </Paper>

        <Link href="/admin/producers/new">
          <Fab color="primary" aria-label="add" className={classes.fab}>
            <AddIcon />
          </Fab>
        </Link>
      </Container>
    </>
  );
}

export default withAuth(ProducerIndex);
