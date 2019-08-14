import {
  Fab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
  Typography,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { getAll, Producer } from '@api/producer';
import AdminPage from '@components/AdminPage';
import Breadcrumbs from '@components/Breadcrumbs';
import withAuth from '@containers/withAuth';
import '@styles/dummy.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
    },
    fab: {
      position: 'fixed',
      right: theme.spacing(2),
      bottom: theme.spacing(2),
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
      return null;
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
        <TableCell>Nenhum resultado.</TableCell>
      </TableRow>
    );
  };

  return (
    <AdminPage>
      <Head>
        <title>Iniciativas - Comer muda o mundo</title>
      </Head>

      <Paper className={classes.paper}>
        <Breadcrumbs
          aria-label="Breadcrumb"
          items={[
            { href: '/admin', label: 'Admin' },
            { href: '/admin/producers', label: 'Iniciativas' },
          ]}
        />

        <Typography component="h1" variant="h4" gutterBottom>
          Iniciativas
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Endereço</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderRows()}</TableBody>
        </Table>
      </Paper>

      <Link href="/admin/producers/new">
        <Fab
          component="a"
          color="primary"
          aria-label="Criar iniciativa"
          className={classes.fab}
        >
          <AddIcon />
        </Fab>
      </Link>
    </AdminPage>
  );
}

export default withAuth(ProducerIndex);
