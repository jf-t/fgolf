DROP TABLE IF EXISTS settings;
DROP TABLE IF EXISTS account_tournament_results;
DROP TABLE IF EXISTS league_tournament;
DROP TABLE IF EXISTS league_account;
DROP TABLE IF EXISTS league;
DROP TABLE IF EXISTS player_tournament;
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
  tid integer PRIMARY KEY,
  name varchar(255) NOT NULL,
  starting_date varchar(255) NOT NULL, -- iso format?
  ending_date varchar(255) NOT NULL -- iso format?
);

CREATE TABLE player (
  id serial PRIMARY KEY,
  pga_id integer NOT NULL,
  name varchar(255) NOT NULL
  -- will add more from pga website
);

CREATE TABLE player_tournament (
  id serial PRIMARY KEY,
  player_id integer REFERENCES player(id) NOT NULL,
  tournament_id integer REFERENCES tournament(tid) NOT NULL,
  unique (player_id, tournament_id),

  total integer default 0,
  today integer default 0,
  thru integer default 0,

  r1 integer,
  r2 integer,
  r3 integer,
  r4 integer
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
  account_id integer REFERENCES accounts(id) NOT NULL,
  league_id integer REFERENCES league(id) NOT NULL,
  winnings integer default 0,
  unique (account_id, league_id)
);

CREATE TABLE league_tournament (
  id serial PRIMARY KEY,
  tournament_id integer REFERENCES tournament(tid) NOT NULL
);

CREATE TABLE account_tournament_results (
  id serial PRIMARY KEY,
  league_tournament_id integer REFERENCES league_tournament(id) NOT NULL,
  league_account_id integer REFERENCES league_account(id) NOT NULL,
  players integer[]
);

CREATE TABLE settings (
  id serial PRIMARY KEY,
  league_id integer REFERENCES league(id) NOT NULL,
  num_slots integer default 12,
  num_takes integer default 8
  -- im sure there will be more settings here
);
