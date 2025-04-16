import express from 'express' ;
import { newsSummarize } from '../controllers/aiController.js';
const aiRoutes = express.Router() ;


aiRoutes.post('/summarize',newsSummarize) ;


export default aiRoutes