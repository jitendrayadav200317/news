import { motion } from 'framer-motion';

const featuredArticles = [
  {
    id: 1,
    title: 'The Future of AI in Journalism',
    author: 'John Doe',
    date: 'Feb 28, 2025',
    excerpt:
      'AI is transforming the way news is reported and consumed. What does the future hold for human journalists?',
    image: 'https://source.unsplash.com/600x400/?ai,news',
  },
  {
    id: 2,
    title: 'Bias in AI-Powered News',
    author: 'Jane Smith',
    date: 'Feb 25, 2025',
    excerpt:
      'How do AI algorithms shape the news we see, and can they be truly unbiased?',
    image: 'https://source.unsplash.com/600x400/?news,writing',
  },
  {
    id: 3,
    title: 'The Ethics of AI-Generated News',
    author: 'Alice Brown',
    date: 'Feb 22, 2025',
    excerpt:
      'As AI-generated articles become more common, ethical concerns arise about misinformation and credibility.',
    image: 'https://source.unsplash.com/600x400/?technology,writing',
  },
];

const EditorialsSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-gray-50 py-12 px-5 md:px-20"
    >
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
        📰 Featured Editorials
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        {featuredArticles.map((article) => (
          <motion.div
            key={article.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {article.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                By {article.author} • {article.date}
              </p>
              <p className="text-gray-700">{article.excerpt}</p>
              <button className="mt-4 text-sky-400 font-semibold hover:underline">
                Read More →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default EditorialsSection;
