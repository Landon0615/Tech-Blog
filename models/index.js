
const blogPosts = require('./blogPosts');
const Comment = require('./Comment');
const User = require('./User');

User.hasMany(blogPosts, {
  foreignKey: 'user_id'
});

blogPosts.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Comment.belongsTo(blogPosts, {
  foreignKey: 'blogPosts_id',
  onDelete: 'SET NULL'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

blogPosts.hasMany(Comment, {
  foreignKey: 'blogPosts_id'
});

module.exports = { User, blogPosts, Comment };