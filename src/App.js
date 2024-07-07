import React from 'react';
import ServicesList from './components/ServicesList';
import DomainSearch from './components/DomainSearch';
import S3Backups from './components/S3Backups';
import DomainList from './components/DomainList';

const App = () => {
  return (
    <div>
      <h1>Dashboard de Administración</h1>
      <ServicesList />
      <DomainSearch />
      <S3Backups />
      <DomainList /> {/* Asegúrate de incluir el componente DomainList */}
    </div>
  );
};

export default App;
