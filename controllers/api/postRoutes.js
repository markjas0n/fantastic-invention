const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    // Create a new post with the data from the request body and the user ID from the session
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    
    // Respond with the new post data
    res.status(200).json(newPost);
  } catch (err) {
    // Respond with an error if post creation fails
    res.status(400).json(err);
  }
});

// Route to update an existing post
router.put('/:id', withAuth, async (req, res) => {
  try {
    // Update the post with the data from the request body where the ID matches and the user ID is the same as the session
    const updatedPost = await Post.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    
    // If no post was found with the provided ID, respond with a 404 status
    if (!updatedPost[0]) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    // Respond with the updated post data
    res.status(200).json(updatedPost);
  } catch (err) {
    // Respond with an error if post update fails
    res.status(500).json(err);
  }
});

// Route to delete a post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // Delete the post where the ID matches and the user ID is the same as the session
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    // If no post was found with the provided ID, respond with a 404 status
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    // Respond with the deleted post data
    res.status(200).json(postData);
  } catch (err) {
    // Respond with an error if post deletion fails
    res.status(500).json(err);
  }
});

module.exports = router;
