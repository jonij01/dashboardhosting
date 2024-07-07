const { getServersFromDB, getServicesByServerFromDB, getServiceByIdFromDB } = require('../models/servicesModel');
const { createCpanelClient } = require('../utils/cpanelClient');
const axios = require('axios');

const getServers = async (req, res) => {
  try {
    const servers = await getServersFromDB();
    res.json(servers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching servers', error });
  }
};

const getServicesByServer = async (req, res) => {
  const { serverId } = req.params;
  try {
    const services = await getServicesByServerFromDB(serverId);
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error });
  }
};

const downloadService = async (req, res) => {
  const { serviceId } = req.params;
  try {
    const service = await getServiceByIdFromDB(serviceId);
    res.setHeader('Content-Disposition', `attachment; filename=${service.name}.txt`);
    res.send(service);
  } catch (error) {
    res.status(500).json({ message: 'Error downloading service', error });
  }
};

module.exports = { getServers, getServicesByServer, downloadService };
