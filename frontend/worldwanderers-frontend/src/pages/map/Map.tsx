import React from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const center = {
  lat: 51.4416,
  lng: 5.4697
};

const amsterdamPosition = {
  lat: 52.370216,
  lng: 4.895168
};

const parisPosition = {
  lat: 48.8566,
  lng: 2.3522
};

const berlinPosition = {
  lat: 52.520008,
  lng: 13.404954
};

function MapPage() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDvqyX1lqscWlXx7f0DG1APuO-xJL_eRg8"
  });

  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [selectedCity, setSelectedCity] = React.useState<string | null>(null);

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  const handleMarkerClick = (city: string) => {
    setSelectedCity(city);
  };

  const handleInfoWindowClose = () => {
    setSelectedCity(null);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={7}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker position={amsterdamPosition} onClick={() => handleMarkerClick('Amsterdam')} />
      <Marker position={parisPosition} onClick={() => handleMarkerClick('Paris')} />
      <Marker position={berlinPosition} onClick={() => handleMarkerClick('Berlin')} />

      {selectedCity && (
        <InfoWindow
          position={selectedCity === 'Amsterdam' ? amsterdamPosition : (selectedCity === 'Paris' ? parisPosition : berlinPosition)}
          onCloseClick={handleInfoWindowClose}
        >
          <div>
            <h3>{selectedCity}</h3>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : <></>;
}

export default React.memo(MapPage);
