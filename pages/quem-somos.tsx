import { Card, Marker, Navbar } from '../components';
import {
  Container,
  Typography,
  Paper,
  makeStyles,
  Theme,
  createStyles,
  Button,
  Fab,
  Link,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingBottom: `${theme.spacing(2)}px`,
      paddingTop: `${theme.spacing(4)}px`,
    },
    title: {
      paddingBottom: `${theme.spacing(2)}px`,
    },
    buttonWrapper: {
      paddingTop: `${theme.spacing(4)}px`,
      textAlign: 'center',
    },
  })
);

export default function AboutUs() {
  const classes = useStyles();
  return (
    <>
      <Navbar />
      <Container className={classes.container} maxWidth="md">
        <Typography variant="h3" gutterBottom className={classes.title}>
          Quem somos
        </Typography>

        <Typography variant="body1" gutterBottom paragraph>
          O Comer Muda o Mundo não é um manual de instruções, um guia culinário
          ou mesmo um mapa de caça ao tesouro. Esse é um canal de boas novas. É
          um local para nos enchermos de esperança. É, sobretudo, um espaço para
          promover encontros.
        </Typography>

        <Typography variant="body1" gutterBottom paragraph>
          Sabe aquele ditado “quem procura acha”? Aqui, nós achamos. Achamos
          quem, como a gente, quer fazer do ato comer uma forma de mudar o
          mundo.
        </Typography>

        <Typography variant="body1" gutterBottom paragraph>
          Por aqui você vai encontrar uma lista de locais que não são
          necessariamente restaurantes, supermercados ou mercearias. Não estamos
          falando de orgânicos de grife ou daqueles alimentos “saudáveis” em
          bandeja de isopor com plástico filme.
        </Typography>

        <Typography variant="body1" gutterBottom paragraph>
          O nosso papo é sobre mais do que isso. Aqui há um apanhado de espaços
          para comprar, cozinhar ou comer comida boa, limpa e justa. Neles,
          você, com certeza, pode descobrir de onde a sua comida vem, perguntar
          como foi ela produzida e às vezes até conhecer quem a produziu. É do
          tipo de comida que cuida de você, da agricultora ou agricultor, da
          pessoa que a está comercializando e especialmente do planeta.
        </Typography>

        <Typography variant="body1" gutterBottom paragraph>
          Navegue pelas nossas páginas, para depois sair do mundo virtual e
          promover encontros reais em locais que envolvam essa combinação
          poderosa: comida de verdade com pessoas de verdade.
        </Typography>

        <div className={classes.buttonWrapper}>
          <Button variant="outlined" color="primary" size="large">
            <Link href="/">Vem com a gente?</Link>
          </Button>
        </div>
      </Container>
    </>
  );
}