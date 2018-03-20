//Require the connection file in the configuratiosn directory

const db = require(`../../config/connection`)


module.exports = {

  findAll(){
    return db.any(`SELECT * FROM playlist`);
  },
  findById(id) {
    return db.one(`SELECT * FROM playlist WHERE playlist_id = $1`, id)
  },
  listSongs(id){
    return db.many(`SELECT * FROM song_library
      JOIN join_table
      ON song_library.song_id = join_table.song_id
      JOIN playlist
      ON playlist.playlist_id=join_table.plist_id
      WHERE playlist.playlist_id = $1`, id)
  },
  save(playlist) {
    return db.one(`INSERT INTO playlist (playlist_name, user_id)
    VALUES ($/playlist_name/, $/user_id/)
    RETURNING *`, playlist)
  },
  update(playlist) {
    return db.one(`UPDATE playlist
      SET
      playlist_name = $/playlist_name/
      WHERE playlist_id = $/playlist_id/
      RETURNING *`, playlist)
  },
  destroy(id) {
    return db.none(`DELETE FROM playlist WHERE playlist_id = $1`, id);
  }

}
