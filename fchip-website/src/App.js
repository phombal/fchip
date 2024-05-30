import { Navbar, Nav, Container } from 'react-bootstrap';
import './App.css';
import { CombinedComponents } from './map_page/filter';
import React from 'react';
import NavigationBar from './map_page/navbar'; // Assuming NavigationBar is in the same directory
import ProviderCard from './map_page/providercard';
import ProviderMap from './map_page/providermap';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // Import i18n configuration

function App() {
  return (
    <div>
      <NavigationBar />
      <CombinedComponents />
      <ProviderMap />
    </div>
  );
}

export default App;
