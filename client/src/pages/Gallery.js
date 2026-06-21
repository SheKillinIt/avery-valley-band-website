import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Gallery.css';

function Gallery() {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get('/api/band');
        setGallery(response.data.gallery || []);
      } catch (error) {
        console.error('Error fetching gallery:', error);
      }
    };
    fetchGallery();
  }, []);

  return (
    <main className="gallery-page">
      <h1>Gallery</h1>
      <div className="gallery-grid">
        {gallery.length > 0 ? (
          gallery.map((image, index) => (
            <div key={index} className="gallery-item">
              <img src={image.url} alt={image.caption} />
              <p className="caption">{image.caption}</p>
            </div>
          ))
        ) : (
          <p>No images in gallery yet.</p>
        )}
      </div>
    </main>
  );
}

export default Gallery;
