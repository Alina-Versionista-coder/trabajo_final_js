

/*===================================================================================
                                    LEAFLET
===================================================================================*/

// ------------------------------------------------------------------
// PASO 1: Creamos el mapa centrado en la oficina, con zoom inicial 16
// ------------------------------------------------------------------
var map = L.map('map').setView([39.580146776981266, 2.6303093229614363], 16);
setTimeout(function () { map.invalidateSize(); }, 100);


// ------------------------------------------------------------------
// PASO 2: Añadimos las "teselas" (las imágenes del mapa en sí),
// que vienen de OpenStreetMap
// ------------------------------------------------------------------
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// ------------------------------------------------------------------
// PASO 3: Coordenadas fijas de la oficina (destino de la ruta)
// ------------------------------------------------------------------
const latOficina = 39.580146776981266;
const lngOficina = 2.6303093229614363;


// ------------------------------------------------------------------
// PASO 4: Pedimos la ubicación del usuario al navegador.
// Esto es ASÍNCRONO: el navegador tarda un poco en responder,
// así que todo lo que dependa de esa ubicación (crear la ruta)
// tiene que ir DENTRO de esta función.
// ------------------------------------------------------------------
navigator.geolocation.getCurrentPosition(function (posicion) {

    // Coordenadas del usuario, ya obtenidas
    const latUsuario = posicion.coords.latitude;
    const lngUsuario = posicion.coords.longitude;


    // ------------------------------------------------------------------
    // PASO 5: Creamos el control de rutas entre usuario y oficina
    // ------------------------------------------------------------------
    L.Routing.control({

        // Los dos puntos de la ruta: origen (usuario) y destino (oficina)
        waypoints: [
            L.latLng(latUsuario, lngUsuario),
            L.latLng(latOficina, lngOficina)
        ],

        // El panel de indicaciones empieza plegado (oculto),
        // con un botón para desplegarlo si el usuario quiere verlo
        collapsible: true,
        show: false,

        // ------------------------------------------------------------------
        // createMarker: aquí decidimos CÓMO se dibuja cada marcador.
        // Leaflet Routing Machine llama a esta función una vez por cada
        // punto de la ruta (en nuestro caso, 2 veces: usuario y oficina).
        //
        // Parámetros que nos da automáticamente:
        //   i = posición del punto en la lista (0 = primero, empieza en 0)
        //   waypoint = el punto en sí (con sus coordenadas en waypoint.latLng)
        //   n = número total de puntos en la ruta (aquí, 2)
        // ------------------------------------------------------------------
        createMarker: function (i, waypoint, n) {

            // Si es el ÚLTIMO punto de la lista (i === n - 1),
            // es la oficina → marcador verde
            if (i === n - 1) {

                // Creamos el icono verde
                const iconoVerde = L.icon({
                    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                    iconSize: [25, 41],      // ancho x alto del icono en píxeles
                    iconAnchor: [12, 41]     // qué píxel de la imagen toca el mapa (la punta de abajo)
                });

                // Creamos el marcador de la oficina:
                // - con el icono verde
                // - SIN draggable (no se puede mover, es una ubicación fija)
                // - con su popup con la dirección real
                return L.marker(waypoint.latLng, { icon: iconoVerde })
                    .bindPopup('<b>Nuestra oficina</b><br>Carrer de Vicenç Joan i Rosselló, 15');
            }

            // Si NO es el último punto, es el usuario → marcador azul normal
            // - draggable: true → el usuario puede arrastrarlo si su ubicación
            //   detectada automáticamente no es exacta, y la ruta se recalcula sola
            return L.marker(waypoint.latLng, { draggable: true })
                .bindPopup('Estás aquí');
        }

    }).addTo(map); // Añadimos el control de rutas (con sus marcadores) al mapa

}); // Fin de getCurrentPosition