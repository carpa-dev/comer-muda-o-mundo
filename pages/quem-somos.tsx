import { Navbar } from '../components';
import {
  Container,
  Typography,
  makeStyles,
  Theme,
  createStyles,
  Button,
} from '@material-ui/core';
import Link from 'next/link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingBottom: `${theme.spacing(2)}px`,
      paddingTop: `${theme.spacing(4)}px`,
    },
    title: {
      paddingBottom: `${theme.spacing(2)}px`,
    },
    button: {
      marginTop: `${theme.spacing(5)}px`,

      margin: '0 auto',
      display: 'block',
    },
  })
);

export default function AboutUs() {
  const classes = useStyles();
  return (
    <>
      <Navbar />
      <Container className={classes.container} maxWidth="md">
        <Typography
          component="h1"
          variant="h3"
          gutterBottom
          className={classes.title}
        >
          Quem somos
        </Typography>

        <Typography gutterBottom paragraph>
          O <strong>Comer Muda o Mundo</strong> não é um manual de instruções,
          um guia culinário ou mesmo um mapa de caça ao tesouro. Esse é um canal
          de boas novas. É um local para nos enchermos de esperança. É,
          sobretudo, um espaço para promover encontros.
        </Typography>

        <Typography gutterBottom paragraph>
          Sabe aquele ditado “quem procura acha”? Aqui, nós achamos. Achamos
          quem, como a gente, quer fazer do ato comer uma forma de mudar o
          mundo.
        </Typography>

        <Typography gutterBottom paragraph>
          Por aqui você vai encontrar uma lista de locais que não são
          necessariamente restaurantes, supermercados ou mercearias. Não estamos
          falando de orgânicos de grife ou daqueles alimentos “saudáveis” em
          bandeja de isopor com plástico filme.
        </Typography>

        <Typography gutterBottom paragraph>
          O nosso papo é sobre mais do que isso. Aqui há um apanhado de espaços
          para comprar, cozinhar ou comer comida boa, limpa e justa. Neles,
          você, com certeza, pode descobrir de onde a sua comida vem, perguntar
          como foi ela produzida e às vezes até conhecer quem a produziu. É do
          tipo de comida que cuida de você, da agricultora ou agricultor, da
          pessoa que a está comercializando e especialmente do planeta.
        </Typography>

        <Typography gutterBottom paragraph>
          Navegue pelas nossas páginas, para depois sair do mundo virtual e
          promover encontros reais em locais que envolvam essa combinação
          poderosa: comida de verdade com pessoas de verdade.
        </Typography>

        <Link href="/">
          <Button
            component="a"
            variant="outlined"
            color="primary"
            size="large"
            className={classes.button}
          >
            Vem com a gente?
          </Button>
        </Link>
      </Container>
    </>
  );
}
