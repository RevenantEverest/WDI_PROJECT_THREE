const songDB = require('../../models/mainModels/songDB');

module.exports = {
  index(req, res, next) {
    console.log(`in get all Songs`);
    songDB.findAll()
      .then(results => {
        res.json({
          message: "ok",
          data: results
        })
      })
      .catch(err => next(err));
  },
  getOne(req, res, next) {
    console.log(`in get one`);
    songDB.findById(req.params.id)
      .then(results => {
        res.json({
          message: "ok",
          data: results
        })
      })
      .catch(err => next(err));
  },
  create(req, res, next) {
    songDB.save(req.body)
      .then(song => {
        res.json({
          message: "Creating Song",
          data: song
        })
        next();
      })
      .catch(err => {
        next(err)
      });
  },
  update(req, res, next) {
    console.log(`I am routing correctly`);
    // songDB.update(req.body)
    //   .then(results => {
    //     res.json({
    //       message: "Updating Song",
    //       data: results
    //     })
    //     next();
    //   })
    //   .catch(err => next(err));
  },
  findBeforeDelete(req, res, next) {
    console.log(`in controller finding one on the list`);
    songDB.findOne(req.body)
    .then(result => {
      console.log(`no shit i can do this!`, result);
      res.locals = result
      next()
    })
    .catch(err => {
      console.log(err);
    })
  },

  //Delete the song from the join table for each user

  destroy(req, res, next) {
    console.log(`made it to the song controller`, res.locals);
    songDB.destroy(res.locals)
      .then(results => {
        res.json({
          message: "totally wiped out",
          data: results
        })
        next()
      })
      .catch(err => next(err));
  },

  // destroyFromLibrary(req, res, next){
  //   console.log('I am in the controller with', req.params );
  //   songDB.nuke(req.params.id)
  //   .then(result => {
  //     res.json({
  //       message: "totally wiped out",
  //       data: result
  //     })
  //   })
    // .catch(err => {
    //   console.log(err)
    // })

  // },

  addSong(req, res, next) {
    const blankSong = {
      song: null
    }
    res.json({
      message: "ok",
      data: blankSong
    }),
    next()
  }
}
