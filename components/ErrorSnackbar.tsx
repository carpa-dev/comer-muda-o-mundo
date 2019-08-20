import {
  makeStyles,
  Theme,
  SnackbarContent,
  Snackbar,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles1 = makeStyles((theme: Theme) => ({
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export interface Props {
  className?: string;
  message?: string;
  open: boolean;
  onClose: () => void;
}

export default function ErrorSnackbar(props: Props) {
  const classes = useStyles1();
  const { className, message, open, onClose } = props;

  return (
    <Snackbar open={open}>
      <SnackbarContent
        className={[className, classes.error].join(' ')}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            {/* <Icon className={clsx(classes.icon, classes.iconVariant)} /> */}
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
}
