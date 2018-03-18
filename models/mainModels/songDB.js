const db = require('../config/connection');

module.exports = {
  findAll() {
    return db.any('SELECT * FROM song_library RETURNING *');
  },
  findById(id) {
    return db.one();
  },
  save(song) {
    return db.one();
  },
  update(song) {
    return db.one();
  },
  destroy(id) {
    return db.none();
  }
}
