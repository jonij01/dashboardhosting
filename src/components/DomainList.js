import React, { useState, useEffect } from 'react';
import api from '../api';

const DomainList = () => {
  const [domains, setDomains] = useState([]);

  useEffect(() => {
    fetchDomains();
  }, []);

  const fetchDomains = async () => {
    try {
      const response = await api.get('/domain_info');
      setDomains(response.data);
    } catch (error) {
      console.error('Error fetching domains:', error);
    }
  };

  return (
    <div>
      <h1>Lista de Dominios</h1>
      <ul>
        {domains.map(domain => (
          <li key={domain.id}>
            {domain.name} - {domain.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DomainList;
