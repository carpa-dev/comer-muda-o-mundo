import ProducerForm from './_form.component';
import AdminPage from '@components/AdminPage';
import Head from 'next/head';
import { Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import Breadcrumbs from '@components/Breadcrumbs';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import * as ProducerAPI from '@api/producer';
import Router from 'next/router';
import { Producer } from '@models/producer';
import { withAuthActive } from '@containers/withAuth';

function EditProducer() {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(false);
  const [producer, setProducer] = useState();

  useEffect(() => {
    const fetchData = async () => {
      // either string  or string[]
      // are valid options
      if (id && typeof id === 'string') {
        setLoading(true);
        const producer = await ProducerAPI.get(parseInt(id));
        setProducer(producer);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const onSave = async (p: Producer) => {
    await ProducerAPI.update(p);
    Router.push('/admin/producers');
  };

  const renderForm = () => {
    if (loading) {
      return null;
    } else {
      return (
        <ProducerForm initialState={producer} onSave={onSave}></ProducerForm>
      );
    }
  };

  return (
    <AdminPage>
      <Head>
        <title>Nova iniciativa - Comer muda o mundo</title>
      </Head>
      <Breadcrumbs
        aria-label="Breadcrumb"
        items={[
          { href: '/admin', label: 'Admin' },
          { href: '/admin/producers', label: 'Iniciativas' },
          { href: '/admin/producers/edit', label: `Editar iniciativa #${id}` },
        ]}
      />
      <Typography component="h1" variant="h4" gutterBottom>
        {`Editar iniciativa #${id}`}
      </Typography>
      {renderForm()}
    </AdminPage>
  );
}

export default withAuthActive(EditProducer);
