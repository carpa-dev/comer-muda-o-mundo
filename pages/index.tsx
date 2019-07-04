import NoSsr from '@material-ui/core/NoSsr';
import GoogleMapReact from 'google-map-react';
import '../style.css';
import Keys from '../config/keys';
import Dialog from '@material-ui/core/Dialog';
import {useState} from 'react';
import Drawer from '@material-ui/core/Drawer';
import {Marker, Navbar} from '../components';
import Base from './_Base.tsx';

const mapsProps = {
  center: {
    lat: -22.9,
    lng: -43.2,
  },
  zoom: 13,
};

function Map() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Base>
      <main style={{height: 'calc(100vh - 64px)'}}>
        <Drawer anchor="bottom" open={drawerOpen} variant="persistent">
          qato <span onClick={() => setDrawerOpen(false)}>XISZINHO</span>
          here are many variations of passages of Lorem Ipsum available, but the
          majority have suffered alteration in some form, by injected humour, or
          randomised words which don't look even slightly believable. If you are
          going to use a passage of Lorem Ipsum, you need to be sure there isn't
          anything embarrassing hidden in the middle of text. All the Lorem
          Ipsum generators on the Internet tend to repeat predefined chunks as
          necessary, making this the first true generator on the Internet. It
          uses a dictionary of over 200 Latin words, combined with a handful of
          model sentence structures, to generate Lorem Ipsum which looks
          reasonable. The generated Lorem Ipsum is therefore always free from
          repetition, injected humour, or non-characteristic words etc.
        </Drawer>
        <NoSsr>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: Keys.GOOGLE_MAPS_KEY,
            }}
            defaultZoom={mapsProps.zoom}
            defaultCenter={mapsProps.center}>
            <Marker
              onClick={() => setDrawerOpen(true)}
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
