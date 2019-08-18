import AdminPage from '@components/AdminPage';
import withAuth from '@containers/withAuth';

function AdminHome() {
  return <AdminPage>admin goes here</AdminPage>;
}

export default withAuth(AdminHome);
