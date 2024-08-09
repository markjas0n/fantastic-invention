const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sequelize = require('./config/database');
const { User, Post, Comment, Tag, PostTag } = require('./models'); // Import Tag and PostTag models

const app = express();
const PORT = process.env.PORT || 10000;

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/homeRoutes'));
app.use('/api/users', require('./controllers/api/userRoutes'));
app.use('/api/posts', require('./controllers/api/postRoutes'));
app.use('/api/comments', require('./controllers/api/commentRoutes'));

// Ensure Tag and PostTag models are synchronized with the database
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
