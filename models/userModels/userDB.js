//Require the connection file in the configuratiosn directory

const db = require(`../../config/connection`)


module.exports = {
  // getAll(){
  //   console.log(`Inside the getAll function on the userDB model`);
  // },
  getSingle(username){
    return db.one(`SELECT * FROM user_table WHERE username=$1`, username)
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
