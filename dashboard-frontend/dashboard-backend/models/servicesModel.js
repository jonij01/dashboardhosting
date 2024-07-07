const mysql = require('mysql');
const config = require('../config');

const db = mysql.createConnection(config.db);

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

function getServersFromDB() {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM servers', (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

function getServicesByServerFromDB(serverId) {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM services WHERE server_id = ?', [serverId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

function getServiceByIdFromDB(serviceId) {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM services WHERE id = ?', [serviceId], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
}

module.exports = { getServersFromDB, getServicesByServerFromDB, getServiceByIdFromDB };
