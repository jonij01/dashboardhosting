const axios = require('axios');
const { createCpanelClient } = require('./utils/cpanelClient');
const { getPublicIP, getDomainInfo, getAccountDetails, cleanDiskValue, dataHasChanged, upsertDomainInfo } = require('./utils/helpers');
const cpanelConfig = require('./config').cpanel;

// Ejemplo de uso de la función upsertDomainInfo
async function processDomain(domain) {
  const client = createCpanelClient(cpanelConfig);
  const domains = await getDomainInfo(client, domain);

  if (domains && domains.length > 0) {
    for (const domainInfo of domains) {
      const accountDetails = await getAccountDetails(client, domainInfo.user);

      if (accountDetails) {
        const data = {
          ipv4: await getPublicIP(),
          user: domainInfo.user,
          domain: domainInfo.domain,
          plan: accountDetails.plan,
          suspended: accountDetails.suspended,
          disk_used: cleanDiskValue(accountDetails.diskused),
          disk_limit: cleanDiskValue(accountDetails.disklimit)
        };

        await upsertDomainInfo(data);
      } else {
        console.log(`Account details not found for user: ${domainInfo.user}`);
      }
    }
  } else {
    console.log('No domains found or failed to fetch domain info.');
  }
}

// Llamar a la función processDomain con el dominio deseado
processDomain('example.com');
