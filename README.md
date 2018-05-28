# Fantasy Golf App


### Api Endpoints:
POST `/user` create user
POST `/auth` log in
GET `/user/:id` get user by id

POST `/league` create league
GET `/leagues` get leagues for logged in user
GET `/league/:id` get league by id

POST `/tournament` create tournament
GET `/tournament/:id` get tournament by id
POST `/tournament/:id/initiate` initiate players in tournament to DB
POST `/tournament/:id/update` update leaderboard to live scores
GET `/tournament/:id/leaderboard` get live leaderboard

POST `/player` create player
GET `/player/:id` get player by id
