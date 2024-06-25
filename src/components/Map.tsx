import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import useAddMarker from '../hooks/useAddMarker';
import useRemoveMarker from '../hooks/useRemoveMarker';
import { MarkerType } from '../types/types';

const containerStyle = {
  width: '60vw',
  height: '60vh',
  margin: '0 auto',
  marginTop: '50px'
};

const center = {
  lat: 50.4501,
  lng: 30.5234
};

function Map() {
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const addMarker = useAddMarker(markers, setMarkers);
  const removeMarker = useRemoveMarker(markers, setMarkers);

  const handleDeleteAll = () => {
    setMarkers([]);
  };

  const handleMarkerDragEnd = (event: google.maps.MapMouseEvent, id: number) => {
    if (event.latLng) {
      const updatedMarkers = markers.map(marker =>
          marker.id === id ? { ...marker, lat: event.latLng.lat(), lng: event.latLng.lng() } : marker
      );
      setMarkers(updatedMarkers);
    }
  };

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    new MarkerClusterer({ map: mapInstance, markers });
  }, [markers]);

  return (
      <div>
        <button onClick={handleDeleteAll}>Delete All Markers</button>
        <LoadScript googleMapsApiKey="AIzaSyBLKLrOpNK1kZP_GIrsfhe_ebcROpsoQ_s">
          <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
              onClick={addMarker}
              onLoad={onLoad}
          >
            {markers.map((marker, index) => (
                <Marker
                    key={index}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    label={`${marker.id}`}
                    draggable={true}
                    onDragEnd={(event) => handleMarkerDragEnd(event, marker.id)}
                    onClick={() => removeMarker(marker.id)}
                />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
  );
}

export default React.memo(Map);