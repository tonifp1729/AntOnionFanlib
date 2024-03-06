import { Vista } from "./vista.js";

export class Portada extends Vista {

    constructor(controlador,base){
        super(controlador,base)

        this.iniciarTemporizador();
    }

    iniciarTemporizador() {
        // Almacena una referencia a "this" para poder acceder a ella dentro de setTimeout
        const vistaactual = this;

        // Inicia el temporizador para cambiar de vista después de 15 segundos
        setTimeout(function() {
            vistaactual.cambiarAVistaInicio(); // Llama a la función para cambiar a la vista "vistainicio"
        }, 3000);
    }

    cambiarAVistaInicio() {
        // Oculta la vista "vistaPortada"
        this.mostrar(false);

        // Muestra la vista "vistaInicio"
        this.controlador.verVista(Vista.VistaInicio);
    }
}