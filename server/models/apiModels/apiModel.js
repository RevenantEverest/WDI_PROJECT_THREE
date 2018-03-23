//Require the connection file in the configuratiosn directory

const db = require(`../../config/connection`)


module.exports = {
  // getAll(){
  //   return db.many(`SELECT * FROM song_library`)
  // },
  // getSingle(id){
  //   return db.one(`SELECT * FROM song_library WHERE song_id=$1`, id)
  // },
  makeOne(data){
    console.log(`Inside the makeOne function on the data model`, data);
    return db.one(`INSERT INTO song_library (artist, title, release_date, album, rating, genre)
    VALUES (
      $[artist],
      $[title],
      $[release_date],
      $[album],
      $[rating],
      $[genre]
    )
    RETURNING song_id`, data)
  },
  // updateInfo(){
  //   console.log(`Inside the updateInfo function on the mainDB model`);
  // },
  // delete(){
  //   console.log(`Inside the delete function on the mainDB model`);
  // }
}
