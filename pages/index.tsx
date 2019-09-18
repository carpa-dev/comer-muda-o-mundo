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
import { forwardRef, useState } from 'react';

import Keys from '@app/config/keys';
import Navbar from '@components/Navbar';
import InteractiveMap from '@containers/InteractiveMap';
import ReactMarkdown from 'markdown-to-jsx';

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
      paddingTop: theme.spacing(1),
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
  if (!Keys.GOOGLE_MAPS_KEY) {
    // TODO: validate envs separately
    throw new Error('Missing Google Maps API key');
  }

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(false);

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
          variant: 'subtitle2',
        },
      },
      p: {
        component: Typography,
        props: {
          gutterBottom: true,
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
          <InteractiveMap onMarkerClick={() => setOpen(true)} />
        </NoSsr>
        <Dialog
          aria-labelledby="initiative-dialog"
          open={open}
          onClose={onClose}
          scroll="paper"
          TransitionComponent={Transition}
          keepMounted
          fullWidth
        >
          <DialogTitle className={classes.title} disableTypography>
            <Typography component="h2" id="initiative-dialog" variant="h5">
              Raízes do Brasil
            </Typography>
            <Typography variant="body2">
              Rua Aurea, 80 – Santa Teresa – Rio de Janeiro, RJ
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
              <div>
                <img
                  src="https://images.pexels.com/photos/2194261/pexels-photo-2194261.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  className={classes.img}
                />
              </div>

              <ReactMarkdown options={markdownOptions}>
                # Sobre a iniciativa
              </ReactMarkdown>

              <Typography variant="body2" paragraph>
                Se você já ouviu a frase: “comida de verdade no campo e na
                cidade”, ela passa a fazer ainda mais sentido depois de conhecer
                o Raízes do Brasil.
              </Typography>
              <Typography variant="body2" paragraph>
                Em meio ao ar bucólico, aos bondes de meados do século XIX e à
                vista incrível do bairro de Santa Teresa, é possível encontrar
                um lugar que faz do nosso ato de comer uma forma de mudar o
                mundo.{' '}
              </Typography>
              <Typography variant="body2" paragraph>
                O Movimento dos Pequenos Agricultores, (MPA), abriu em 2017 um
                espaço que além de funcionar como base fixa do movimento social,
                abre semanalmente ao público ofertando comida do jeito que a
                gente gosta.
              </Typography>
              <Typography variant="body2" paragraph>
                Todos os alimentos servidos e comercializados ali chegam
                diretamente de camponeses, são produzidos de forma agroecológica
                e sem veneno, e vendidos a um preço justo.
              </Typography>
              <Typography variant="body2" paragraph>
                Aos sábados e domingos, a casa abre das 9h às 19h. Durante todo
                o dia, funciona uma feira e uma loja recheadas de alimentos
                agroecológicos. Ali você vai encontrar muito aipim, jiló e
                quiabo agroecológicos diretamente da Baixada Fluminense, cuscuz
                de milho não transgênico orgânico produzidos por camponesas e
                camponeses na Bahia, e até cachaça crioula de camponesas e
                camponeses do Espírito Santo.
              </Typography>

              <Typography variant="body2" paragraph>
                Junto à venda de alimentos para levar para casa, também funciona
                o restaurante onde os alimentos da feira e da lojinha viram
                ingredientes de preparações maravilhosas.
              </Typography>
              <Typography variant="body2" paragraph>
                Das 9h às 12h, acontece o Café da Manhã Camponês. É servido um
                buffet para comer à vontade, regado à muita comida de verdade,
                onde todos os alimentos são identificados com a sua origem, por
                um preço fixo de 30 reais.
              </Typography>

              <Typography variant="body2" paragraph>
                Entre às 12h e 15h é servido o almoço. Para cada dia é escolhida
                uma preparação, que sai a 25 reais para se server uma única vez,
                e 50 reais para comer à vontade. Vale a pena conferir as redes
                sociais do Raízes do Brasil, para se informar sobre o cardápio
                do dia. Algumas das receitas que já passaram por lá na hora do
                almoço foram: feijoada, feijão tropeiro, baião de dois. Todas
                essas servidas também com opção vegana.
              </Typography>
              <Typography variant="body2" paragraph>
                O café agroecológico produzido na Bahia é oferecido como
                cortesia. Além disso, também preciso dizer que no restaurante
                não circulam qualquer tipo de plástico e/ou latas. Por exemplo,
                a água mineral é oferecida a vontade e não é comercializado no
                espaço qualquer tipo de bebida ultraprocessada enlatada.
              </Typography>

              <Typography variant="body2" paragraph>
                Durante as tardes de sábado, a partir das 16h até às 19h
                funciona a tarde de petiscos. No cardápio você encontra porções
                de aipim frito e linguiça defumada diretamente do produtor,
                acompanhado por um longo cardápio de bebidas, que inclui
                cervejas artesanais, cachaças e kombuchas.
              </Typography>
              <Typography variant="body2" paragraph>
                É preciso dizer que o Raízes do Brasil funciona como um quartel
                general de várias ações que o MPA organiza pela cidade. Além
                desse espaço, acontecem também mais de 8 feiras pelo Rio de
                Janeiro. E, quinzenalmente, são entregues as Cestas Camponesas
                em 8 bairros de Rio de Janeiro e em um ponto em Niterói.
              </Typography>

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
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </main>
    </>
  );
}

export default Home;
