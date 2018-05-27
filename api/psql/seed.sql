INSERT INTO accounts
    (username, pw_hash, session_token, email)
VALUES
    ('jtilly', '742d7b38a9ffd280abe7d115d76268478d2b8c736ff72945c8b4e0bc982a46ba', '508afd43d444614a22b00bab86241f846ce52431d49ba87bbdf3e0b935d905a2', 'jackftilly@gmail.com');


INSERT INTO league
    (name, commish_id)
VALUES
    ('The League', 1);


INSERT INTO league_account
    (account_id, league_id)
VALUES
    (1, 1);

INSERT INTO settings
    (league_id)
VALUES
    (1);


INSERT INTO tournament
    (tid, name, starting_date, ending_date)
VALUES
    ('014', 'The Masters', '2018-04-05', '2018-04-08');
