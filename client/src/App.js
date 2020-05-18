import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

import {listLogEntries} from './api';

const App = () =>  {
  const [logEntries, setLogEntries] = useState([])
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.6,
    longitude: -95.665,
    zoom: 3
  });

  useEffect(() => {
    // useEffect is not async, to get the async behavior, use an IIFE to avoid race condition
    (async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
    })();
  }, [])

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/thecjreynolds/ck117fnjy0ff61cnsclwimyay"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
      {
        logEntries.map(entry => (
          <Marker key={entry._id} latitude={entry.latitude} longitude={entry.longitude} offsetLeft={-20} offsetTop={-10}>
            <div>{entry.title}</div>
          </Marker>
        ))
      }
    </ReactMapGL>
  );
}

export default App;
