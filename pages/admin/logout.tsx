import cookie from 'js-cookie';
import { useEffect } from 'react';

import withAuth from '../../containers/withAuth';

function logout() {
  cookie.remove('token');
  // TODO: add local storage check
  window.localStorage.setItem('logout', Date.now().toString());
}

function AdminLogout() {
  useEffect(logout);
  return null;
}

export default withAuth(AdminLogout);
