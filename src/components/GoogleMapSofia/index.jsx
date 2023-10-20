import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useCallback, useState } from 'react';
import Loader from '../Loader';

const google = window.google;

const containerStyle = {
  width: '100%',
  height: '295px'
};

const center = {
  lat: 42.662344,
  lng: 23.4559064
};

function GoogleMapSofia() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBq74d-udEuQzsjQs2XB5RAazk6Zqwa35M"
  })

  const [mapMarker, setMapMarker] = useState(null);
  const [showingInfoWindow, setShowingInfoWindow] = useState(true);

  const onMarkerClick = (props) => {
    setShowingInfoWindow(true);
  };

  const onInfoWindowClose = () => {
    setShowingInfoWindow(false);
  };

  const onLoad = (mapMarker) => {
    setMapMarker(mapMarker);
  }

  const [map, setMap] = useState(null);

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, []);

  return (
    isLoaded ?
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onUnmount={onUnmount}
      >
        <Marker
          onLoad={onLoad}
          position={{
            lat: center.lat,
            lng: center.lng
          }}
          clickable
          onClick={onMarkerClick}
        >
          {showingInfoWindow === true && (
            <InfoWindow
              position={{
                lat: center.lat,
                lng: center.lng
              }}
              onCloseClick={onInfoWindowClose}
            >
              <div className="text-start">
                <h6>София</h6>
                <p className="mb-1"> кв. "Казичене", ул. "Фармапарк" № 1, София</p>
                <a className="text-left" href="https://www.google.bg/maps/place/%22%D0%92%D0%B8+%D0%90%D0%B9+%D0%94%D0%B6%D0%B8+%D0%93%D1%80%D1%83%D0%BF%22%D0%9E%D0%9E%D0%94/@43.8323099,25.9446742,17z/data=!3m1!4b1!4m5!3m4!1s0x40ae6066a3157d69:0xf5c19cf11e9b737a!8m2!3d43.8323061!4d25.9468629">Виж в Google Maps</a>
              </div>
            </InfoWindow>
          )}
        </Marker>
      </GoogleMap> : <Loader />
  )
}

export default GoogleMapSofia;