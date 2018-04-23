//Require all of the dependancies for the express backend
const express = require(`express`);
const logger = require(`morgan`);
const bodyParser = require(`body-parser`);
const methodOverride = require(`method-override`);
const path = require(`path`);
const session = require(`express-session`);
const cors = require('cors');
const tokenService = require('./services/TokenService');
const authServices = require('./services/AuthService');
//Require the port that will be used in development
const PORT = process.env.PORT || 3001;
//Initiate Express
const app = express();

const mainRouter = require(`./routes/mainRouters/mainRouter`);
const userRouter = require(`./routes/usersRouters/userRouter`);
const userRouterTwo = require('./controllers/mainControllers/userControllerTwo');
const playlistRouter = require('./routes/mainRouters/playlistRouter');
const songRouter = require('./routes/mainRouters/songRouter');
const apiRouter = require(`./routes/apiRouters/apiRouter`)

app.use(cors());
app.use(methodOverride(`_method`));
app.use(logger(`dev`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(`public`));
app.set(`views`, path.join(__dirname, `views`));
app.set(`view engine`, `ejs`);
app.use(tokenService.receiveToken);

app.use('/users', userRouterTwo)
// app.use('/users', (req, res) => {
//   console.log(`I am hitting the backend`);
// })
app.get('/restricted', authServices.restrict(), (req, res) => {
  res.json({message: 'nailed it!'})
})
app.get('/isLoggedIn', authServices.isLoggedIn, (req, res) => {
  res.json({isLoggedIn: res.locals.isLoggedIn})
})

//DELETE ROUTE LATER**************
// app.use('/api/songs', mainRouter);
//DELETE ROUTE LATER**************

app.use('/playlist', playlistRouter);
app.use('/song', songRouter);
app.use('/auth', userRouter);
app.use('/api', apiRouter)

//******** testing that routes and controllers work ************
// app.use(`/api/testmain`, mainRouter);
// app.use(`/testusers`, userRouter);
//******** testing that routes and controllers work ************


app.listen(PORT, () => {
  console.log(`Up and listening in express app on PORT 🥑  ${PORT}`);
})


//is this working?
