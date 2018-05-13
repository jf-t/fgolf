-- Created by Jack Tilly


DROP TABLE IF EXISTS draft_order;
DROP TABLE IF EXISTS settings;
DROP TABLE IF EXISTS player_game;
DROP TABLE IF EXISTS game;
DROP TABLE IF EXISTS season;
DROP TABLE IF EXISTS player_trade_join;
DROP TABLE IF EXISTS trade;
DROP TABLE IF EXISTS player;
DROP TABLE IF EXISTS draft;
DROP TABLE IF EXISTS team;
DROP TABLE IF EXISTS league_account_join;
DROP TABLE IF EXISTS league;
DROP TABLE IF EXISTS roster_player;
DROP TABLE IF EXISTS roster_team;
DROP TABLE IF EXISTS roster;
DROP TABLE IF EXISTS account;

CREATE TABLE account (
    id serial PRIMARY KEY,
    username varchar(255) UNIQUE NOT NULL,
    pw_hash varchar(255) NOT NULL,
    session_token varchar(255),
    email varchar(255) UNIQUE NOT NULL
);

CREATE TABLE roster (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    divisions integer DEFAULT 6,
    conferences integer DEFAULT 2,
    author_id integer REFERENCES account(id) NOT NULL
);

CREATE TABLE roster_team (
    id serial PRIMARY KEY,
    city varchar(255) NOT NULL,
    conf integer NOT NULL,
    div integer NOT NULL,
    name varchar(255) NOT NULL,
    roster_id integer REFERENCES roster(id) NOT NULL
);

CREATE TABLE roster_player (
    id serial PRIMARY KEY,
    first_name varchar(255) NOT NULL,
    middle_initial char(1),
    last_name varchar(255) NOT NULL,

    roster_id integer REFERENCES roster(id) NOT NULL,
    roster_team_id integer REFERENCES roster_team(id) NOT NULL,

    player_number integer,
    height_feet integer NOT NULL,
    height_inches integer NOT NULL,
    weight integer NOT NULL,

    country varchar(255) NOT NULL,
    college varchar(255),

    position integer NOT NULL,
    secondary_position integer,
    image_url varchar(255),

    overall integer default 50,

    three_point integer default 50,
    midrange integer default 50,
    inside integer default 50,
    speed integer default 50,
    offensive_rebounding integer default 50,
    passing integer default 50,
    handling integer default 50,

    perimeter_defense integer default 50,
    paint_defense integer default 50,
    steal integer default 50,
    block integer default 50,
    rebounding integer default 50,

    free_throw integer default 50,
    stamina integer default 50,
    agility integer default 50,
    potential integer default 50
);

CREATE TABLE league (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    commish_id integer REFERENCES account (id) NOT NULL,
    roster_id integer REFERENCES roster (id) NOT NULL,


-- Settings:

    num_players integer DEFAULT 15,
    keeper_amount integer DEFAULT 0,
    divisions integer DEFAULT 2,
    conferences integer DEFAULT 1
);


CREATE TABLE league_account_join (
    id serial PRIMARY KEY,
    account_id integer REFERENCES account (id) NOT NULL,
    league_id integer REFERENCES league (id) NOT NULL
);



CREATE TABLE team (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    league_account_join_id integer REFERENCES league_account_join (id) NOT NULL,
    division integer default 1,
    conference integer default 1,

    wins integer DEFAULT 0,
    losses integer DEFAULT 0,
    rings integer DEFAULT 0,

    ppg real DEFAULT 0.0,
    oppg real DEFAULT 0.0,
    power_rank integer DEFAULT 0
);

CREATE TABLE draft (
    id serial PRIMARY KEY,
    year integer NOT NULL,
    league_id integer REFERENCES league (id) NOT NULL,
    active boolean DEFAULT false
);

CREATE TABLE player (
    id serial PRIMARY KEY,
    league_id integer REFERENCES league (id) NOT NULL,
    roster_player_id integer REFERENCES roster_player (id) NOT NULL,
    team_id integer REFERENCES team,

    drafted boolean DEFAULT false,
    draft_id integer REFERENCES draft,
    draft_round integer,
    draft_pos integer,

    owned boolean DEFAULT false,
    team_position integer,
    minutes integer,

    contract_years integer DEFAULT 0,
    contract_amount real DEFAULT 0.0,
    contract_load varchar(255) DEFAULT 'FLAT',

    overall integer default 50,

    three_point integer default 50,
    midrange integer default 50,
    inside integer default 50,
    speed integer default 50,
    offensive_rebounding integer default 50,
    passing integer default 50,
    handling integer default 50,

    perimeter_defense integer default 50,
    paint_defense integer default 50,
    steal integer default 50,
    block integer default 50,
    rebounding integer default 50,

    free_throw integer default 50,
    stamina integer default 50,
    agility integer default 50,
    potential integer default 50
);

CREATE TABLE trade (
    id serial PRIMARY KEY,
    league_id integer REFERENCES league (id) NOT NULL,
    team1_id integer REFERENCES team (id) NOT NULL,
    team2_id integer REFERENCES team (id) NOT NULL
);

CREATE TABLE player_trade_join (
    id serial PRIMARY KEY,
    player_id integer REFERENCES player (id) NOT NULL,
    trade_id integer REFERENCES trade (id) NOT NULL
);

CREATE TABLE season (
    id serial PRIMARY KEY,
    league_id integer REFERENCES league (id) NOT NULL,
    num_games integer[4] DEFAULT ARRAY[0, 0, 0, 0],
    active boolean DEFAULT false
);

CREATE TABLE game (
    id serial PRIMARY KEY,
    start_date varchar(255) NOT NULL,
    end_date varchar(255) NOT NULL,

    league_id integer REFERENCES league (id) NOT NULL,

    team1_id integer REFERENCES team (id) NOT NULL,
    team1_score integer,

    team2_id integer REFERENCES team (id) NOT NULL,
    team2_score integer,

    season_id integer REFERENCES season (id) NOT NULL
);

CREATE TABLE player_game (
    id serial PRIMARY KEY,
    player_id integer REFERENCES player (id) NOT NULL,
    league_id integer REFERENCES league (id) NOT NULL,
    game_id integer REFERENCES game (id) NOT NULL,

    points integer DEFAULT 0,
    assists integer DEFAULT 0,
    d_rebounds integer DEFAULT 0,
    o_rebounds integer DEFAULT 0,
    steals integer DEFAULT 0,
    blocks integer DEFAULT 0,
    fg_make integer DEFAULT 0,
    fg_miss integer DEFAULT 0,
    fg3_make integer DEFAULT 0,
    fg3_miss integer DEFAULT 0,
    ft_make integer DEFAULT 0,
    ft_miss integer DEFAULT 0,
    turnovers integer DEFAULT 0,
    minutes integer DEFAULT 0
);

CREATE TABLE draft_order (
    id serial PRIMARY KEY,
    draft_id integer REFERENCES draft (id) NOT NULL,
    team_id integer REFERENCES team (id) NOT NULL,
    draft_round integer,
    picked boolean DEFAULT false
);
