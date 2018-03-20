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
      title = $/title/
      artist = $/artist/
      genre = $/genre/
      WHERE song_id = $/song_id/
      RETURNING *`, song);
  },
  destroy(id) {
    return db.none(`DELETE FROM song_library WHERE song_id = $1`, id);
  }
}
