//Require the model
const playlistDB = require(`../../models/mainModels/playlistDB`);

module.exports ={
  index(req, res, next){
    console.log("made it to the playlist controller");
    playlistDB.findAll()
      .then(results => {
        console.log(results)
        res.json({
          message: "Getting All Playlists",
          data: results
        })
        //Dont forget to call next()
      })
      .catch(err => {
        next(err)
      })
  },
  getOne(req, res, next) {
    console.log('hello from the getOne side')
    playlistDB.findById(req.params.id)
      .then(results => {
        res.locals.playlist = results
        res.json({
          message: "Getting One Playlist",
          data: results
        })
        next()
      })
      .catch(err => {
        next(err)
      });
  },
  create(req, res, next) {
    console.log('creating a thing')
    playlistDB.save(req.body)
      .then(playlist => {
        // console.log('did a thing', playlist)
        res.json({
          message: "Creating Playlist",
          data: playlist
        })
        next();
      })
      .catch(err =>{
        console.log('messed up', err)
        next(err)
      });
  },
  update(req, res, next) {
    playlistDB.update(req.body)
      .then(results => {
        res.json({
          message: "Updating Playlist",
          data: results
        })
        next();
      })
      .catch(err => next(err));
  },
  destroy(req, res, next) {
    playlistDB.destroy(req.params.id)
      .then(results => {
        res.json({
          message: "deleteing playlist",
          data: results
        })
        next();
      })
      .catch(err => next(err));
  },
  listSongs(req, res, next) {
    playlistDB.listSongs(res.locals.playlist.playlist_id)
      .then(results => {
        let songsAndPlaylists = res.locals
        console.log('your locals are...', res.locals)
        res.json({
          message: "Listing Songs",
          data: results,
          playlistName: res.locals.playlist.playlist_name
        })
      })
      .catch(err => next(err))
  }
}
