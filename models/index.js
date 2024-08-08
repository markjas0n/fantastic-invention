const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Tag = require('./Tag'); // Ensure this line exists and is correct
const PostTag = require('./PostTag');

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

Post.belongsToMany(Tag, {
  through: PostTag,
  foreignKey: 'post_id',
});

Tag.belongsToMany(Post, {
  through: PostTag,
  foreignKey: 'tag_id',
});

module.exports = { User, Post, Comment, Tag, PostTag };
