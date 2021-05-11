// variables y selectores
const formulario = document.querySelector('#agregar-gastos');
const gastoListado = document.querySelector('#gastos ul');




// eventos
eventListeners();
function eventListeners () {
    document.addEventListener('DOMContentLoaded' , preguntarPresupuesto);

}


//Clases



//Funciones

function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('Cual es tu presupuesto? ');
    
    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0)  {
        window.location.reload();
    }
}