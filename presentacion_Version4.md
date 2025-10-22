# Tema 2: jQuery y Google APIs

## 1. Introducción
Objetivo: usar jQuery para el DOM y Google APIs (Maps, Geolocation, Directions, Charts) para enriquecer la app.

## 2. jQuery: Definición e Historia
- Librería JS (2006) que simplificó DOM, eventos y AJAX.
- JS moderno cubre muchos casos; jQuery sigue en proyectos legacy.

## 3. Instalación y Sintaxis
- CDN: https://code.jquery.com/jquery-3.7.1.min.js
- Patrón: `$(selector).acción()` y encadenamiento.

## 4. Selectores
- `#id`, `.clase`, `tag`, `[attr=value]`
- Buenas prácticas: selectores específicos.

## 5. DOM y eventos
- `text()`, `html()`, `val()`, `attr()`
- `on('click', fn)` y delegación de eventos.

## 6. Geolocation API del navegador
- `navigator.geolocation.getCurrentPosition(success, error, options)`
- Errores: permiso, no disponible, timeout. Requiere HTTPS/localhost.

## 7. Google Maps JavaScript API
- Carga con `libraries=geometry`
- `Map`, `Marker`, `InfoWindow`
- Restringir la API key y habilitar billing.

## 8. Distancias entre puntos
- `google.maps.geometry.spherical.computeDistanceBetween(a, b)`
- Metros -> km; precisión.

## 9. Rutas con Directions
- `DirectionsService` + `DirectionsRenderer`
- `origin`, `destination`, `travelMode`.

## 10. Google Charts
- `google.charts.load('current', {packages:['corechart']})`
- `DataTable` + `PieChart`/`ColumnChart`.

## 11. Cloud Translation (opcional)
- Servicio de Google Cloud; requiere backend para ocultar claves.

## 12. Demo en vivo
1) Obtener ubicación  
2) Marcar destino  
3) Distancia (geometry)  
4) Ruta (Directions)  
5) Gráfico (Charts)

## 13. Conclusiones
- jQuery útil en proyectos existentes  
- Maps/Charts añaden valor rápido  
- Siguiente paso: integrar desde backend seguro

## 14. Recursos
- jQuery API: https://api.jquery.com/
- MDN Geolocation: https://developer.mozilla.org/docs/Web/API/Geolocation_API
- Maps JS: https://developers.google.com/maps/documentation/javascript
- Directions: https://developers.google.com/maps/documentation/javascript/directions
- Geometry: https://developers.google.com/maps/documentation/javascript/geometry
- Google Charts: https://developers.google.com/chart
- Cloud Translation: https://cloud.google.com/translate/docs