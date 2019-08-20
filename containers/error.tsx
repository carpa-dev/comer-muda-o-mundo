import { ErrorSnackbar } from '@components/index';

// TODO
// use a dialog and display more information
// store error information in sentry
export default function ErrorComponent({
  error,
  onClose,
}: {
  error: Error | null;
  onClose: () => void;
}) {
  return (
    <ErrorSnackbar
      message={!!error ? `${error}` : ''}
      open={!!error}
      onClose={onClose}
    ></ErrorSnackbar>
  );
}
