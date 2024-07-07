const axios = require('axios');

function createCpanelClient({ host, user, token }) {
  if (!host || !user || !token) {
    throw new Error('Missing cPanel configuration');
  }

  return axios.create({
    baseURL: `https://${host}:2087/json-api/`,
    headers: {
      'Authorization': `whm ${user}:${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}

module.exports = { createCpanelClient };
