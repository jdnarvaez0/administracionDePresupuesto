// variables y selectores
const formulario = document.querySelector('#agregar-gastos');
const gastoListado = document.querySelector('#gastos ul');

// eventos
eventListeners();
function eventListeners () {
    document.addEventListener('DOMContentLoaded' , preguntarPresupuesto);

}

//Clases
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number (presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }
}

class UI{

}
// instanciar
const iu = new IU();
let presupuesto;

//Funciones
function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('Cual es tu presupuesto? ');
    
    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0)  {
        window.location.reload();
    }

    //Presupuesto valido
    presupuesto = new Presupuesto (presupuestoUsuario);
    console.log(presupuesto);
}