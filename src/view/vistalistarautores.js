import { Vista } from "./vista.js";

export class ListarAutores extends Vista {
    constructor(controlador, base){
        super(controlador, base)

        //Elementos de la vista
        this.btnNuevoAutor = this.base.querySelectorAll('button')[0];
        this.btnLibros = this.base.querySelectorAll('button')[1];

        this.btnNuevoAutor.onclick = this.cambiarAVistaInsertarAutores.bind(this);
        this.btnLibros.onclick = this.cambiarAVistaListarLibros.bind(this);
    }

    cambiarAVistaInsertarAutores() {
        this.mostrar(false);
        this.controlador.verVista(Vista.VistaInsertarAutor);
    }

    cambiarAVistaListarLibros() {
        this.mostrar(false);
        this.controlador.verVista(Vista.VistaListarLibros);
    }
}