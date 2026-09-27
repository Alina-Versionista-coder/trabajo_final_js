

// ============================================================
// VALIDACION CON REGEX
// ============================================================

// Referencias de los campos del formulario
const nombre=document.getElementById("nombre")
const apellidos=document.getElementById("apellidos")
const telefono=document.getElementById("telefono")
const email=document.getElementById("email")



//Referencias a los <span> donde estaran los mensajes del error

const errorNombre=document.getElementById("error-nombre")
const errorApellidos=document.getElementById("apellidos-error")
const errorTelefono=document.getElementById("telefono-error")
const errorEmail=document.getElementById("email-error")


// Solo letras (con tildes y ñ) y espacios
const soloLetras= /^[a-zA-ZÀ-ÿ\s]+$/

// Solo números

const soloNumeros=/^[0-9]+$/

// Email: texto + @ + dominio + punto + extensión, sin espacios

const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Valido cada campo en vivo, cada vez que el usuario escribe (evento input)
nombre.addEventListener('input', ()=>{
    if(soloLetras.test(nombre.value) && nombre.value.length>0){
        errorNombre.textContent=''
    }else{
        errorNombre.textContent= 'Nombre no válido. Debe contener solo letras y un máximo de 15 caracteres'
    }
})

apellidos.addEventListener('input', ()=>{
    if(soloLetras.test(apellidos.value) && apellidos.value.length>0){
        errorApellidos.textContent=''
    }else{
        errorApellidos.textContent= 'Apellidos no válidos. Deben contener solo letras y un máximo de 15 caracteres'
    }
})

telefono.addEventListener('input', ()=>{
    if(soloNumeros.test(telefono.value) && telefono.value.length>0 && telefono.value.length<=9){
        errorTelefono.textContent=''
    }else{
        errorTelefono.textContent='Teléfono no válido. Debe contener solo números y un máximo de 9 cifras'
    }
})

email.addEventListener('input', ()=>{
    if(emailValido.test(email.value) && email.value.length>0){
        errorEmail.textContent=''
    }else{
        errorEmail.textContent='Email no válido. Asegúrate de escribir bien el formato'
    }
})

// ============================================================
// CALCULO DEL PRESUPUESTO
// ============================================================

// Referencias al producto, los extras, el plazo y el total

const producto= document.getElementById("producto") //select donde usuario eligira opcion

const extraColor=document.getElementById("extraColor") // los tres checkboxes
const extraTipografia = document.getElementById("extraTipografia") 
const extraNombre= document.getElementById("extraNombre")


const plazo=document.getElementById("plazo") // el input type= Number ,donde se escribe el plazo en meses
const total=document.getElementById("total")//  el <output> donde vamos a ESCRIBIR el resultado del cálculo
// (a diferencia de los anteriores, este no lo leemos, lo rellenamos)

function calcularTotal(){
    // Leo el precio del producto elegido desde su atributo data-precio
    const opcionEligida= producto.options[producto.selectedIndex]
    let precioProducto= Number(opcionEligida.dataset.precio)


// Sumo el precio de los extras que estén marcados

let precioExtras=0;

if(extraColor.checked){
    precioExtras+=Number(extraColor.dataset.precio)
}
if(extraTipografia.checked){
    precioExtras+=Number(extraTipografia.dataset.precio)
}
if(extraNombre.checked){
    precioExtras+=Number(extraNombre.dataset.precio)
}

// Subtotal antes del descuento

let subTotal= precioProducto+precioExtras

// Descuento según el plazo: 10% desde 12 meses, 5% desde 6 meses
let meses= Number(plazo.value)
let descuento=0

if(meses>=12){
    descuento=0.10
}

else if(meses>=6){

    descuento=0.05
}

// Aplico el descuento y muestro el total con 2 decimales


let totalfinal=subTotal-(subTotal*descuento)

total.textContent=totalfinal.toFixed(2)+'€'
}

// Recalculo el total cada vez que cambia el producto, un extra o el plazo
producto.addEventListener("change", calcularTotal )

extraColor.addEventListener("change", calcularTotal)

extraTipografia.addEventListener("change", calcularTotal)

extraNombre.addEventListener("change", calcularTotal)

plazo.addEventListener("input",calcularTotal)


// Calculo el total al cargar la página
calcularTotal()






















