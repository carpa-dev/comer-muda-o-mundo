import { ErrorSnackbar } from '@components/index';
import { useState } from 'react';
import { axios } from '@api/axios';

// TODO
// use a dialog and display more information
// store error information in sentry
export default function ErrorComponent() {
  const [values, setValues] = useState({
    error: '',
  });

  axios.interceptors.response.use(
    res => res,
    (error: Error) => {
      setValues({ error: `${error}` });

      // so that the callers deal with the error themselves
      return Promise.reject(error);
    }
  );

  return (
    <ErrorSnackbar
      message={values.error}
      open={values.error.length > 0}
      onClose={() => {
        setValues({
          ...values,
          error: '',
        });
      }}
    ></ErrorSnackbar>
  );
}
