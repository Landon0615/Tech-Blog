const router = require('express').Router();
const sequelize = require('../../config/connection');
const { blogPosts, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', withAuth, (req, res) => {
  blogPosts.findAll({
    attributes: [
      'id',
      'blogPosts_text',
      'title',
      'created_at'],
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
    .then(blogPostData => res.json(blogPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.get('/:id', withAuth, (req, res) => {
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
    .then(blogPostData => {
      if (!blogPostData) {
        res.status(404).json({ message: 'No blogPosts found with this id' });
        return;
      }
      res.json(blogPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
  blogPosts.create({
    title: req.body.title,
    blogPosts_text: req.body.blogPosts_text,
    user_id: req.session.user_id
  })
    .then(blogPostData => res.json(blogPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.put('/:id', withAuth, (req, res) => {
  blogPosts.update(
    {
      title: req.body.title,
      blogPosts_text: req.body.blogPosts_text
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(blogPostData => {
      if (!blogPostData) {
        res.status(404).json({ message: 'No blogPosts found with this id' });
        return;
      }
      res.json(blogPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  console.log('id', req.params.id);
  blogPosts.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(blogPostData => {
      if (!blogPostData) {
        res.status(404).json({ message: 'No blogPosts found with this id' });
        return;
      }
      res.json(blogPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;