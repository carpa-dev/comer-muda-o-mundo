import { Typography } from '@material-ui/core';
import Head from 'next/head';
import Router from 'next/router';
import * as yup from 'yup';
import * as ProducerAPI from '@api/producer';
import AdminPage from '@components/AdminPage';
import Breadcrumbs from '@components/Breadcrumbs';
import withAuth from '@containers/withAuth';
import ProducerForm from './_form.component';
import { NewProducer } from '@models/producer';

function NewProducerComponent() {
  const onSave = async (np: NewProducer) => {
    try {
      const producer2 = await ProducerAPI.saveV2(np);
    } catch (e) {
      console.log('error', e);
    }

    Router.push('/admin/producers');
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
          { href: '/admin/producers/new', label: 'Nova iniciativa' },
        ]}
      />

      <Typography component="h1" variant="h4" gutterBottom>
        Nova iniciativa
      </Typography>

      <ProducerForm onSave={onSave}></ProducerForm>
    </AdminPage>
  );
}

export default withAuth(NewProducerComponent);
