import { DocumentContext } from 'next/document';
import cookies from 'next-cookies';

import { Navbar } from '../../components';
import withAuth from '../../containers/withAuth';

function AdminHome() {
  return (
    <>
      <Navbar admin />
      <div>admin goes here</div>
    </>
  );
}

// AdminHome.getInitialProps = async (ctx: DocumentContext) => {
//   const { token } = cookies(ctx);
//   return { token };
// };

// export default AdminHome;
export default withAuth(AdminHome);
