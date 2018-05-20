DROP TABLE IF EXISTS league_user;
DROP TABLE IF EXISTS settings;
DROP TABLE IF EXISTS account_tournament_results;
DROP TABLE IF EXISTS league_tournament;
DROP TABLE IF EXISTS league_account;
DROP TABLE IF EXISTS league;
DROP TABLE IF EXISTS player_tournament_join;
DROP TABLE IF EXISTS player;
DROP TABLE IF EXISTS tournament;
DROP TABLE IF EXISTS accounts;




CREATE TABLE accounts (
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
  commish_id integer REFERENCES accounts(id) NOT NULL,
  private boolean default false,
  pw_hash varchar(255)
);


CREATE TABLE league_account (
  id serial PRIMARY KEY,
  name varchar(255) NOT NULL,
  account_id integer REFERENCES accounts(id) NOT NULL,
  league_id integer REFERENCES league(id) NOT NULL,
  winnings integer default 0
);

CREATE TABLE league_tournament (
  id serial PRIMARY KEY,
  tourmament_id integer REFERENCES tournament(id) NOT NULL
);

CREATE TABLE account_tournament_results (
  id serial PRIMARY KEY,
  league_tournament_id integer REFERENCES league_tournament(id) NOT NULL,
  league_account_id integer REFERENCES league_account(id) NOT NULL,
  score integer default 0
);

CREATE TABLE settings (
  id serial PRIMARY KEY,
  league_id integer REFERENCES league(id) NOT NULL,
  num_slots integer default 12,
  num_takes integer default 8
  -- im sure there will be more settings here
);
