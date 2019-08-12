import { useEffect } from 'react';
import { logout } from '@api/index';

import withAuth from '../../containers/withAuth';

function AdminLogout() {
  useEffect(() => {
    logout();

    // For some reason
    // Router.push('/') doesn't work
    // see https://github.com/zeit/next.js/issues/5947
    window.location.href = '/';
  });
  return null;
}

export default withAuth(AdminLogout);
