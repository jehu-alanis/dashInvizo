const axios = require('axios');
const { Parser } = require('json2csv');
const fs = require('fs');

// Credenciales de Zendesk
const zendeskEmail = 'alan@onefacture.com';
const zendeskToken = 'hhFddoehvLCWazZrJousyqDggZcOqdv7PGOdlEld';
const zendeskSubdomain = 'onefacture'; // Cambia esto a tu subdominio de Zendesk


// Configuración de autenticación
const auth = Buffer.from(`${zendeskEmail}/token:${zendeskToken}`).toString('base64');

async function fetchAllUsers() {
    let users = [];
    let url = `https://${zendeskSubdomain}.zendesk.com/api/v2/users.json?page[size]=100`; // Tamaño de página ajustable con Cursor Pagination

    try {
        while (url) {
            console.log(`Solicitando URL: ${url}`);
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Basic ${auth}`,
                    'Content-Type': 'application/json',
                },
            });

            users = users.concat(response.data.users);

            // Actualizar el cursor para la siguiente página
            url = response.data.meta.has_more ? response.data.links.next : null;
        }

        return users;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error.message);
        if (error.response) {
            console.error('Detalles del error:', error.response.data);
        }
    }
}

async function exportUsersToCSV() {
    const users = await fetchAllUsers();

    if (!users || users.length === 0) {
        console.log('No se obtuvieron usuarios.');
        return;
    }

    // Campos que deseas exportar
    const fields = ['id', 'name', 'email', 'created_at', 'updated_at'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(users);

    // Escribir el archivo CSV
    fs.writeFile('usuarios_zendesk.csv', csv, (err) => {
        if (err) {
            console.error('Error al escribir el archivo CSV:', err);
        } else {
            console.log('Exportación exitosa. Archivo guardado como "usuarios_zendesk.csv".');
        }
    });
}
exportUsersToCSV();