//Require the connection file in the configuratiosn directory

const db = require(`../../config/connection`)


module.exports = {
  getAllPlayLists(id){
    console.log(`Inside the getAll function on the userDB model`);
    return db.any(`SELECT * FROM playlist WHERE user_id=$1`, id)
  },
  getSingle(username){
    return db.one(`SELECT * FROM user_table WHERE username=$1`, username)
  },
  addPlaylist(data) {
    console.log(`in model ----> `, data);
    return db.one(`INSERT INTO playlist (user_id, playlist_name) VALUES ($1, $2) RETURNING *`, [data.user_id, data.playlist_name])
  },
  makeOne(){
    console.log(`Inside the makeOne function on the userDB model`);
  },
  // updateInfo(){
  //   console.log(`Inside the updateInfo function on the userDB model`);
  // },
  // delete(){
  //   console.log(`Inside the delete function on the userDB model`);
  // }
}
