//Require all of the dependancies for the express backend
const express = require(`express`);
const logger = require(`morgan`);
const bodyParser = require(`body-parser`);
const methodOverride = require(`method-override`);
const path = require(`path`);
const session = require(`express-session`)
//Require the port that will be used in development
const PORT = process.env.PORT || 3001;
//Initiate Express
const app = express();
// Linking up Casey Harding
//CASEY HARDING IS LINKED AND READY TO CODE!
const mainRouter = require(`./routes/mainRouters/mainRouter`);
const userRouter = require(`./routes/usersRouters/userRouter`);

app.use(methodOverride(`_method`));
app.use(logger(`dev`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(`public`));
app.set(`views`, path.join(__dirname, `views`));
app.set(`view engine`, `ejs`);

//******** testing that routes and controllers work ************
app.use(`/api/testmain`, mainRouter);
app.use(`/testusers`, userRouter);
//******** testing that routes and controllers work ************


app.listen(PORT, () => {
  console.log(`Up and listening in express app on PORT 🥑  ${PORT}`);
})


//is this working?
