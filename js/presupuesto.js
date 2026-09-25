// VALIDACION CON REGEX

// ============================================================
// Referencias de los campos del formulario
// ============================================================

const nombre=document.getElementById("nombre")
const apellidos=document.getElementById("apellidos")
const telefono=document.getElementById("telefono")
const email=document.getElementById("email")



//Referencias a los <span> donde mostraremos los mensajes del error

const errorNombre=document.getElementById("error-nombre")
const errorApellidos=document.getElementById("apellidos-error")
const errorTelefono=document.getElementById("telefono-error")
const errorEmail=document.getElementById("email-error")


// ============================================================
// EXPRESIONES REGULARES (regex) — patrones para validar texto
//
// Se escriben entre barras: /patrón/
// ^ significa "inicio del texto"
// $ significa "fin del texto"
// Poniendo ambos, exigimos que TODO el texto cumpla el patrón,
// no solo una parte
// ============================================================

// [a-zA-ZÀ-ÿ\s]+ significa:
//   a-z    → cualquier letra minúscula
//   A-Z    → cualquier letra mayúscula
//   À-ÿ    → letras con acentos y la ñ (á, é, ñ, ü, etc.)
//   \s     → espacios en blanco (para nombres compuestos)
//   +      → uno o más caracteres de los anteriores

const soloLetras= /^[a-zA-ZÀ-ÿ\s]+$/

// [0-9]+ significa "uno o más dígitos del 0 al 9"

const soloNumeros=/^[0-9]+$/

// Un patrón simple de email: algo, luego @, luego algo, luego un
// punto, luego algo más. No es perfecto al 100%, pero cubre el
// formato estándar que pide el enunciado (nnnnn_nnn@zzzzz.xxx)


// ============================================================
// PATRÓN DE EMAIL — desglosado carácter a carácter
// ============================================================


const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Vamos a leerlo trozo a trozo, de izquierda a derecha:

// ^                → INICIO del texto (el email debe empezar aquí, sin nada antes)

// [^\s@]+          → Este es el corchete con NEGACIÓN, ojo con el ^ de DENTRO:
//                    - [^...] significa "cualquier carácter que NO esté en la lista"
//                    - \s dentro = espacio en blanco
//                    - @ dentro = el símbolo arroba
//                    Junto: "cualquier carácter que NO sea espacio ni @"
//                    El + de fuera = "uno o más" de esos caracteres
//                    → Esto captura la parte ANTES de la arroba (ej: "ana")

// @                → El símbolo arroba, literal, tal cual (fuera de corchetes,
//                    @ no tiene ningún significado especial en regex,
//                    así que se escribe directamente)

// [^\s@]+          → EXACTAMENTE el mismo patrón de antes, repetido:
//                    "uno o más caracteres que no sean espacio ni @"
//                    → Esto captura el DOMINIO (ej: "gmail")

// \.               → Un punto literal. IMPORTANTE: el punto SOLO (sin la \)
//                    en regex significa "cualquier carácter", no un punto de
//                    verdad. Para que sea un punto literal, hay que "escaparlo"
//                    poniendo una barra invertida delante: \.

// [^\s@]+          → Otra vez lo mismo: uno o más caracteres que no sean
//                    espacio ni @ → captura la EXTENSIÓN (ej: "com")

// $                → FIN del texto (el email debe terminar aquí, sin nada después)


// ⚠️ OJO: hay DOS símbolos "^" en esta regex con significados DISTINTOS:
//    - El primero, fuera de corchetes → "inicio del texto"
//    - Los de dentro de [^...] → "negación" (NO estos caracteres)
//    Es el mismo símbolo, pero su posición cambia completamente su significado




// ============================================================
// VALIDACIÓN EN VIVO — se comprueba cada vez que el usuario
// escribe, gracias al evento "input"
// ============================================================

nombre.addEventListener('input', ()=>{
    if(soloLetras.test(nombre.value) && nombre.value.length>0){
        errorNombre.textContent=''
    }else{
        errorNombre.textContent='Nombre no esta valido. Debe que contener solo letras y maximum 15 caracteres'
    }
})

apellidos.addEventListener('input', ()=>{
    if(soloLetras.test(apellidos.value) && apellidos.value.length>0){
        errorApellidos.textContent=''
    }else{
        errorApellidos.textContent='Apellidos no esta valido. Debe que contener solo letras y maximum 15 caracteres'
    }
})

telefono.addEventListener('input', ()=>{
    if(soloNumeros.test(telefono.value) && telefono.value.length>0 && telefono.value.length<=9){
        errorTelefono.textContent=''
    }else{
        errorTelefono.textContent='Telefono no esta valido. Debe contener solo numeros y un maximum 9 caracteres'
    }
})

email.addEventListener('input', ()=>{
    if(emailValido.test(email.value) && email.value.length>0){
        errorEmail.textContent=''
    }else{
        errorEmail.textContent='Email no valido. Asegurate te escribir bien el formato'
    }
})





/*////////////////// FORMULARIO ///////////////////////

// ============================================================
// PRESUPUESTO — REFERENCIAS A LOS CAMPOS DEL FORMULARIO
// ============================================================
// Cada constante "engancha" una variable de JS a un elemento
// concreto del HTML, usando su id. A partir de aquí podemos
// leer su valor, sus atributos data-*, o escuchar eventos en él.
*/

const producto= document.getElementById("producto") //select donde usuario eligira opcion

const extraColor=document.getElementById("extraColor") // los tres checkboxes
const extraTipografia = document.getElementById("extraTipografia") 
const extraNombre= document.getElementById("extraNombre")


const plazo=document.getElementById("plazo") // el input type= Number ,donde se escribe el plazo en meses
const total=document.getElementById("total")// // El <output> donde vamos a ESCRIBIR el resultado del cálculo
// (a diferencia de los anteriores, este no lo leemos, lo rellenamos)*/

function calcularTotal(){
    const opcionEligida= producto.options[producto.selectedIndex]
    let precioProducto= Number(opcionEligida.dataset.precio)


//Todas las extras acomulamos en una var precioExtras marcados

let precioExtras=0;

// Empezamos en 0 y vamos sumando SOLO los que estén marcados
if(extraColor.checked){
    precioExtras+=Number(extraColor.dataset.precio)
}
if(extraTipografia.checked){
    precioExtras+=Number(extraTipografia.dataset.precio)
}
if(extraNombre.checked){
    precioExtras+=Number(extraNombre.dataset.precio)
}

// SUBTOTAL ANTES DE APLICAR EL DESCUENTO

let subTotal= precioProducto+precioExtras

// APLICACION DEL DESCUENTOSEGUN PLAZO,
// -12 MESES 10% DESCUENTO
//- 6 MESES 5% DESCUENTO

let meses= Number(plazo.value)
let descuento=0

if(meses>=12){
    descuento=0.10
}

else if(meses>=1 && meses<=6 ){

    descuento=0.05
}

// TOTAL FINAL


let totalfinal=subTotal-(subTotal*descuento)

total.textContent=totalfinal.toFixed(2)+'€'
}

producto.addEventListener("change", calcularTotal )

extraColor.addEventListener("change", calcularTotal)

extraTipografia.addEventListener("change", calcularTotal)

extraNombre.addEventListener("change", calcularTotal)

plazo.addEventListener("input",calcularTotal)
 
calcularTotal()






















