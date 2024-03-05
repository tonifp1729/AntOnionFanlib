import { Vista } from "../view/vista.js";
import { NuevoAutor } from "../view/vistainsertarautor.js";
import { Portada } from "../view/vistaportada.js";
import { Inicio } from "../view/vistainicio.js";
import { ListarAutores } from "../view/vistalistarautores.js";
import { ListarLibros } from "../view/vistalistarlibros.js";

class Controlador{
    //Objeto vistas que almacenar las vistas que asociaremos al objeto
    vistas = new Map();

    constructor(){

        //Referencias a los elementos de la interfaz inicializadas
        const divPortada = document.getElementById('vistaPortada');
        const divInicio = document.getElementById('vistaInicio');
        const divInsertarAutor = document.getElementById('vistaInsertarAutores');
        const divListarAutores = document.getElementById('vistaListarAutores');
        const divListarLibros = document.getElementById('vistaListarLibros');

        //Creación de las vistas
        this.vistas.set(Vista.VistaPortada, new Portada(this,divPortada ));
        this.vistas.set(Vista.VistaInicio, new Inicio(this,divInicio));
        this.vistas.set(Vista.VistaListarAutores, new ListarAutores(this, divListarAutores));
        this.vistas.set(Vista.VistaInsertarAutor, new NuevoAutor(this, divInsertarAutor));
        this.vistas.set(Vista.VistaListarLibros, new ListarLibros(this,divListarLibros));

        this.verVista(Vista.VistaPortada);
    }

    verVista(vista) {
        this.ocultarVistas();
        this.vistas.get(vista).mostrar(true);
    }

    ocultarVistas(){
        for(const vista of this.vistas.values()){
            vista.mostrar(false);
        }
    }
}

//Cargamos el controlador
window.onload = () => {new Controlador()}