import React from 'react';
import CryptoConverter from './components/Convertor';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Cryptocurrency Converter</h1>
      </header>
      <CryptoConverter />
      <style jsx>{`
        .App {
          text-align: center; // Centers the content
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; // Sets a modern font family
          color: #333; // Sets the base text color
          margin: 20px; // Adds some margin around the content
        }

        .App-header {
          margin-bottom: 40px; // Adds space below the header
        }

        h1 {
          font-size: 2.5rem; // Sets the font size of the header
          background: -webkit-linear-gradient(45deg, #6a3093, #a044ff); // Creates a gradient for webkit browsers
          -webkit-background-clip: text; // Applies the gradient as a text color in webkit browsers
          -webkit-text-fill-color: transparent; // Makes the text transparent to show the gradient underneath
          background-clip: text; // Ensures the gradient can be used as a text fill generally
          text-fill-color: transparent; // Standard property to make text transparent
          margin: 0; // Removes default margin
        }
      `}</style>
    </div>
  );
}

export default App;
