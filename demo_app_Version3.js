// Demo principal: jQuery + Geolocation + Google Maps + Charts
let map, myMarker, destMarker, directionsService, directionsRenderer;

const $status = $('#status');
const $myPosText = $('#myPos');
const $destPosText = $('#destPos');
const $distanceText = $('#distance');
const $destInput = $('#dest');

const DEFAULT_DEST = parseLatLngString($destInput.val() || '9.935, -84.091');

function parseLatLngString(s) {
  const m = s.split(',').map(x => parseFloat(x.trim()));
  if (m.length !== 2 || m.some(Number.isNaN)) return null;
  return new google.maps.LatLng(m[0], m[1]);
}

function initMap(center) {
  map = new google.maps.Map(document.getElementById('map'), {
    center,
    zoom: 14,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true,
  });

  myMarker = new google.maps.Marker({
    position: center,
    map,
    label: 'Yo',
    icon: { url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png' }
  });

  const dest = parseLatLngString($destInput.val()) || DEFAULT_DEST;
  destMarker = new google.maps.Marker({
    position: dest,
    map,
    label: 'Destino',
    icon: { url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png' }
  });

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer({ map });

  updateTexts(center, dest);
  drawDistance(center, dest);
  drawChart(0); // valor inicial
}

function updateTexts(myLatLng, destLatLng) {
  $myPosText.text(`${myLatLng.lat().toFixed(6)}, ${myLatLng.lng().toFixed(6)}`);
  $destPosText.text(`${destLatLng.lat().toFixed(6)}, ${destLatLng.lng().toFixed(6)}`);
}

function drawDistance(a, b) {
  if (!a || !b) return;
  const distMeters = google.maps.geometry.spherical.computeDistanceBetween(a, b);
  const km = distMeters / 1000;
  $distanceText.text(`${km.toFixed(2)} km`);
  drawChart(km);
}

function routeTo(destLatLng) {
  if (!myMarker || !destLatLng) return;
  directionsRenderer.set('directions', null);
  directionsService.route(
    {
      origin: myMarker.getPosition(),
      destination: destLatLng,
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (res, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(res);
      } else {
        alert('No se pudo calcular la ruta: ' + status);
      }
    }
  );
}

// Google Charts: gráfico simple con la distancia actual
google.charts.load('current', { packages: ['corechart'] });
function drawChart(km) {
  if (!google.visualization || !google.visualization.DataTable) return;
  const data = google.visualization.arrayToDataTable([
    ['Concepto', 'Kilómetros'],
    ['Distancia al destino', km],
    ['Resto hasta 10 km', Math.max(10 - km, 0)]
  ]);
  const options = {
    title: 'Distancia (aprox.)',
    colors: ['#1976d2', '#cfd8dc'],
    legend: { position: 'bottom' },
    pieHole: 0.4
  };
  const chart = new google.visualization.PieChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}

// Geolocalización con manejo de errores
function locate() {
  $status.text('Solicitando ubicación...');
  if (!('geolocation' in navigator)) {
    $status.text('Geolocalización no soportada en este navegador.');
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const myLatLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      if (!map) initMap(myLatLng);
      myMarker.setPosition(myLatLng);
      map.panTo(myLatLng);
      const destLatLng = parseLatLngString($destInput.val()) || DEFAULT_DEST;
      updateTexts(myLatLng, destLatLng);
      drawDistance(myLatLng, destLatLng);
      $('#routeBtn').prop('disabled', false);
      $status.text('Ubicación obtenida.');
    },
    (err) => {
      const messages = {
        1: 'Permiso denegado por el usuario.',
        2: 'Posición no disponible.',
        3: 'Tiempo de espera agotado.'
      };
      $status.text(messages[err.code] || 'Error desconocido.');
      const fallback = new google.maps.LatLng(9.935, -84.091);
      if (!map) initMap(fallback);
    },
    { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
  );
}

// Eventos de UI con jQuery
$(function () {
  $('#locateBtn').on('click', locate);

  $('#dest').on('change', () => {
    const dest = parseLatLngString($destInput.val());
    if (!dest) {
      alert('Formato inválido. Usa: lat, lng');
      return;
    }
    destMarker.setPosition(dest);
    updateTexts(myMarker ? myMarker.getPosition() : dest, dest);
    if (myMarker) drawDistance(myMarker.getPosition(), dest);
  });

  $('#routeBtn').on('click', () => {
    const dest = parseLatLngString($destInput.val()) || DEFAULT_DEST;
    routeTo(dest);
  });

  initMap(new google.maps.LatLng(9.935, -84.091));
  $status.text('Pulsa “Obtener mi posición”.');
});