import express from 'express'
import { fetchAllNews, fetchNewsByCategory, Preferences } from '../controllers/newsController.js';

const newRoutes= express.Router() ;


newRoutes.post('/preferences/:id' , Preferences) 
newRoutes.get('/news/:category' , fetchNewsByCategory )
newRoutes.get('/news' , fetchAllNews)
export default newRoutes 