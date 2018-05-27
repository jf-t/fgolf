const routes = require('express').Router();

const userRoutes = require('./user_routes');
const leagueRoutes = require('./league_routes');
const tournamentRoutes = require('./tournament_routes');


routes.use('/', userRoutes);
routes.use('/', leagueRoutes);
routes.use('/', tournamentRoutes);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = routes;
