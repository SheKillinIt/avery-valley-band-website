import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

function Home() {
  const [bandInfo, setBandInfo] = useState(null);
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bandRes, gigsRes] = await Promise.all([
          axios.get('/api/band'),
          axios.get('/api/gigs')
        ]);
        setBandInfo(bandRes.data);
        setGigs(gigsRes.data.filter(g => new Date(g.date) > new Date()).slice(0, 5));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>🎸 Avery Valley Band</h1>
          <p>Experience unforgettable live music performances</p>
          <div className="hero-buttons">
            <a href="/booking" className="btn">Book Us Now</a>
            <a href="/gallery" className="btn btn-secondary">View Gallery</a>
          </div>
        </div>
      </section>

      <section className="about">
        <h2>About Us</h2>
        <p>{bandInfo?.about || 'We are a talented band bringing great music to your events.'}</p>
      </section>

      <section className="upcoming-gigs">
        <h2>Upcoming Shows</h2>
        <div className="gigs-grid">
          {gigs.length > 0 ? (
            gigs.map(gig => (
              <div key={gig._id} className="gig-card">
                <h3>{gig.location}</h3>
                <p><strong>Date:</strong> {new Date(gig.date).toLocaleDateString()}</p>
                <p><strong>Venue:</strong> {gig.venue}</p>
                <p>{gig.notes}</p>
                <span className={`status ${gig.status}`}>{gig.status}</span>
              </div>
            ))
          ) : (
            <p>No upcoming gigs at the moment.</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default Home;
