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

function getDomainsFromDB() {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM domain_info', (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

function getDomainByIdFromDB(domainId) {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM domain_info WHERE id = ?', [domainId], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
}

function deleteDomainFromDB(domainId) {
  const deletedAt = new Date();
  return new Promise((resolve, reject) => {
    db.query('UPDATE domain_info SET status = ?, deleted_at = ? WHERE id = ?', ['eliminado', deletedAt, domainId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

function updateDomainStatus(domainId, status) {
  return new Promise((resolve, reject) => {
    db.query('UPDATE domain_info SET status = ? WHERE id = ?', [status, domainId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

module.exports = { getDomainsFromDB, getDomainByIdFromDB, deleteDomainFromDB, updateDomainStatus };
