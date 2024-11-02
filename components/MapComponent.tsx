import { MapContainer, TileLayer, Circle, useMapEvents } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapComponentProps {
  center: LatLngExpression;
  radius: number;
  setCenter: (coords: LatLngExpression) => void;
}

const MapSelector = ({
  setCenter,
}: {
  setCenter: (coords: LatLngExpression) => void;
}) => {
  const map = useMapEvents({
    click(e) {
      setCenter([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

export default function MapComponent({
  center,
  radius,
  setCenter,
}: MapComponentProps) {
  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Circle center={center} radius={radius} />
        <MapSelector setCenter={setCenter} />
      </MapContainer>
    </div>
  );
}
