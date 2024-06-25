import { MarkerType } from '../types/types';

const useRemoveMarker = (markers: MarkerType[], setMarkers: React.Dispatch<React.SetStateAction<MarkerType[]>>) => {
    return (id: number) => {
        setMarkers(markers.filter(marker => marker.id !== id));
    };
};

export default useRemoveMarker;