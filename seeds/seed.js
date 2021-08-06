const sequelize = require('../config/connection');
const {Comment} = require('../models')
const {blogPosts} = require('../models')

const commentData = require('./commentData.json');
const blogPostData = require('./blogPostData.json');

const seedDatabase =  () => {

   blogPosts.bulkCreate(blogPostData, {
    individualHooks: true,
    returning: true,
  });
   Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

};


seedDatabase();
