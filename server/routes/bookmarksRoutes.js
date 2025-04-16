import express from 'express' ;
import { addBookmark,removeBookmark,getBookmarks } from '../controllers/bookmarksController.js'
const bookmarksRoutes = express.Router() ;

bookmarksRoutes.get('/:id/bookmarks',getBookmarks) ;
bookmarksRoutes.post('/:id/bookmarks',addBookmark)
bookmarksRoutes.delete('/:id/bookmarks',removeBookmark)

export default bookmarksRoutes