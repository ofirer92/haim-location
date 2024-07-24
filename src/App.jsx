import React, { useState } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const phoneNumber = "+972543103280";

  const sendLocation = async () => {
    setIsLoading(true);
    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by your browser');
      }

      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      const message = `My current location: https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      const url = `https://wa.me/${phoneNumber}/?text=${encodeURIComponent(message)}`;

      window.open(url, '_blank');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to get location. Please make sure location services are enabled.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="avatar">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-khhhc7dEp9FKVjvGVD4V8uMPPQbNhOF33g&s" alt="Avatar" />
      </div>
      <button onClick={sendLocation} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Send Location'}
      </button>
    </div>
  );
}

export default App;