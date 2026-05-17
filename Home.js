import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <h2>Overfishing Awareness</h2>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </nav>

      <header className="hero-section">
        <h1>The Silent Crisis Under the Waves</h1>
        <p>Understanding how overfishing threatens our global ecosystem.</p>
      </header>

      <main className="content-grid">
        <section className="info-card">
          <h3>What is Overfishing?</h3>
          <p>Overfishing happens when large quantities of fish are caught from a stock, reducing the population to a level where it cannot recover.</p>
        </section>

        <section className="info-card">
          <h3>The Consequences</h3>
          <p>Loss of biodiversity, disrupted food chains, and the collapse of coastal economies that rely on healthy oceans.</p>
        </section>

        <section className="info-card">
          <h3>What can be done?</h3>
          <p>Implementing sustainable fishing quotas, creating marine protected areas, and choosing sustainably sourced seafood.</p>
        </section>
      </main>
    </div>
  );
};

export default Home;
