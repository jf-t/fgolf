DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS tournament;
DROP TABLE IF EXISTS player;
DROP TABLE IF EXISTS player_tournament_join;
DROP TABLE IF EXISTS league;
DROP TABLE IF EXISTS league_user;
DROP TABLE IF EXISTS league_tournament;
DROP TABLE IF EXISTS user_tournament_results;
DROP TABLE IF EXISTS settings;

CREATE TABLE user (
  id serial PRIMARY KEY,
  username varchar(255) UNIQUE NOT NULL,
  pw_hash varchar(255) NOT NULL,
  session_token varchar(255),
  email varchar(255) UNIQUE NOT NULL
);

CREATE TABLE tournament (
  id serial PRIMARY KEY,
  tid integer NOT NULL,
  name varchar(255) NOT NULL,
  starting_date varchar(255) NOT NULL,
  ending_date varchar(255) NOT NULL
);

CREATE TABLE player (
  id serial PRIMARY KEY,
  pga_id integer NOT NULL,
  name varchar(255) NOT NULL
);

CREATE TABLE player_tournament_join (
  id serial PRIMARY KEY,
  player_id integer REFERENCES player(id) NOT NULL,
  tournament_id integer REFERENCES tournament(id) NOT NULL
);

CREATE TABLE league (
  id serial PRIMARY KEY,
  name varchar(255) NOT NULL,
  commish_id integer REFERENCES user(id) NOT NULL,
  private boolean default false,
  pw_hash varchar(255)
);


CREATE TABLE league_user (
  id serial PRIMARY KEY,
  name varchar(255) NOT NULL,
  user_id integer REFERENCES user(id) NOT NULL,
  league_id integer REFERENCES league(id) NOT NULL,
  winnings integer default 0
);

CREATE TABLE league_tournament (
  id serial PRIMARY KEY,
  tourmament_id integer REFERENCES tournament(id) NOT NULL
);

CREATE TABLE user_tournament_results (
  id serial PRIMARY KEY,
  league_tournament_id integer REFERENCES league_tournament(id) NOT NULL,
  league_user_id integer REFERENCES league_user(id) NOT NULL,
  score integer default 0
);

CREATE TABLE settings (
  id serial PRIMARY KEY,
  league_id integer REFERENCES league(id) NOT NULL,
  num_slots integer default 12,
  num_takes integer default 8
  -- im sure there will be more settings here
);
