import React, { useState } from 'react';
import api from '../api';

const S3Backups = () => {
  const [query, setQuery] = useState('');
  const [backups, setBackups] = useState([]);

  const handleSearch = () => {
    api.get(`/backups/search?q=${query}`).then(response => setBackups(response.data));
  };

  const handleDownload = (key) => {
    api.get(`/backups/download?key=${key}`, { responseType: 'blob' })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', key);
        document.body.appendChild(link);
        link.click();
      });
  };

  return (
    <div>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {backups.map(backup => (
          <li key={backup.key}>
            {backup.key} - {backup.date}
            <button onClick={() => handleDownload(backup.key)}>Download</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default S3Backups;
