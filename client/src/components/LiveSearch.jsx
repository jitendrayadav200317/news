import React, { useEffect, useState, useRef } from 'react';
import { Loader, TextInput } from '@mantine/core';
import axios from 'axios';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
function LiveSearch() {
  const searchRef = useRef();
  console.log(searchRef);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  console.log(query);
  console.log(dropdown);

  useEffect(() => {
    const handleOutSideClick = (event) => {
      console.log(searchRef.current);
      console.log(!searchRef.current.contains(event.target));

      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    window.addEventListener('click', handleOutSideClick);
    return () => window.removeEventListener('click', handleOutSideClick);
  }, []);

  useEffect(() => {
    if (query.length < 1) {
      setResults([]);
      setDropdown(false);
      return;
    }

    const fetchData = async () => {
      setDropdown(true);
      setLoading(true);
      //   setDropdown(true)
      try {
        const res = await axios.get(
          `https://newsapi.org/v2/everything?q=${query}&apiKey=22a516dc80574660bf6a75c3192b2a09`
        );
        console.log(res.data);
        setResults(res.data.articles);

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
      setLoading(false);
    };

    const timeOut = setTimeout(fetchData, 500);
    return () => clearTimeout(timeOut);
  }, [query]);
  console.log(results);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-md"
      ref={searchRef}
    >
      <TextInput
        radius={10}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
        leftSection={<Search size={16} />}
      />
      {dropdown && (
        <div className="absolute p-2 mt-2 max-h-[300px] overflow-y-scroll bg-white w-full shadow rounded-sm">
          {loading ? (
            <div className="flex px-4 py-8 justify-center items-center gap-4">
              <Loader size={20} />
              <p>Searching...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="flex gap-3 flex-col">
              {results?.map((d) => (
                <a
                  href={d.url}
                  target="_blank"
                  className="flex item-center gap-4 cursor-pointer rounded-md hover:bg-gray-100 p-1"
                >
                  <img
                    className="h-16 rounded-md w-16 object-cover"
                    src={d.urlToImage || 'https://placehold.co/16x16'}
                  />
                  <p>{d.title}</p>
                </a>
              ))}
            </div>
          ) : (
            <p className="px-4 py-8 text-center">No results found</p>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default LiveSearch;
