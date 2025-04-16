import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative h-[70vh]  text-black flex items-center justify-center px-6 text-center overflow-hidden">
      <div className="absolute inset-0  opacity-80 blur-3xl" />

      <div className="relative z-10 max-w-4xl">
        <motion.h1
          className="text-4xl md:text-7xl font-[900] leading-tight"
          style={{ fontFamily: 'PolySans Bulky' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          AI That <span className="text-sky-400">Curates</span> News For You
        </motion.h1>

        <motion.p
          className="mt-6 text-lg md:text-xl text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Get real-time breaking news, AI-powered summaries, and personalized
          recommendations. Stay informed with deep insights, trending stories,
          and expert analysis—all in one place.
        </motion.p>

        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <button className="bg-sky-500 cursor-pointer text-white px-8 py-4 text-lg font-semibold rounded-lg hover:bg-sky-600 transition-transform transform hover:scale-105 duration-200 flex items-center">
            <Sparkles className="mr-2 animate-pulse" size={24} /> Start
            Exploring
          </button>
        </motion.div>
      </div>
    </section>
  );
}
