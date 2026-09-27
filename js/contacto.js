

// ============================================================
// MAPA CON LEAFLET Y RUTA HASTA LA OFICINA
// ============================================================

// Creo el mapa dentro del div #map, centrado en la oficina con zoom 16
var map = L.map('map').setView([39.580146776981266, 2.6303093229614363], 16);

// Recalculo el tamaño del mapa para que se pinte bien al cargar
setTimeout(function () { map.invalidateSize(); }, 100);


// Cargo las imágenes del mapa desde OpenStreetMap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// Coordenadas fijas de la oficina (destino de la ruta)
const latOficina = 39.580146776981266;
const lngOficina = 2.6303093229614363;

// Pido la ubicación del usuario al navegador.
// Tarda un poco en responder, por eso la ruta se crea dentro de esta función
navigator.geolocation.getCurrentPosition(function (posicion) {

    // Coordenadas del usuario
    const latUsuario = posicion.coords.latitude;
    const lngUsuario = posicion.coords.longitude;

    // Creo la ruta desde el usuario hasta la oficina
    L.Routing.control({

        // Origen (usuario) y destino (oficina)
        waypoints: [
            L.latLng(latUsuario, lngUsuario),
            L.latLng(latOficina, lngOficina)
        ],

        // El panel de indicaciones empieza plegado (oculto),
        // con un botón para desplegarlo si el usuario quiere verlo
        collapsible: true,
        show: false,

        // Decido cómo se dibuja cada marcador de la ruta
        createMarker: function (i, waypoint, n) {
            // El último punto es la oficina: marcador verde fijo con su dirección
            if (i === n - 1) {

                // Creamos el icono verde
                const iconoVerde = L.icon({
                    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                    iconSize: [25, 41],      // ancho x alto del icono en píxeles
                    iconAnchor: [12, 41]     // pixel de la imagen toca el mapa (la punta de abajo)
                });

                return L.marker(waypoint.latLng, { icon: iconoVerde })
                    .bindPopup('<b>Nuestra oficina</b><br>Carrer de Vicenç Joan i Rosselló, 15');
            }

            // El primer punto es el usuario: marcador azul que se puede arrastrar
            // si su ubicación no es exacta (la ruta se recalcula sola)
            return L.marker(waypoint.latLng, { draggable: true })
                .bindPopup('Estás aquí');
        }

    }).addTo(map); // Añadimos el control de rutas (con sus marcadores) al mapa

    }, function (error) {
    // Si el usuario no da permiso de ubicacion o falla, lo muestro en la consola
    console.error("No se pudo obtener la ubicación:", error.message);
    });