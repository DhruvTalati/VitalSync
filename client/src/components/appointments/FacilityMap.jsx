import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const typeColor = {
  hospital: '#ef4444',
  clinic: '#3b82f6',
  pharmacy: '#22c55e'
};

const FacilityMap = ({ facilities = [] }) => {
  const center = [22.5645, 72.9289];

  return (
    <div className="rounded-xl overflow-hidden border border-slate-200" style={{ height: 420 }}>
      <MapContainer center={center} zoom={12} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {facilities.map((f) => (
          <CircleMarker
            key={f._id}
            center={[f.latitude, f.longitude]}
            radius={9}
            pathOptions={{ color: typeColor[f.type], fillColor: typeColor[f.type], fillOpacity: 0.9 }}
          >
            <Popup>
              <p className="font-semibold">{f.name}</p>
              <p className="text-xs">{f.address}</p>
              <p className="text-xs">{f.phone}</p>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default FacilityMap;