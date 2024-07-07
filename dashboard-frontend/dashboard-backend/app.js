require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

const servicesRoutes = require('./routes/services');
const domainsRoutes = require('./routes/domains');
const backupsRoutes = require('./routes/backups');

// Middlewares
app.use(express.json());
app.use('/api/services', servicesRoutes);
app.use('/api/domains', domainsRoutes);
app.use('/api/backups', backupsRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
