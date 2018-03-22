const db = require('../../config/connection');

module.exports = {
  findAll() {
    return db.any('SELECT * FROM song_library');
  },
  findById(id) {
    return db.one(`SELECT * FROM song_library WHERE song_id = $1`, id);
  },
  save(song) {
    return db.one(`INSERT INTO song_library (title, artist, genre)
    VALUES ($/title/, $/artist/, $/genre/)
    RETURNING *`, song);
  },
  update(song) {
    return db.one(`UPDATE song_library
      SET
      title = $/title/,
      artist = $/artist/,
      genre = $/genre/
      WHERE song_id = $/song_id/
      RETURNING *`, song);
  },
  //have to just find one instance of the song
  findOne(data){
    return db.one(`SELECT max(id) FROM join_table WHERE song_id = $[song_id] AND plist_id=$[plist_id]`, data)
  },
  //Delete the song from the join_table aka remove from playlist
  destroy(data) {
    return db.none(`DELETE FROM join_table WHERE id = $[max]`, data);
  }
}
