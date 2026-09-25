



/* Seleccionamos y envolvamos en jquery, tnemos que usar "ready" para que primero se carga html*/ 
$(document).ready(function(){
    // al clickar cualquer imagen de galeria, segue la funcion
    $('.galeria-thumb').on('click',function(){
        // guardamos url del elemento seleccionado en una constante
    const srcSelect=$(this).attr('src')
        // ponemos atributo src(url) guardada del seleccionado al "modal-imagen"
    $('#modal-imagen').attr('src', srcSelect)
        // abrimos galerea para mostrar img seleccionado con una transicion del opacidad 300
    $('modal-galeria').fadeIn(300)

})

// cerrar modal

$('cerrar-modal').on('click', function(){
    $('modal-galeria').fadeOut(300)
})

if(e.target.id==='modal-galeria'){
    $('modal-galeria').fadeOut(300)
}
})
