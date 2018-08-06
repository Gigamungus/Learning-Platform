//imports
const express = require("express");
const app = express();
let port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authStrat = require("./auth-strategy/jwtStrategy");
const passport = require("passport");
const cors = require("cors");

//secrets
const secrets = {
  secret: process.env.secret || require("./config/secrets").secret,
  DBURL: process.env.DBURL || require("./config/secrets").DBURL
};
const DBURL = secrets.DBURL;

//serve react
const path = require("path");
app.use(express.static(path.join(__dirname, "client", "build")));

//routes
const createUser = require("./routes/createUser");
const loginUser = require("./routes/loginUser");
const createCourse = require("./routes/createCourse");
const getRelevantCourses = require("./routes/getRelevantCourses");
const getCourse = require("./routes/getCourse");
const editCourse = require("./routes/editCourse");
const createNewCourseSection = require("./routes/createNewCourseSection");
const loadSectionContent = require("./routes/loadSectionContent");
const updateSectionDescription = require("./routes/updateSectionDescription");

//body middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//auth initialization
app.use(passport.initialize());
app.use(passport.session());
passport.use(authStrat);

//enable cors
app.use(cors());

mongoose.connect(
  DBURL,
  { useNewUrlParser: true },
  err => {
    if (err) console.log(err);
    else console.log("connected to database");
  }
);

app.post("/api/createuser", (req, res) => {
  createUser(req, res);
});

app.post("/api/loginuser", (req, res) => {
  loginUser(req, res);
});

app.post(
  "/api/createCourse",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    createCourse(req, res);
  }
);

app.post(
  "/api/editcourse/:courseId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    editCourse(req, res);
  }
);

app.post(
  "/api/createnewcoursesection",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    createNewCourseSection(req, res);
  }
);

app.post(
  "/api/updatesectiondescription/:sectionId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    updateSectionDescription(req, res);
  }
);

app.get("/api/getrelevantcourses/:howMany", (req, res) => {
  getRelevantCourses(req, res);
});

app.get("/api/getcourse/:courseId", (req, res) => {
  getCourse(req, res);
});

app.get("/api/loadsectioncontent/:sectionId", (req, res) => {
  loadSectionContent(req, res);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const server = app.listen(port, () => {
  console.log(`serving app on port ${port}`);
});

const io = require("socket.io")(server);

io.on("connection", socket => {
  console.log(`${socket.id} connected`);
});
