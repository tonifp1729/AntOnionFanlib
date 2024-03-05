import { Vista } from "./vista.js";

export class Inicio extends Vista {
    constructor(controlador, base){
        super(controlador, base)

        //Elementos de la vista
        this.btnAutores = this.base.querySelectorAll('button')[0];
        this.btnLibros = this.base.querySelectorAll('button')[1];

        this.btnAutores.onclick = this.cambiarAVistaListarAutores.bind(this);
        this.btnLibros.onclick = this.cambiarAVistaListarLibros.bind(this);
    }

    cambiarAVistaListarAutores() {
        this.mostrar(false);
        this.controlador.verVista(Vista.VistaListarAutores);
    }

    cambiarAVistaListarLibros() {
        this.mostrar(false);
        this.controlador.verVista(Vista.VistaListarLibros);
    }
}