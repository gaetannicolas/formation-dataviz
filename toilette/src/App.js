import React from 'react';
import './App.css';
import { Map, Marker, CircleMarker, Popup, TileLayer } from 'react-leaflet'
import toilettes from "./toilettes.json"

const App = () => {
  console.log(toilettes)

  const typologiesSet = new Set(toilettes.map(t => t.topology));
  const typologies = [...typologiesSet];
  console.log(typologies)

  const position = [44.8618235, -0.5548524]

  const colors = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
  ];
  const markerColors = []

  for (let i = 0; i < typologies.length; i++) {
       markerColors[typologies[i]] = colors[i];
  }

  const map = (
    <Map id="myMap"  center={position} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      {toilettes.map((toilette) => (
        <CircleMarker color={markerColors[toilette.topology]} key={toilette.entityId} center={[toilette.lat, toilette.lng]} >
          <Popup>{toilette.name}</Popup>
        </CircleMarker>
      ))}
    </Map>
  )

  return (
    <div>
      {map}
    </div>
  );
}

export default App;
