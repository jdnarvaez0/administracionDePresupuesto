// variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

// eventos
eventListeners();
function eventListeners () {
    document.addEventListener('DOMContentLoaded' , preguntarPresupuesto);
    formulario.addEventListener('submit', agregarGastos);

}

//Clases
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number (presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }
}

class IU{
    insertarPresupuesto(cantidad){
        const {presupuesto, restante} = cantidad;

        //agregar al HMTL
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    imprimirAlertas(mensaje, tipo){
        //crear div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');
        
        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }

        //mensaje de error
        divMensaje.textContent = mensaje;
        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        //quitar del HMTL
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }
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

    iu.insertarPresupuesto(presupuesto);
}

// anade gastos
function agregarGastos(e) {
    e.preventDefault();
    
    //leer datos del formulario
    const nombre = document.querySelector('#gasto').value; 
    const cantidad = document.querySelector('#cantidad').value;

    //validar
    if (nombre === '' || cantidad === '') {
        iu.imprimirAlertas('Ambos campos son obligatorios' , 'error');

        return;
    }else if(cantidad <= 0 || isNaN(cantidadi)){
        iu.imprimirAlertas('Cantidad no valida' , 'error')

        return;
    }
}