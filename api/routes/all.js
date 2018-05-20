const routes = require('express').Router();

const userRoutes = require('./user_routes');



routes.use('/', userRoutes);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = routes;
