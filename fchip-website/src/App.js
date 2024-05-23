import { Navbar, Nav, Container } from 'react-bootstrap';
import './App.css';
import { CombinedComponents } from './map_page/filter';
import React from 'react';
import NavigationBar from './map_page/navbar'; // Assuming NavigationBar is in the same directory
import ProviderCard from './map_page/providercard';
import ProviderMap from './map_page/providermap';

function App() {
  return (
    <div>
      <NavigationBar />
      <CombinedComponents />
      <ProviderCard />
      <ProviderMap />
    </div>
  );
}

export default App;
