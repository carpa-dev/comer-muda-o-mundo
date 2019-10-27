import AdminPage from '@components/AdminPage';
import { withAuthActive } from '@containers/withAuth';

function AdminHome() {
  return <AdminPage>admin goes here</AdminPage>;
}

export default withAuthActive(AdminHome);
