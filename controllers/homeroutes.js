const router = require('express').Router();
const { User, blogPosts, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {

    blogPosts.findAll({
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
        .then(blogPostsData => {
          const blogPost = blogPostsData.map(blogPosts => blogPosts.get({ plain: true }));
    
          res.render('homepage', {
            blogPost,
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });

router.get('/login', (req, res) => {

    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/blogPost/:id', (req, res) => {
  blogPosts.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'blogPosts_text',
      'title',
      'created_at',
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
    .then(postData => {
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      const blogPost = postData.get({ plain: true })


      res.render('single-post', {
        blogPost,
        loggedIn: req.session.loggedIn,
        username: req.session.username
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/register', (req, res) => {

    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('register');
});



module.exports = router;
