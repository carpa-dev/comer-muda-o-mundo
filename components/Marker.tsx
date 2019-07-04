import Place from '@material-ui/icons/Place';
import IconButton from '@material-ui/core/IconButton';

function Marker(props: {
  lat: number;
  lng: number;
  text: string;
  onClick: () => void;
}) {
  return (
    <IconButton size="small" onClick={props.onClick}>
      <Place style={{fontSize: '48px'}} />
    </IconButton>
  );
}

export default Marker;
