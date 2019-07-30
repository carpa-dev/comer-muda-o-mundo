import Button from '@material-ui/core/Button';
import MuiCard from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Close from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '70vw',
      maxWidth: 600,
      minHeight: 200,
      margin: `0 auto ${theme.spacing(2)}px`,
    },
  })
);

function Card(props: any) {
  const classes = useStyles();
  return (
    <MuiCard classes={classes}>
      <CardActionArea>
        <CardContent>
          <Grid
            alignItems="center"
            justify="space-between"
            spacing={1}
            container
          >
            <Grid item>
              <Typography variant="h6">Raízes do Brasil</Typography>
            </Grid>
            <Grid item>
              <IconButton size="small" onClick={props.onClose}>
                <Close />
              </IconButton>
            </Grid>
            <Grid xs={12} item>
              <Typography variant="subtitle1">
                Rua Aurea, 80 – Santa Teresa – Rio de Janeiro
              </Typography>
            </Grid>
            <Grid xs={12} item>
              <Typography variant="body2" gutterBottom>
                Horário de funcionamento: terças, sábados e domingos
              </Typography>
              <Typography variant="body2" gutterBottom>
                Tipo de estabelecimento: compra de alimentos frescos + compras
                para a despensa + restaurante + entrega de alimentos
              </Typography>
              <Typography variant="body2">
                Características: Agroecológico, Orgânico, Redução de resíduos
                (sem plástico, lixo zero), Vegano, Sem alimentos
                ultraprocessados, Ligação com movimento social
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button>Ver mais</Button>
      </CardActions>
    </MuiCard>
  );
}

export default Card;
