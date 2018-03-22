\c testing_for_react_db

INSERT INTO test_table (name, expression) VALUES (
  'Ryan',
  'I am testing the connection of routing'
),(
  'Chris',
  'this is more test data'
);


INSERT INTO song_library (title, artist, genre) VALUES (
  'FRIENDS',
  'marshmellow',
  'Pop'
),(
  'Hardaway',
  'Derez Deshon',
  'Hip-Hop'
),(
  'Slow',
  'Matoma',
  'Pop'
),(
  'do re mi',
  'Backbear',
  'Hip-Hop'
),(
  'No Rain',
  'Blind Melon',
  'Rock'
);

INSERT INTO join_table (plist_id, song_id) VALUES (
  1, 1
), (
  1, 2
), (
  1, 4
), (
  2, 3
), (
  2, 5
), (
  3, 1
), (
  3, 5
);

INSERT INTO playlist (user_id, playlist_name) VALUES (
  1,
  'playlistOne'
),(
  1,
  'playlistTwo'
), (
  2,
  'playlistThree'
);
