import React, { useState, useEffect } from 'react';
import axios from 'axios';

// The CryptoConverter component handles cryptocurrency to fiat conversion
const CryptoConverter = () => {
  const [cryptos, setCryptos] = useState([]);
  const [fiats, setFiats] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [selectedFiat, setSelectedFiat] = useState('');
  const [amount, setAmount] = useState('1');
  const [convertedAmount, setConvertedAmount] = useState('');

  // Fetch lists of cryptocurrencies and fiat currencies on component mount
  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/crypto/all-cryptos');
        setCryptos(data);
        if (data.length > 0) {
          setSelectedCrypto(data[0]); // Default to the first item
        }
      } catch (error) {
        console.error('Error fetching cryptocurrencies:', error);
      }
    };

    const fetchFiats = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/fiat/all-fiats');
        setFiats(data);
        if (data.length > 0) {
          setSelectedFiat(data[0]); // Default to the first item
        }
      } catch (error) {
        console.error('Error fetching Fiats:', error);
      }
    };

    fetchCryptos();
    fetchFiats();
  }, []);

  // Convert the specified amount of cryptocurrency to fiat
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !selectedCrypto) {
      alert('Please enter all fields');
      return;
    }
    try {
      const { data } = await axios.get(`http://localhost:5000/crypto/price`, {
        params: {
          symbol: selectedCrypto,
          convert: selectedFiat,
          amount: amount
        }
      });
      setConvertedAmount(data);
    } catch (error) {
      console.error('Error converting currency:', error);
    }
  };

  // Helper function to format numbers with commas
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="converter-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="source-crypto">Source Cryptocurrency:</label>
          <select
            id="source-crypto"
            value={selectedCrypto}
            onChange={e => setSelectedCrypto(e.target.value)}
          >
            {cryptos.map(crypto => (
              <option key={crypto} value={crypto}>{crypto}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>
        <div className="form-group">
          <label htmlFor="target-currency">Target Currency:</label>
          <select
            id="target-currency"
            value={selectedFiat}
            onChange={e => setSelectedFiat(e.target.value)}
          >
            {fiats.map(fiat => (
              <option key={fiat} value={fiat}>{fiat}</option>
            ))}
          </select>
        </div>
        <button type="submit">Convert</button>
        {convertedAmount && (
          <div className="result">
            <p>Converted Amount: {numberWithCommas(Math.round(convertedAmount)) + " " + selectedFiat}</p>
          </div>
        )}
      </form>
      <style jsx>{`
        .converter-container {
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 400px;
          margin: auto;
        }

        .form-group {
          margin-bottom: 20px;
        }

        label {
          display: block;
          margin-bottom: 5px;
        }

        input, select {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        button {
          width: 100%;
          padding: 10px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        button:hover {
          background-color: #0056b3;
        }

        .result {
          margin-top: 20px;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
};

export default CryptoConverter;
