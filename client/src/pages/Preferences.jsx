import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CircleCheckBig } from 'lucide-react';
import { Button, Loader } from '@mantine/core';
import { Slide } from "react-awesome-reveal";
import { setPreferences } from '../redux/slice/newsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './preference.css';

function Preferences() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [selectedCategory, setSelectedCategory] = useState([]);
  const { loading, error } = useSelector((state) => state.news); // Redux state for loading & error

  const categories = ['Technology', 'Sports', 'Health', 'Entertainment', 'Business', 'Politics'];

  const toggleCategory = (category) => {
    setSelectedCategory((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };

  const handleSavePreferences = () => {
    dispatch(setPreferences({ preferences: selectedCategory }))
      .unwrap()
      .then(() => navigate('/'))
      .catch((error) => console.error("Error saving preferences:", error));
  };

  return (
    <Slide>
      <div className="h-screen bg-gray-100 flex flex-col justify-center items-center">
        <h1 className="text-gray-800 font-bold text-4xl tracking-wide">Select Your Interests</h1>

        <div className="card p-6 grid mt-6 grid-cols-2 sm:grid-cols-3 gap-4">
          {categories.map((category) => (
            <motion.div
              key={category}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.5 }}
              onClick={() => toggleCategory(category)}
              className={`shadow-md rounded-xl flex justify-center items-center gap-4 text-center px-5 py-3 cursor-pointer ${
                selectedCategory.includes(category) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
              }`}
            >
              {selectedCategory.includes(category) && <CircleCheckBig />}
              {category}
            </motion.div>
          ))}
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>} 

        <Button onClick={handleSavePreferences} disabled={loading} className="mt-4">
          {loading ? <Loader size="sm" color="white" /> : 'Save Preferences'}
        </Button>
      </div>
    </Slide>
  );
}

export default Preferences;
