const { getDomainsFromDB, getDomainByIdFromDB, deleteDomainFromDB, updateDomainStatus } = require('../models/domainInfoModel');

const getDomains = async (req, res) => {
  try {
    const domains = await getDomainsFromDB();
    res.json(domains);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching domains', error });
  }
};

const getDomainById = async (req, res) => {
  const { domainId } = req.params;
  try {
    const domain = await getDomainByIdFromDB(domainId);
    res.json(domain);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching domain', error });
  }
};

const deleteDomain = async (req, res) => {
  const { domainId } = req.params;
  try {
    await deleteDomainFromDB(domainId);
    res.status(200).json({ message: 'Domain marked as deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting domain', error });
  }
};

const updateDomainStatus = async (req, res) => {
  const { domainId, status } = req.body;
  try {
    await updateDomainStatus(domainId, status);
    res.status(200).json({ message: 'Domain status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating domain status', error });
  }
};

module.exports = { getDomains, getDomainById, deleteDomain, updateDomainStatus };
