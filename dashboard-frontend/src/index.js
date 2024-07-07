const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const app = express();
const port = 3001;

// Configura la conexión a la base de datos utilizando las variables de entorno
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Ruta para obtener la lista de dominios
app.get('/api/domain_info', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM domain_info');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener los dominios:', error);
    res.status(500).send('Error interno del servidor');
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
