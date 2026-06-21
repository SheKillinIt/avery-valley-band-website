import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Gallery.css';

function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get('/api/band');
        setImages(response.data.gallery || []);
      } catch (error) {
        console.error('Error fetching gallery:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <main className="gallery-page">
      <h1>Gallery</h1>
      <p>Check out our performances and events</p>

      {loading ? (
        <p>Loading gallery...</p>
      ) : images.length > 0 ? (
        <div className="gallery-grid">
          {images.map((image, index) => (
            <div key={index} className="gallery-item">
              <img src={image.url} alt={image.caption} />
              {image.caption && <p>{image.caption}</p>}
            </div>
          ))}
        </div>
      ) : (
        <p>Gallery coming soon...</p>
      )}
    </main>
  );
}

export default Gallery;
