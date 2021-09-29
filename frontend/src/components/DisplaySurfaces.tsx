import React from 'react';
import { Polygon, useMap } from 'react-leaflet';
import Leaflet from 'leaflet';
import axios from 'axios';

async function fetchDetails(
  datasetId: string,
  entityId: string
): Promise<string> {
  const res = await axios.get(
    `/api/surfaces/details?datasetId=${datasetId}&entityId=${entityId}`
  );

  let html = '';
  res.data.forEach((d) => {
    html += `<tr><th>${d.displayTitle}</th><td>${d.value}</td></tr>`;
  });

  const popupContent = `
    <table>
      <colgroup>
        <col style="width:33%">
        <col style="width:67%">
      </colgroup>
      <tbody>
        ${html}
      </tbody>
    </table>
  `;

  return popupContent;
}

const DisplaySurfaces: React.VFC<{ data: any }> = ({ data }) => {
  const map = useMap();
  const positions = data.location.value.map((d) => d.split(','));

  return (
    <Polygon
      positions={positions}
      pathOptions={{ color: data.borderColor, fillColor: data.fillColor }}
      eventHandlers={{
        click: async (e) => {
          const details = await fetchDetails(data.datasetId, data.id);
          Leaflet.popup().setLatLng(e.latlng).setContent(details).openOn(map);
        },
      }}
    />
  );
};

export default React.memo(DisplaySurfaces);