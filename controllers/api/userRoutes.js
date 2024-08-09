const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

// Route for user signup
router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData); // Respond with the user data
    });
  } catch (err) {
    res.status(500).json(err); // Respond with error if signup fails
  }
});

// Route for user login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err); // Respond with error if login fails
  }
});

// Route for user logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Destroy the session
    req.session.destroy(() => {
      // Redirect the user to the homepage after logging out
      res.status(204).redirect('/'); // Status 204 means no content, followed by redirection to homepage
    });
  } else {
    res.status(404).end(); // If the user is not logged in, return a 404 status
  }
});

module.exports = router;
