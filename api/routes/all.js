const routes = require('express').Router();

const userRoutes = require('./user_routes');
const leagueRoutes = require('./league_routes');


routes.use('/', userRoutes);
routes.use('/', leagueRoutes);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = routes;
