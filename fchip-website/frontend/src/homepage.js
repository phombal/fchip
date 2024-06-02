import React from 'react';
import doctorImage from './pictures/example-doctor.png'
import styles from './homepage/homepage.module.css'
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className={styles.homePage}>
      <header className='home-header'>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#resources">Resources</a>
            </li>
            <li>
              <a href="#contact">Contact Us</a>
            </li>
          </ul>
        </nav>
        <input type="text" className="search-bar" placeholder="Search..." />
      </header>
      <main className="main-content">
        <h1>Get the health care you deserve today</h1>
        <p>
          Book appointments with providers and find pharmacies in your region
        </p>
        <div className="button-container">
          <button className="custom-button">
          <Link to="/provider_search">Find healthcare providers near you</Link>
          </button>
          <button className="custom-button">Find pharmacies near you</button>
        </div>
      </main>
      <div className="image-container">
        <img src={doctorImage} height="500" alt="smiling doctor" />
      </div>
    </div>
  );
}

export default HomePage;
