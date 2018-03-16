//Require the connection file in the configuratiosn directory

const db = require(`../../config/connection`)


module.exports = {
  getAll(){
    return db.many(`SELECT * FROM test_table`)
  },
  makeOne(){
    console.log(`Inside the makeOne function on the mainDB model`);
  },
  updateInfo(){
    console.log(`Inside the updateInfo function on the mainDB model`);
  },
  delete(){
    console.log(`Inside the delete function on the mainDB model`);
  }
}
