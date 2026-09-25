// ============================================================
// $(document).ready() espera a que TODO el HTML de la página
// esté cargado antes de ejecutar el código de dentro.
// Si no lo pusiéramos, jQuery podría intentar buscar elementos
// (como #modal-galeria) que todavía no existen en el DOM,
// y simplemente no encontraría nada.
// ============================================================
$(document).ready(function(){

    // ============================================================
    // BLOQUE 1: Abrir el modal al hacer clic en una miniatura
    // ============================================================

    // $('.galeria-thumb') selecciona TODAS las imágenes que tengan
    // la clase "galeria-thumb" (las 4 miniaturas de tu galería).
    // .on('click', function(){...}) le dice a jQuery: "a cada una
    // de esas imágenes, ponle un escuchador de clics"
    $('.galeria-thumb').on('click', function(){

        // Dentro de esta función, "this" es la miniatura EXACTA
        // en la que se hizo clic (jQuery nos la da automáticamente).
        // $(this) la convierte en un objeto jQuery para poder
        // usar métodos como .attr()
        //
        // .attr('src') LEE el valor del atributo src de esa imagen
        // (es decir, la ruta del archivo, tipo "/images/foto1.jpg")
        const srcSelect = $(this).attr('src')

        // Ahora hacemos lo contrario: .attr('src', srcSelect)
        // ESCRIBE ese valor en el atributo src de la imagen grande
        // del modal (#modal-imagen). Así, la imagen grande pasa
        // a mostrar la misma foto que acabas de clicar
        $('#modal-imagen').attr('src', srcSelect)

        // .fadeIn(300) hace VISIBLE el modal (que empezaba oculto
        // con display:none en el CSS), con una transición suave
        // de opacidad que dura 300 milisegundos (0.3 segundos)
        $('#modal-galeria').fadeIn(300)
    })

    // ============================================================
    // BLOQUE 2: Cerrar el modal con el botón "X"
    // ============================================================

    // Seleccionamos el <span> que hace de botón de cerrar
    // (el que tiene id="cerrar-modal" en tu HTML)
    $('#cerrar-modal').on('click', function(){

        // .fadeOut(300) es lo contrario de fadeIn: oculta el modal
        // con una transición suave, también de 300ms
        $('#modal-galeria').fadeOut(300)
    })

    // ============================================================
    // BLOQUE 3: Cerrar el modal al hacer clic FUERA de la imagen
    // (en el fondo oscuro, pero NO si clicas la imagen en sí)
    // ============================================================

    // Ponemos el escuchador de clic en TODO el modal
    // (el fondo oscuro Y la imagen que está dentro, porque
    // la imagen es "hija" del modal)
    $('#modal-galeria').on('click', function(e){

        // Aquí es donde usamos "e" (el objeto del evento) que
        // jQuery nos pasa automáticamente como parámetro de
        // la función. e.target nos dice el elemento EXACTO
        // donde se hizo clic de verdad, sin importar en qué
        // elemento pusimos el .on('click')

        // Comparamos: ¿el id del elemento clicado es
        // exactamente "modal-galeria" (el fondo)?
        if (e.target.id === 'modal-galeria') {

            // Si es true → clicaste el fondo → cerramos
            $('#modal-galeria').fadeOut(300)
        }
        // Si es false (clicaste la imagen, cuyo id es
        // "modal-imagen", no "modal-galeria") → no entra
        // en el if → el modal se queda abierto
    })

})  