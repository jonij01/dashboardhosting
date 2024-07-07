const axios = require('axios');
const db = require('../models/db'); // Archivo donde se configura la conexión a la base de datos

async function getPublicIP() {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    return response.data.ip;
  } catch (error) {
    console.error('Failed to fetch public IP:', error);
    return null;
  }
}

async function getDomainInfo(client, domain) {
  try {
    const response = await client.get(`get_domain_info?api.version=1&domain=${domain}`);
    console.log('Domain Info Response:', response.data);
    return response.data.data.domains;
  } catch (error) {
    console.error('Failed to fetch domain info:', error);
    return null;
  }
}

async function getAccountDetails(client, user) {
  try {
    const response = await client.get(`accountsummary?api.version=1&user=${user}`);
    console.log('Account Details Response:', response.data);
    if (response.data.metadata.result === 0 || !response.data.data.acct || response.data.data.acct.length === 0) {
      console.log(`Account does not exist for user: ${user}`);
      return null;
    }
    return response.data.data.acct[0]; // Acceder al primer objeto en el array acct
  } catch (error) {
    console.error('Failed to fetch account details:', error);
    return null;
