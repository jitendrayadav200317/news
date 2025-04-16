import { useState } from 'react';
import { motion } from 'framer-motion';

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (!email.includes('@')) {
      alert('Please enter a valid email.');
      return;
    }
    alert('🎉 Subscribed successfully! Check your inbox.');
    setEmail('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full my-10  text-black py-10 px-5 md:px-20 text-center"
    >
      <h2 className="text-2xl font-bold mb-2">
        📩 Get AI-Powered News Updates
      </h2>
      <p className="text-gray-400 mb-6">
        Stay updated with the latest news tailored for you.
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-3 max-w-2xl mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full md:w-2/3 px-4 py-3 border-b border-gray-400 rounded-md text-black focus:outline-none"
        />
        <button
          onClick={handleSubscribe}
          className="w-full md:w-auto px-6 py-3 bg-sky-500 text-white rounded-md  transition"
        >
          Subscribe
        </button>
      </div>
    </motion.div>
  );
};

export default NewsletterSubscription;
