import React, { useEffect, useState } from 'react';
import { Pagination, Skeleton, Badge } from '@mantine/core';
import { TrendingUp, Briefcase, Cpu, Volleyball, Landmark } from 'lucide-react';
import { fetchAllNews, addReadingHistory } from '../redux/slice/newsSlice';
import { useDispatch, useSelector } from 'react-redux';

function NewsPage() {
  const { totalPages, totalCount, news, loading } = useSelector(
    (state) => state.news
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  const categories = [
    { name: 'Trending', icon: <TrendingUp size={18} /> },
    { name: 'Politics', icon: <Landmark size={18} /> },
    { name: 'Tech', icon: <Cpu size={18} /> },
    { name: 'Sports', icon: <Volleyball size={18} /> },
    { name: 'Business', icon: <Briefcase size={18} /> },
  ];

  useEffect(() => {
    dispatch(fetchAllNews({ currentPage, search }));
  }, [currentPage, search]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleAddHistory = (n) => {
    //    articleId: String,
    // title: String,
    // source: String,
    // url: String,
    // imageUrl: String,
    // publishedAt: Date,
    const data = {
      article: {
        articleId: n._id,
        title: n.title,
        source: n.source.name,
        url: n.url,
        imageUrl: n.urlToImage,
        publishedAt: n.publishedAt,
      },
    };
    dispatch(addReadingHistory(data));
  };
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 p-6 sticky top-0 h-screen border-l border-gray-100 bg-white">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <div className="space-y-3">
          {categories.map((category) => (
            <button
              key={category.name}
              className="w-full flex cursor-pointer items-center text-sm gap-3 px-4 py-2 bg-gray-100 rounded-lg hover:bg-sky-500 hover:text-white transition"
            >
              {category.icon}
              {category.name}
            </button>
          ))}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        <h1 className="text-4xl font-bold">🔥Latest News</h1>
        <p className="text-md font-semibold  text-gray-800 mt-2">
          Stay updated with the latest headlines.
        </p>

        <div>
          {totalCount > 0 ? (
            <span className="text-gray-800 font-semibold">
              Showing {totalCount} Results
            </span>
          ) : null}
        </div>

        <input
          type="text"
          placeholder="Search news..."
          onChange={(e) => setSearch(e.target.value)}
          className="w-80 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 mt-4"
        />

        <div className="mt-6 space-y-6">
          {loading
            ? [...Array(5)].map((_, index) => (
                <Skeleton key={index} height={100} radius="md" />
              ))
            : news?.map((n, i) => (
                <div
                  key={i}
                  className="p-4 flex border border-gray-100 rounded-lg bg-white"
                >
                  <div className="flex flex-col flex-1 gap-2">
                    <a
                      href={n.url}
                      onClick={() => handleAddHistory(n)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl text-gray-800 font-semibold hover:underline"
                    >
                      {n.title}
                    </a>
                    <p className="text-gray-700 text-md">{n.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge color="blue" variant="light">
                        {n.source?.name || 'Unknown'}
                      </Badge>
                      <Badge color="green" variant="light">
                        {n.author || 'Unknown'}
                      </Badge>
                      <Badge color="gray" variant="light">
                        {new Date(n.publishedAt).toLocaleDateString()}
                      </Badge>
                    </div>
                  </div>
                  {n.urlToImage && (
                    <img
                      className="h-32 w-32 object-cover rounded-md ml-4"
                      src={n.urlToImage}
                      alt="news"
                    />
                  )}
                </div>
              ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Pagination
            value={currentPage}
            total={totalPages}
            onChange={setCurrentPage}
            color="blue"
            radius="sm"
          />
        </div>
      </main>
    </div>
  );
}

export default NewsPage;
