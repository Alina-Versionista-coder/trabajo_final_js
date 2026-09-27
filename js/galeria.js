
// Espero a que el HTML este cargado antes de ejecutar el código
$(document).ready(function(){

    // Al hacer clic en una miniatura, abro el modal con esa imagen
    $('.galeria-thumb').on('click', function(){

        // Guardo la ruta (src) de la imagen en la que se ha hecho clic
        const srcSelect = $(this).attr('src')

        // Pongo esa misma ruta en la imagen grande del modal
        $('#modal-imagen').attr('src', srcSelect)

        // Muestro el modal con una transicion suave
        $('#modal-galeria').fadeIn(300)
    })

    // Al hacer clic en la X, cierro el modal
    $('#cerrar-modal').on('click', function(){
        $('#modal-galeria').fadeOut(300)
    })

    // Si hago clic en el fondo oscuro (fuera de la imagen), tambien cierro el modal
    $('#modal-galeria').on('click', function(e){

        // e.target es el elemento exacto donde se hizo clic:
        // solo cierro si es el fondo, no la imagen
        if (e.target.id === 'modal-galeria') {
            $('#modal-galeria').fadeOut(300)
        }
    })
})  