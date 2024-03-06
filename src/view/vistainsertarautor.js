import { Vista } from "./vista.js";
import { Rest } from "../service/secrets/rest.js";

export class NuevoAutor extends Vista {
    constructor(controlador, base) {
        super(controlador, base);
        
        // Agrega un event listener para el evento submit del formulario
        this.base.addEventListener('submit', (event) => {
            // Evita que la página se recargue al enviar el formulario
            event.preventDefault();
            
            // Valida los datos del formulario
            if (this.validar()) {
                // Si la validación es exitosa, inserta el nuevo autor
                this.insertar();
            }
        });
    }

    validar() {
        const nombre = document.getElementById('nombre').value;
        const fechaNacimiento = document.getElementById('fechaNacimiento').value;
        const fechaMuerte = document.getElementById('fechaMuerte').value;
        const nacionalidad = document.getElementById('nacionalidad').value;

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

        // Si todas las validaciones pasan, retorna true para permitir enviar el formulario
        return true;
    }

    async insertar() {
        try {
            const formulario = this.base.querySelector('form'); //Utiliza la base de la vista como formulario
            const formData = new FormData(formulario);
            
            //Crea una instancia de la clase Rest
            const rest = new Rest();

            //Intenta crear un nuevo autor utilizando el método crearAutor de la instancia de Rest
            const respuesta = await rest.crearAutor(formData);
            
            //Maneja la respuesta del servidor según sea necesario
            if (respuesta) {
                //La inserción en la base de datos fue exitosa
                alert('Autor insertado correctamente.');
            } else {
                //La inserción en la base de datos falló
                console.error('Error al añadir nuevo autor');
                alert('Ocurrió un error al insertar el autor.');
            }
        } catch (error) {
            //Maneja cualquier error
            console.error('Error al insertar autor:', error);
            alert('Ocurrió un error al insertar el autor. Por favor, inténtalo de nuevo más tarde.');
        }
    }
}