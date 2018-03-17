//Require the connection file in the configuratiosn directory

const db = require(`../../config/connection`)


module.exports = {
  getOne(id){
    return db.many(`SELECT * FROM song_library
      JOIN join_table
      ON song_library.song_id=join_table.song_id
      JOIN playlist
      ON playlist.playlist_id=join_table.plist_id
      WHERE playlist.playlist_id=$1`, id)
  },

}
