const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');

// Cargar las variables de entorno desde el archivo .env
dotenv.config({ path: '/dashboard/dashboard-backend/.env' });

const app = express();
const port = 3001;

// Configura la conexión a la base de datos utilizando las variables de entorno
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Ruta para obtener la lista de dominios
app.get('/api/domain_info', (req, res) => {
  const query = 'SELECT * FROM domain_info';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener los dominios:', err);
      res.status(500).send('Error interno del servidor');
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
