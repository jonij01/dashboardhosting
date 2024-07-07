import React, { useState, useEffect } from 'react';
import api from '../api';

const ServicesList = () => {
  const [servers, setServers] = useState([]);
  const [selectedServer, setSelectedServer] = useState('');
  const [services, setServices] = useState([]);

  useEffect(() => {
    api.get('/services/servers').then(response => setServers(response.data));
  }, []);

  const handleServerChange = (e) => {
    setSelectedServer(e.target.value);
    api.get(`/services/${e.target.value}/services`).then(response => setServices(response.data));
  };

  const handleDownload = (serviceId) => {
    api.get(`/services/${serviceId}/download`, { responseType: 'blob' })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'service-info.txt');
        document.body.appendChild(link);
        link.click();
      });
  };

  return (
    <div>
      <select onChange={handleServerChange}>
        {servers.map(server => (
          <option key={server.id} value={server.id}>{server.name}</option>
        ))}
      </select>
      <ul>
        {services.map(service => (
          <li key={service.id}>
            {service.name}
            <button onClick={() => handleDownload(service.id)}>Download</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicesList;
