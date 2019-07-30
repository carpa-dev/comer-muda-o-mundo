import MuiDrawer from '@material-ui/core/Drawer';
import NoSsr from '@material-ui/core/NoSsr';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import GoogleMapReact from 'google-map-react';
import { useState } from 'react';
import { Card, Marker } from '../components';
import Keys from '../config/keys';
import '../style.css';
import Base from './_Base';

const mapsProps = {
  center: {
    lat: -22.9,
    lng: -43.2,
  },
  zoom: 13,
};

const useStyles = makeStyles(() => createStyles({
  paperRoot: {
    backgroundColor: 'transparent',
    border: 0,
  },
}));

function Drawer(props: any) {
  const classes = useStyles();
  return (
    <MuiDrawer
      anchor="bottom"
      elevation={0}
      PaperProps={{
        classes: {
          root: classes.paperRoot,
        },
      }}
      variant="persistent"
      open={props.open}
    >
      {props.children}
    </MuiDrawer>
  );
}

function Map() {
  if (!Keys.GOOGLE_MAPS_KEY) {
    // TODO: validate envs separately
    throw new Error("Missing Google Maps API key");
  }

  // let setCenter: (center: any) => void;
  const [drawerOpen, setDrawerOpen] = useState(false);

  // const handleAPILoaded = (map: any, _maps: any) => {
  //   setCenter = (center: any) => map.setCenter(center);
  // };

  const onMarkerClick = () => {
    // setCenter(mapsProps.center);
    setDrawerOpen(true);
  };

  return (
    <Base>
      <main style={{height: 'calc(100vh - 64px)'}}>
        <Drawer anchor="bottom" open={drawerOpen} variant="persistent">
          <Card onClose={() => setDrawerOpen(false)} />
        </Drawer>
        <NoSsr>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: Keys.GOOGLE_MAPS_KEY,
            }}
            defaultZoom={mapsProps.zoom}
            defaultCenter={mapsProps.center}
            // onGoogleApiLoaded={({ map, maps }) => handleAPILoaded(map, maps)}
            yesIWantToUseGoogleMapApiInternals
          >
            <Marker
              onClick={onMarkerClick}
              lat={mapsProps.center.lat}
              lng={mapsProps.center.lng}
              text="my market"
            />
          </GoogleMapReact>
        </NoSsr>
      </main>
    </Base>
  );
}

export default Map;
