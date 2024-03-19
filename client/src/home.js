import React from 'react';
import './home.css';
import sfLogo from './StudyFusionLogo.png';
import umlLogo from './umlLogo.png';

const Home = () => {
  return (
    <div className="home">
      <header className="header">
      </header>
      <section className="main-section">
        <div className="content">
          <div className="logos">
            <img src={sfLogo} alt="SF Logo" />
            <img src={umlLogo} alt="UML Logo" />
          </div>
          <h2>Join a Study Group Today!</h2>
          <p>Offering a collaborative and enjoyable experience for others, StudyFusion promotes growth among its users.</p>
        </div>
      </section>
      <footer className="footer">
        <p>&copy; 2024 StudyFusion. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
