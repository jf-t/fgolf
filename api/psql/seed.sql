-- my account
INSERT INTO accounts
    (username, pw_hash, session_token, email)
VALUES
    ('jtilly', '742d7b38a9ffd280abe7d115d76268478d2b8c736ff72945c8b4e0bc982a46ba', '508afd43d444614a22b00bab86241f846ce52431d49ba87bbdf3e0b935d905a2', 'jackftilly@gmail.com');


--
INSERT INTO accounts
    (username, pw_hash, session_token, email)
VALUES
    ('guest1', '742d7b38a9ffd280abe7d115d76268478d2b8c736ff72945c8b4e0bc982a46ba', '508afd43d444614a22b00bab86241f846ce52431d49ba87bbdf3e0b935d905a2', 'guest1@gmail.com');


INSERT INTO accounts
    (username, pw_hash, session_token, email)
VALUES
    ('guest2', '742d7b38a9ffd280abe7d115d76268478d2b8c736ff72945c8b4e0bc982a46ba', '508afd43d444614a22b00bab86241f846ce52431d49ba87bbdf3e0b935d905a2', 'guest2@gmail.com');



INSERT INTO accounts
    (username, pw_hash, session_token, email)
VALUES
    ('guest3', '742d7b38a9ffd280abe7d115d76268478d2b8c736ff72945c8b4e0bc982a46ba', '508afd43d444614a22b00bab86241f846ce52431d49ba87bbdf3e0b935d905a2', 'guest3@gmail.com');



INSERT INTO accounts
    (username, pw_hash, session_token, email)
VALUES
    ('guest4', '742d7b38a9ffd280abe7d115d76268478d2b8c736ff72945c8b4e0bc982a46ba', '508afd43d444614a22b00bab86241f846ce52431d49ba87bbdf3e0b935d905a2', 'guest4@gmail.com');



INSERT INTO accounts
    (username, pw_hash, session_token, email)
VALUES
    ('guest5', '742d7b38a9ffd280abe7d115d76268478d2b8c736ff72945c8b4e0bc982a46ba', '508afd43d444614a22b00bab86241f846ce52431d49ba87bbdf3e0b935d905a2', 'guest5@gmail.com');



INSERT INTO accounts
    (username, pw_hash, session_token, email)
VALUES
    ('guest6', '742d7b38a9ffd280abe7d115d76268478d2b8c736ff72945c8b4e0bc982a46ba', '508afd43d444614a22b00bab86241f846ce52431d49ba87bbdf3e0b935d905a2', 'guest6@gmail.com');



INSERT INTO accounts
    (username, pw_hash, session_token, email)
VALUES
    ('guest7', '742d7b38a9ffd280abe7d115d76268478d2b8c736ff72945c8b4e0bc982a46ba', '508afd43d444614a22b00bab86241f846ce52431d49ba87bbdf3e0b935d905a2', 'guest7@gmail.com');



INSERT INTO accounts
    (username, pw_hash, session_token, email)
VALUES
    ('guest8', '742d7b38a9ffd280abe7d115d76268478d2b8c736ff72945c8b4e0bc982a46ba', '508afd43d444614a22b00bab86241f846ce52431d49ba87bbdf3e0b935d905a2', 'guest8@gmail.com');



INSERT INTO accounts
    (username, pw_hash, session_token, email)
VALUES
    ('guest9', '742d7b38a9ffd280abe7d115d76268478d2b8c736ff72945c8b4e0bc982a46ba', '508afd43d444614a22b00bab86241f846ce52431d49ba87bbdf3e0b935d905a2', 'guest9@gmail.com');








INSERT INTO league
    (name, commish_id, private, pw_hash)
VALUES
    ('The League', 1, false, null);



INSERT INTO league_account
    (account_id, league_id)
VALUES
    (1, 1);

INSERT INTO league_account
    (account_id, league_id)
VALUES
    (2, 1);

INSERT INTO league_account
    (account_id, league_id)
VALUES
    (3, 1);

INSERT INTO league_account
    (account_id, league_id)
VALUES
    (4, 1);

INSERT INTO league_account
    (account_id, league_id)
VALUES
    (5, 1);

INSERT INTO league_account
    (account_id, league_id)
VALUES
    (6, 1);

INSERT INTO league_account
    (account_id, league_id)
VALUES
    (7, 1);

INSERT INTO league_account
    (account_id, league_id)
VALUES
    (8, 1);

INSERT INTO league_account
    (account_id, league_id)
VALUES
    (9, 1);

INSERT INTO league_account
    (account_id, league_id)
VALUES
    (10, 1);



INSERT INTO settings
    (league_id)
VALUES
    (1);


INSERT INTO tournament
    (tid, name, season, starting_date, ending_date)
VALUES
    ('014', 'The Masters', 2018, '2018-04-05', '2018-04-08');

INSERT INTO league_tournament
    (league_id, tournament_id)
VALUES
    (1, '014');


INSERT INTO account_tournament_results
    (league_account_id, league_tournament_id)
VALUES
    (1, 1);

INSERT INTO account_tournament_results
    (league_account_id, league_tournament_id)
VALUES
    (2, 1);

INSERT INTO account_tournament_results
    (league_account_id, league_tournament_id)
VALUES
    (3, 1);

INSERT INTO account_tournament_results
    (league_account_id, league_tournament_id)
VALUES
    (4, 1);

INSERT INTO account_tournament_results
    (league_account_id, league_tournament_id)
VALUES
    (5, 1);

INSERT INTO account_tournament_results
    (league_account_id, league_tournament_id)
VALUES
    (6, 1);

INSERT INTO account_tournament_results
    (league_account_id, league_tournament_id)
VALUES
    (7, 1);

INSERT INTO account_tournament_results
    (league_account_id, league_tournament_id)
VALUES
    (8, 1);

INSERT INTO account_tournament_results
    (league_account_id, league_tournament_id)
VALUES
    (9, 1);

INSERT INTO account_tournament_results
    (league_account_id, league_tournament_id)
VALUES
    (10, 1);
