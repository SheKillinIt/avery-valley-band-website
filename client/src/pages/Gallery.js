import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Gallery.css';

function Gallery() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get('/api/band');
        if (response.data.gallery) {
          setImages(response.data.gallery);
        }
      } catch (error) {
        console.error('Error fetching gallery:', error);
      }
    };
    fetchGallery();
  }, []);

  return (
    <main className="gallery-page">
      <h1>Photo Gallery</h1>
      <p className="gallery-intro">Check out our amazing performances and events</p>

      {selectedImage && (
        <div className="modal" onClick={() => setSelectedImage(null)}>
          <div className="modal-content">
            <span className="close">&times;</span>
            <img src={selectedImage.url} alt={selectedImage.caption} />
            <p>{selectedImage.caption}</p>
          </div>
        </div>
      )}

      <div className="gallery-grid">
        {images.length > 0 ? (
          images.map((image, index) => (
            <div
              key={index}
              className="gallery-item"
              onClick={() => setSelectedImage(image)}
            >
              <img src={image.url} alt={image.caption} />
              <div className="gallery-overlay">
                <p>{image.caption}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-images">No images in gallery yet.</p>
        )}
      </div>
    </main>
  );
}

export default Gallery;
