// Una vez validado (formulario) construimos un objeto para cada elemento del formulario
// - Enviamos 
export class Rest {
    constructor() {
        this.baseUrl = 'https://migueljaque.com/fanlib/v1';
        this.token = 'A_Gd+CsYxn8_PE';
        this.headers = {
            'Fanlibtoken': this.token,
            'Content-Type': 'application/json'
        };
    }
    /* OBRA */

    async getObra() {
        try {
            const url = `${this.baseUrl}/obra`;
            const response = await fetch(url, {
                method: 'GET',
                headers: this.headers
            });
    
            if (!response.ok) {
                throw new Error(`Failed to fetch data. Status: ${response.status}`);
            }
    
            const data = await response.json(); 
                
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }

    async crearObra(obraData) {
        try {
            const url = `${this.baseUrl}/obra`;
            const response = await fetch(url, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(obraData)
            });

            return this.handleResponse(response);
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    async borrarObra(ids) {
        try {
            const url = `${this.baseUrl}/obra/${ids.join('/')}`;
            console.log(ids)
            const response = await fetch(url, {
                method: 'DELETE',
                headers: this.headers
            });

            return this.handleResponse(response);
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    /* AUTOR */
    
    async crearAutor(autorData) {
        try {
            const url = `${this.baseUrl}/autor`;
            const response = await fetch(url, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(autorData)
            });

            return this.handleResponse(response);
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    async getAutor() {
        try {
            const url = `${this.baseUrl}/autor`;
            const response = await fetch(url, {
                method: 'GET',
                headers: this.headers
            });

        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const data = await response.json(); 
            
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
    }

    async getAutorById(id) {
        try {
            const url = `${this.baseUrl}/autor/${id}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: this.headers
            });

            return this.handleResponse(response);
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }



    async handleResponse(response) {
        if (!response.ok) {
        console.error('Estado de Error:', response.status);

        const contentType = response.headers.get('content-type');
        
        if (contentType) {
            if (contentType.includes('application/json')) {
                try {
                    const errorData = await response.json();
                    console.error('Datos de Error (JSON):', errorData);
                    return errorData;
                } catch (jsonError) {
                    console.error('Error al analizar el error JSON:', jsonError);
                }
            } else if (contentType.includes('text/plain')) {
                //  respuesta de texto plano
                const errorText = await response.text();
                console.error('Datos de Error (Texto):', errorText);
                return errorText;
            } else if (contentType.includes('text/html')) {
                //  respuesta HTML
                const errorHtml = await response.text();
                console.error('Datos de Error (HTML):', errorHtml);
                return errorHtml;
            } else {
                // Manejar otros tipos de contenido según sea necesario
                console.warn('Tipo de contenido no manejado:', contentType);
            }
        }

        return null;
    }

        //  respuesta exitosa
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            console.log('Datos recibidos del servidor (JSON):', data);
            return data;
        } else if (contentType && contentType.includes('text/plain')) {
            //  respuesta de texto plano 
            const textData = await response.text();
            console.log('Datos de texto recibidos del servidor:', textData);
            return textData;
        } else if (contentType && contentType.includes('text/html')) {
            //  respuesta HTML 
            const htmlData = await response.text();
            console.log('Datos HTML recibidos del servidor:', htmlData);
            return htmlData;
        } else {
            //  otros tipos de contenido 
            console.warn('Tipo de contenido no manejado:', contentType);
        }
    }
}