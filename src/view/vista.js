export class Vista {
    static {
        Vista.VistaPortada = Symbol('Portada')
        Vista.VistaInicio = Symbol('Inicio')
        Vista.VistaListarAutores = Symbol('Autores')
        Vista.VistaInsertarAutor = Symbol('Nuevo autor')
        Vista.VistaListarLibros = Symbol('Libros')
    }

    constructor(controlador, base) {
        this.controlador = controlador
        this.base = base
    }

    mostrar(ver) {
        if (ver)
            this.base.style.display = 'block'
        else 
            this.base.style.display = 'none'
    }
}