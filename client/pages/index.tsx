import {
  Chip,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  NoSsr,
  Slide,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions';
import {
  Close as CloseIcon,
  Delete as WasteIcon,
  Favorite as OrganicIcon,
  Group as SocialMovementIcon,
  LocalFlorist as AgroIcon,
  Pets as VeganIcon,
  Star as NoUltraprocessedIcon,
} from '@material-ui/icons';
import Head from 'next/head';
import { forwardRef, useState, useEffect } from 'react';

import Keys from '../config/keys';
import Navbar from '@components/Navbar';
import InteractiveMap from '@containers/InteractiveMap';
import ReactMarkdown from 'markdown-to-jsx';
import * as fromPublicInitiative from '@api/publicInitiative';
import { PublicInitiative } from '../models/publicInitiative';

const Transition = forwardRef<unknown, TransitionProps>(function TransitionUp(
  props,
  ref
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      margin: 0,
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    },
    text: {
      color: theme.palette.text.primary,
      paddingTop: theme.spacing(2),
    },
    chipList: {
      margin: 0,
      marginBottom: theme.spacing(1),
      padding: 0,
    },
    chip: {
      marginBottom: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    img: {
      maxWidth: '100%',
      borderRadius: theme.shape.borderRadius,
      marginTop: theme.spacing(2),
    },
    closeButton: {
      color: theme.palette.grey[500],
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
    },
  })
);

function Home() {
  // TODO: validate envs separately
  if (!Keys.GOOGLE_MAPS_KEY) {
    throw new Error('Missing Google Maps API key');
  }

  const classes = useStyles();
  const [openInitiative, setOpenInitiative] = useState<PublicInitiative | null>(
    null
  );
  const [initiatives, setInitiatives] = useState<PublicInitiative[]>();

  useEffect(() => {
    fromPublicInitiative.getAll().then(setInitiatives);
  }, []);

  const onClose = () => setOpenInitiative(null);

  const markdownOptions = {
    forceBlock: true,
    overrides: {
      h1: {
        component: Typography,
        props: {
          gutterBottom: true,
          variant: 'h6',
        },
      },
      h2: {
        component: Typography,
        props: {
          gutterBottom: true,
          variant: 'subtitle2',
        },
      },
      p: {
        component: Typography,
        props: {
          className: classes.text,
          variant: 'body2',
        },
      },
    },
  };
  return (
    <>
      <Head>
        <title>Comer muda o mundo</title>
      </Head>
      <Navbar />
      <main style={{ height: 'calc(100vh - 64px)' }}>
        <NoSsr>
          <InteractiveMap
            initiatives={initiatives}
            onMarkerClick={initiative => setOpenInitiative(initiative)}
          />
        </NoSsr>
        <Dialog
          aria-labelledby="initiative-dialog"
          open={!!openInitiative}
          onClose={onClose}
          scroll="paper"
          TransitionComponent={Transition}
          keepMounted
          fullWidth
        >
          <DialogTitle className={classes.title} disableTypography>
            <Typography component="h2" id="initiative-dialog" variant="h5">
              {openInitiative && openInitiative.name}
            </Typography>

            <Typography variant="body2">
              {openInitiative && openInitiative.address}
            </Typography>
            <IconButton
              aria-label="Fechar detalhes da iniciativa"
              className={classes.closeButton}
              onClick={onClose}
              size="small"
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <DialogContentText component="div" className={classes.text}>
              <Typography component="h1" variant="h6">
                Sobre a iniciativa
              </Typography>

              <ReactMarkdown options={markdownOptions}>
                {(openInitiative && openInitiative.post) || ''}
              </ReactMarkdown>

              {/*
              <Typography component="h3" variant="subtitle2">
                Horário de funcionamento
              </Typography>
              <Typography variant="body2" paragraph>
                Terças, sábados e domingos
              </Typography>

              <Typography
                component="h3"
                id="initiative-attrs"
                variant="subtitle2"
                gutterBottom
              >
                Características
              </Typography>
              <ul
                aria-labelledby="initiative-attrs"
                className={classes.chipList}
              >
                <Chip
                  className={classes.chip}
                  component="li"
                  icon={<AgroIcon />}
                  label="Agroecológico"
                  size="small"
                  variant="outlined"
                />
                <Chip
                  className={classes.chip}
                  component="li"
                  icon={<OrganicIcon />}
                  label="Orgânico"
                  size="small"
                  variant="outlined"
                />
                <Chip
                  className={classes.chip}
                  component="li"
                  icon={<WasteIcon />}
                  label="Redução de resíduos"
                  size="small"
                  variant="outlined"
                />
                <Chip
                  className={classes.chip}
                  component="li"
                  icon={<VeganIcon />}
                  label="Vegano"
                  size="small"
                  variant="outlined"
                />
                <Chip
                  className={classes.chip}
                  component="li"
                  icon={<NoUltraprocessedIcon />}
                  label="Sem ultraprocessados"
                  size="small"
                  variant="outlined"
                />
                <Chip
                  className={classes.chip}
                  component="li"
                  icon={<SocialMovementIcon />}
                  label="Movimento social"
                  size="small"
                  variant="outlined"
                />
              </ul>

              <Typography
                component="h3"
                id="initiative-type"
                variant="subtitle2"
                gutterBottom
              >
                Tipo de estabelecimento
              </Typography>
              <ul
                aria-labelledby="initiative-type"
                className={classes.chipList}
              >
                <Chip
                  className={classes.chip}
                  component="li"
                  label="Alimentos frescos"
                  size="small"
                />
                <Chip
                  className={classes.chip}
                  component="li"
                  label="Compras para despensa"
                  size="small"
                />
                <Chip
                  className={classes.chip}
                  component="li"
                  label="Entrega"
                  size="small"
                />
                <Chip
                  className={classes.chip}
                  component="li"
                  label="Restaurante"
                  size="small"
                />
              </ul>
              */}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </main>
    </>
  );
}

export default Home;
