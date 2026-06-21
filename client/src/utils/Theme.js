import React, { useEffect } from 'react';
import axios from 'axios';

function Theme() {
  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await axios.get('/api/theme');
        const theme = response.data;

        const root = document.documentElement;
        root.style.setProperty('--primary-color', theme.primaryColor);
        root.style.setProperty('--secondary-color', theme.secondaryColor);
        root.style.setProperty('--bg-color', theme.backgroundColor);
        root.style.setProperty('--text-color', theme.textColor);
      } catch (error) {
        console.error('Error fetching theme:', error);
      }
    };
    fetchTheme();
  }, []);

  return null;
}

export default Theme;
