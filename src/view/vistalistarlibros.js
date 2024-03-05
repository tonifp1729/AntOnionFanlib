import { Vista } from "./vista.js";

export class ListarLibros extends Vista {
    constructor(controlador, base){
        super(controlador, base)

        //Elementos de la vista
        this.btnAutores = this.base.querySelectorAll('button')[0];
        this.btnNuevoAutor = this.base.querySelectorAll('button')[1];

        this.btnAutores.onclick = this.cambiarAVistaListarAutores.bind(this);
        this.btnNuevoAutor.onclick = this.cambiarAVistaInsertarAutor.bind(this);
    }

    cambiarAVistaListarAutores() {
        this.mostrar(false);
        this.controlador.verVista(Vista.VistaListarAutores);
    }

    cambiarAVistaInsertarAutor() {
        this.mostrar(false);
        this.controlador.verVista(Vista.VistaInsertarAutor);
    }
}