//Require the model
const playlistDB = require(`../../models/mainModels/playlistDB`);

module.exports ={
  index(req, res, next){
    console.log("made it to the playlist controller");
    playlistDB.getOne(req.params.id)
    .then(results => {
      console.log(results)
      res.json({
        message: "ok",
        data: results
      })
      //Dont forget to call next()
    })
    .catch(err => {
      next(err)
    })
  },
}
