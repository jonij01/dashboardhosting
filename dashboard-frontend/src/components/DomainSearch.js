import React, { useState } from 'react';
import api from '../api';

const DomainSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    api.get(`/domains/search?q=${query}`).then(response => setResults(response.data));
  };

  return (
    <div>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <table>
        <thead>
          <tr>
            <th>Domain</th>
            <th>Space Used</th>
            <th>Status</th>
            <th>Plan</th>
            <th>IP</th>
            <th>Server</th>
          </tr>
        </thead>
        <tbody>
          {results.map(result => (
            <tr key={result.id}>
              <td>{result.name}</td>
              <td>{result.space_used}</td>
              <td>{result.status}</td>
              <td>{result.plan}</td>
              <td>{result.ip}</td>
              <td>{result.server_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DomainSearch;
