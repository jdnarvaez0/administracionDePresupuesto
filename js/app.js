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
    nuevoGasto(gasto){
        this.gastos = [...this.gastos, gasto];
        this.calcularRestante();
    }

    calcularRestante(){
      const gastado = this.gastos.reduce( (total, gasto) => total + gasto.cantidad, 0);
      this.restante = this.presupuesto - gastado;
    }
}

class IU {
  insertarPresupuesto(cantidad) {
    const { presupuesto, restante } = cantidad;

    //agregar al HMTL
    document.querySelector("#total").textContent = presupuesto;
    document.querySelector("#restante").textContent = restante;
  }

  imprimirAlertas(mensaje, tipo) {
    //crear div
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("text-center", "alert");

    if (tipo === "error") {
      divMensaje.classList.add("alert-danger");
    } else {
      divMensaje.classList.add("alert-success");
    }

    //mensaje de error
    divMensaje.textContent = mensaje;
    document.querySelector(".primario").insertBefore(divMensaje, formulario);

    //quitar del HMTL
    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }

  agregarGastosListado(gastos) {

    this.limpiarHTML(); //elimina el html previo

    //iterar sobre los gastos
    gastos.forEach((gasto) => {
      const { cantidad, nombre, id } = gasto;

      // crer LI
      const nuevoGasto = document.createElement("li");
      nuevoGasto.className =
        "list-group-item d-flex justify-content-between aling-items-center";
      nuevoGasto.dataset.id = id;

      //agergar html del gasto
      nuevoGasto.innerHTML = `${nombre}<span class=" badge badge-pill badge-primary ">$ ${cantidad}</span>`;

      //Boton para borrar gasto
      const btnBorrar = document.createElement("button");
      btnBorrar.classList.add("btn", "btn-danger", "borrar-gasto");
      btnBorrar.innerHTML = "Borrar &times";
      nuevoGasto.appendChild(btnBorrar);

      //agergar al html
      gastoListado.appendChild(nuevoGasto);
    });
  }

  limpiarHTML(){
      while (gastoListado.firstChild ) {
         gastoListado.removeChild(gastoListado.firstChild) ;
      }
  }

  actualizarRestante(restante){
    document.querySelector("#restante").textContent = restante;
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
    const cantidad = Number(document.querySelector('#cantidad').value);

    //validar
    if (nombre === '' || cantidad === '') {
        iu.imprimirAlertas('Ambos campos son obligatorios' , 'error');

        return;
    }else if(cantidad <= 0 || isNaN(cantidad)){
        iu.imprimirAlertas('Cantidad no valida' , 'error')

        return;
    }
    // generar un objeto con el gasto
    const gasto = { nombre, cantidad, id:Date.now()};
    presupuesto.nuevoGasto(gasto);

    iu.imprimirAlertas('Gasto agregado Correctamente');

    //Imprimir los gastos
    const { gastos, restante } = presupuesto;
    iu.agregarGastosListado(gastos);

    iu.actualizarRestante(restante);
    
    //reinicio el formulario
    formulario.reset();
}