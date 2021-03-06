const router = require('express').Router();
const sequelize = require('../config/connection');
const { blogPosts, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, (req, res) => {
  blogPosts.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'blogPosts_text',
      'title',
      'created_at'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'blogPosts_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(blogPostData => {
      const blogPost = blogPostData.map(blogPosts => blogPosts.get({ plain: true }));
      res.render('dashboard', { blogPost, loggedIn: true, username: req.session.username });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
  blogPosts.findByPk(req.params.id, {
    attributes: [
      'id',
      'blogPosts_text',
      'title',
      'created_at'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'blogPosts_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(blogPostData => {
      if (blogPostData) {
        const blogPost = blogPostData.get({ plain: true });
        
        res.render('edit-post', {
          blogPost,
          loggedIn: true,
          username: req.session.username
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});


module.exports = router;