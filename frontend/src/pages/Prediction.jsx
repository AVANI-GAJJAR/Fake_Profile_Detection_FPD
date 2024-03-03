// src/App.js
import React, { useState } from 'react';
import { FaInstagram } from 'react-icons/fa';

const Predictions = () => {
  const [userData, setUserData] = useState({
    userFollowerCount: 0,
    userFollowingCount: 0,
    userBiographyLength: 0,
    userMediaCount: 0,
    userHasProfilPic: 0,
    userIsPrivate: 0,
    usernameDigitCount: 0,
    usernameLength: 0,
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: parseInt(value) }));
  };

  const predictHandler = async () => {
    try {
      setLoading(true);

      // Replace 'https://your-api-endpoint' with your actual API endpoint
      const response = await fetch('http://localhost:8000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch prediction from the API');
      }

      const result = await response.json();
      return result.prediction; // Adjust this based on your API response structure
    } catch (error) {
      console.error('Error fetching prediction:', error);
      return 'Error fetching prediction';
    } finally {
      setLoading(false);
    }
  };

  const handlePredict = async () => {
    // Call the predictHandler function here
    const result = await predictHandler();

    // Update the state with the prediction result
    setPrediction(result);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white my-4 rounded-md shadow-md">
        <div className="flex justify-center items-center mb-6">
          <FaInstagram className="text-4xl" />
        </div>

        {/* Input Form */}
        <form className="mb-4">
          {Object.keys(userData).map((key) => (
            <div key={key} className="mb-4">
              <label htmlFor={key} className="block text-gray-700 font-semibold mb-2">
                {key}
              </label>
              <input
                type="number"
                id={key}
                name={key}
                value={userData[key]}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          ))}
        </form>

        {/* Button to Trigger Prediction */}
        <button
          onClick={handlePredict}
          className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold w-full"
          disabled={loading}
        >
          {loading ? 'Predicting...' : 'Predict'}
        </button>

        {/* Display Prediction */}
        {prediction !== null && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Prediction</h3>
            <p>{prediction===1?"It is fake":"It is real"}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Predictions;
