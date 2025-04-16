import React from 'react';
import { motion } from 'framer-motion';

function About() {
  return (
    <div className="min-h-screen  flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl bg-white p-8  rounded-2xl"
      >
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          About <span className="text-sky-600">NewsAI</span>
        </h1>

        <p className="text-gray-700 text-lg leading-relaxed">
          Welcome to <span className="font-semibold">NewsAI</span>—your one-stop destination for curated, AI-powered news aggregation. 
          We bring you the latest headlines, breaking stories, and personalized news recommendations, all in real time.
        </p>

        <div className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">🌍 Our Mission</h2>
          <p className="text-gray-600">
            In a world of overwhelming information, our goal is to simplify news consumption by delivering only the most 
            relevant, high-quality stories tailored to your interests.
          </p>

          <h2 className="text-xl font-semibold text-gray-800">⚡ How It Works</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>📊 AI-powered recommendations to match your interests</li>
            <li>⏳ Real-time news updates from trusted sources</li>
            <li>📰 Smart summarization for quick reading</li>
            <li>📌 Personalized news feed & push notifications</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800">🔍 Why Choose NewsAI?</h2>
          <p className="text-gray-600">
            We leverage cutting-edge AI technology to curate stories that matter most to you. No clickbait, no distractions—just quality journalism in an easy-to-digest format.
          </p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-700 font-medium">
            Stay ahead of the news. Stay informed. Stay empowered. 🚀
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default About;
