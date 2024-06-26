'use client'

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import L from 'leaflet';
import markerImage from '@/public/images/marker.png'


const MyMap = ({ markers, markerInformation }) => {
  // Définissez ici votre marqueur personnalisé
  const customIcon = new L.Icon({
    iconUrl: markerImage.src, // Chemin vers votre image PNG de marqueur personnalisé
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <MapContainer center={[markers[0].latitude, markers[0].longitude]} zoom={9} style={{ width: '100%', height: '300px' }} >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={[marker.latitude, marker.longitude]}
          icon={customIcon} // Utilisez le marqueur personnalisé ici
          draggable={true}
          animate={true}
        >
          <Popup>
          {markerInformation[index]} <br />
            A marker with coordinates: <br />
            Latitude: {marker.latitude} <br />
            Longitude: {marker.longitude}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MyMap;


