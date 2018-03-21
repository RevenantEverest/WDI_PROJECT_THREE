const songDB = require('../../models/mainModels/songDB');

module.exports = {
  index(req, res, next) {
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
    songDB.update(req.body)
      .then(results => {
        res.json({
          message: "Updating Song",
          data: results
        })
        next();
      })
      .catch(err => next(err));
  },
  destroy(req, res, next) {
    songDB.destroy(req.params.id)
      .then(results => {
        res.json({
          message: "deleted",
          data: results
        })
        next();
      })
      .catch(err => next(err));
  },

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
