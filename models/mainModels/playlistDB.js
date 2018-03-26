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
  destroy(data) {
    console.log(`in model, destroy`);
    return db.none(`DELETE FROM playlist WHERE playlist_id=$[playlist_id]`, data);
  },
  deletAllSongs(data){
    console.log(`Im deleting all songs from join_table`)
    return db.none(`DELETE FROM join_table WHERE plist_id=$[plist_id]`, data)
  },
  addSongToPlaylist(playlist) {
    return db.one(`INSERT INTO join_table (plist_id, song_id)
    VALUES ($/plist_id/, $/song_id/)
    RETURNING *`, playlist);
  }

  // listPlaylistSongs(id) {
  //   console.log('Made it to the model ', id);
  //   return db.many(`SELECT playlist.playlist_name, song_library.title FROM playlist JOIN join_table ON playlist.playlist_id=join_table.plist_id JOIN song_library ON song_library.song_id=join_table.song_id WHERE playlist.playlist_id = $1`, id)
  // }

}
