import { Vista } from "./vista.js";
import { Rest } from "../service/secrets/rest.js";

export class NuevoAutor extends Vista {
    constructor(controlador, base) {
        super(controlador, base);
        
        // Obtiene las referencias a los elementos del formulario
        this.campoNombre = document.getElementById('nombre');
        this.campoFechaNacimiento = document.getElementById('fechaNacimiento');
        this.campoFechaMuerte = document.getElementById('fechaMuerte');
        this.campoNacionalidad = document.getElementById('nacionalidad');
        this.campoBiografia = document.getElementById('biografia');
        this.archivoFoto = document.getElementById('foto');
        
        // Agrega un event listener para el evento click del botón de inserción
        this.base.querySelector('#insertarAutor').addEventListener('click', (event) => {
            // Evita que el botón ejecute su comportamiento predeterminado (enviar el formulario)
            event.preventDefault();
            
            // Valida los datos del formulario
            if (this.validar()) {
                // Si la validación es exitosa, inserta el nuevo autor
                this.insertar();
            }
        });
    }

    validar() {
        // Obtiene los valores de los campos del formulario
        const nombre = this.campoNombre.value;
        const fechaNacimiento = this.campoFechaNacimiento.value;
        const fechaMuerte = this.campoFechaMuerte.value;
        const nacionalidad = this.campoNacionalidad.value;
        const foto = this.archivoFoto.files[0]; // Obtiene el archivo seleccionado
    
        // Realiza las validaciones
        if (nombre.length < 3) {
            alert('El nombre debe contener al menos 3 caracteres.');
            return false;
        }
    
        if (!fechaNacimiento) {
            alert('Por favor, introduce la fecha de nacimiento.');
            return false;
        }
    
        if (fechaMuerte && new Date(fechaMuerte) > new Date()) {
            alert('La fecha de fallecimiento no puede ser una fecha futura.');
            return false;
        }
    
        if (!nacionalidad || nacionalidad.length < 3) {
            alert('La nacionalidad debe contener al menos 3 caracteres.');
            return false;
        }
    
        // Verifica si se seleccionó un archivo para la foto
        if (foto) {
            // Obtiene la extensión del archivo
            const extension = foto.name.split('.').pop().toLowerCase();
            
            // Verifica si la extensión es una imagen
            if (!(extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'gif')) {
                alert('El archivo seleccionado no es una imagen válida. Por favor, selecciona un archivo de imagen (jpg, jpeg, png, gif).');
                return false;
            }
        }
    
        // Si todas las validaciones pasan, retorna true para permitir enviar el formulario
        return true;
    }

    async insertar() {
        try {
            // Obtiene los valores de los campos del formulario
            const nombre = this.CampoNombre.value;
            const fechaNacimiento = this.campoFechaNacimiento.value;
            const fechaMuerte = this.campoFechaMuerte.value;
            const nacionalidad = this.campoNacionalidad.value;
            const biografia = this.campoBiografia.value;
            const foto = this.archivoFoto.files[0]; // Obtiene el archivo seleccionado

            // Crea un objeto con los datos del autor
            const autorData = {
                nombre: nombre,
                fechaNacimiento: fechaNacimiento,
                fechaMuerte: fechaMuerte,
                nacionalidad: nacionalidad,
                biografia: biografia,
                foto: foto,
            };

            // Crea una instancia de la clase Rest
            const rest = new Rest();

            // Intenta crear un nuevo autor utilizando el método crearAutor de la instancia de Rest
            const respuesta = await rest.crearAutor(autorData);
            
            // Maneja la respuesta del servidor según sea necesario
            if (respuesta) {
                // La inserción en la base de datos fue exitosa
                alert('Autor insertado correctamente.');
            } else {
                // La inserción en la base de datos falló
                console.error('Error al añadir nuevo autor');
                alert('Ocurrió un error al insertar el autor.');
            }
        } catch (error) {
            // Maneja cualquier error
            console.error('Error al insertar autor:', error);
            alert('Ocurrió un error al insertar el autor. Por favor, inténtalo de nuevo más tarde.');
        }
    }
}