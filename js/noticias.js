

// Referencia al div vacío del HTML donde vamos a pintar las noticias
let noticias= document.getElementById("noticias")

// Pido el archivo noticias.json con fetch
fetch("./data/noticias.json")
   // Convierto la respuesta en un objeto de JavaScript
    .then(response=>response.json())
      // Recorro el array de noticias y construyo el HTML de cada tarjeta
       .then(data=>{
        let contenido=" "
        data.forEach(noticias => {
           contenido+= `<div class="noticia-card card">
                        <h3>${noticias.titulo}</h3>
                        <p class="noticia-fecha">${noticias.fecha}</p>
                        <p>${noticias.resumen}</p>
                        </div>`
        })
        // Meto todas las tarjetas en el HTML de una sola vez
        noticias.innerHTML+=contenido

       })
       //En caso de fallo, se mostrara el error en la consola

       .catch(error=>console.error("error"+error))


        







