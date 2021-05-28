/** EXTERNAL DEPENDENCIES */
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

/**
 * DEPENDENCIES FROM LOWDB
 */
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

/**
 * SET UP THE LOWDB DATABASE
 */
//initialize the adapter to the mock db file
const adapter = new FileSync("data/db.json");
//initialize the lowdb to the mock db file
const db = low(adapter);
//add default entries to the database
db.defaults({
  robots: [],
}).write();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var robotRouter = require("./routes/robots")

const { setCors } = require("./middleware/security");


var app = express();

/** LOGGING */
app.use(logger("dev"));

/** REQUEST PARSERS */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/** STATIC FILES*/
app.use(express.static(path.join(__dirname, "public")));

/**Set CORS TO OMIT SECURITY ERRORS */
app.use(setCors);

/** ERROR HANDLING */
app.use((err, req, res, next) => {
  //respond to the requestor with the error message
  res.status(500).send({
    error: {
      message: err.message
    }
  })
})

/** ROUTES */
app.use("/", indexRouter);
app.use("/users", usersRouter);
//router path: '/records'
app.use("/robots", robotRouter);

/** EXPORT PATH */
module.exports = app;

