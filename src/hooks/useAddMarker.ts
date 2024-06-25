import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { MarkerType } from '../types/types';

const useAddMarker = (markers: MarkerType[], setMarkers: React.Dispatch<React.SetStateAction<MarkerType[]>>) => {
    return async (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
            const newMarker: MarkerType = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
                id: markers.length + 1
            };
            setMarkers([...markers, newMarker]);
            try {
                const markerRef = doc(collection(db, 'quests'), `quest${newMarker.id}`);
                await setDoc(markerRef, {
                    lat: newMarker.lat,
                    lng: newMarker.lng,
                    timestamp: new Date()
                });
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    };
};

export default useAddMarker;