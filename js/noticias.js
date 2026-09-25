


let noticias= document.getElementById("noticias")

fetch("./data/noticias.json")
    .then(response=>response.json())
       .then(data=>{
        let contenido=" "
        data.forEach(noticias => {
           contenido+= `<div class="noticia-card card">
                        <h3>${noticias.titulo}</h3>
                        <p class="noticia-fecha">${noticias.fecha}</p>
                        <p>${noticias.resumen}</p>
                        </div>`
        })

        noticias.innerHTML+=contenido

       })

       .catch(error=>console.error("error"+error))


        







