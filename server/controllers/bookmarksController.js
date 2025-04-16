import User from '../model/User.js';

export const addBookmark = async (req, res) => {
  console.log('hello');
  try {
    const { article } = req.body;
    console.log(article);
    console.log(req.params);
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) res.status(404).json({ message: 'User not found' });
    console.log(user);
    //check if bookmarks url already existing user.bookmarks
    const someArticle = user.bookmarks.some((b) => b.url === article.url);

    if (someArticle) res.status(400).json({ message: 'Already exists' });
    console.log(article);
    user.bookmarks.push(article);
    await user.save();
    res.status(201).json({
      message: 'Bookmark saved',
    });
  } catch (error) {}
};

export const getBookmarks = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) res.status(404).json({ message: 'User not found' });
    res.status(200).json({
      data: user.bookmarks,
    });
  } catch (error) {}
};

export const removeBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    const {articleUrl} = req.body
    const user = await User.findById(id);
    if (!user) res.status(404).json({ message: 'User not found' });
    user.bookmarks = user.bookmarks.filter(
      (b) => b.url !== articleUrl
    );
    await user.save();
    res.status(200).json({
      message: 'Bookmarks removed',
    });
  } catch (error) {}
};
