import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import newRoutes from './routes/newRoutes.js';
import cors from 'cors';
import axios from 'axios';
import bookmarksRoutes from './routes/bookmarksRoutes.js';
import readingHistoryRoutes from './routes/readingHistoryRoutes.js';
import morgan from 'morgan';
import aiRoutes from './routes/aiRoutes.js';
import News from './model/News.js';
import cron from 'node-cron';
import admin from 'firebase-admin';

const app = express();
morgan('combined');

dotenv.config();

// Firebase configuration
const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),  // Fix private key
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URL,
  token_uri: process.env.FIREBASE_TOKEN_URL,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(
  cors({
    credentials: true,
    // origin: 'https://news-one-ruby.vercel.app/login',
    origin: 'https://news-wheat-tau.vercel.app/login',
  })
);
app.use(cookieParser());
app.use(express.json());

dbConnect();

// Your cron job and other routes

const countries = ['us', 'uk', 'fr', 'in', 'it'];
const categories = [
  'health',
  'science',
  'sports',
  'entertainment',
  'politics',
  'business',
];
const fetchNewsAndStore = async () => {
  for (let country of countries) {
    for (let category of categories) {
      const { data } = await axios.get(
        `https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&apiKey=${process.env.NEWS_API_KEY}`
      );

      if (data.articles && data.articles.length > 0) {
        for (let d of data.articles) {
          const exist = await News.findOne({ title: d.title });

          if (!exist) {
            const newData = await News.create({
              content: d.content,
              title: d.title,
              author: d.author,
              description: d.description,
              url: d.url,
              urlToImage: d.urlToImage,
              category,
              publishedAt: d.publishedAt,
              country,
              source: {
                id: d.source.id,
                name: d.source.name,
              },
            });
            console.log(`Inserted ${d.title} [${category}-${country}]`);
          } else {
            console.log(`Already exists ${d.title}`);
          }
        }
      } else {
        console.log('no data found');
      }
    }
  }
};
cron.schedule('*/15 * * * *', fetchNewsAndStore);

app.get('/', (req, res) => {
  res.send('HomePage');
});

app.use('/auth', userRoutes);
app.use('/api', newRoutes);
app.use('/api', bookmarksRoutes);
app.use('/api', aiRoutes);
app.use('/api', readingHistoryRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on the PORT ${process.env.PORT}`);
});
