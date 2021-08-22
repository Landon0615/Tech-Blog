const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogPostRoutes = require('./blogPost-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/blogPost', blogPostRoutes);
router.use('/comment', commentRoutes);


module.exports = router;