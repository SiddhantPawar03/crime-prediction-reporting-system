const express = require('express');
const bodyParser = require('body-parser');
const ejsMate = require('ejs-mate')
const path = require('path')
const _ = require('lodash');
const mongoose = require('mongoose');
const { forEach } = require('lodash');
const cookieParser = require('cookie-parser');
const userController = require('./controllers/userController');
const complaintController = require('./controllers/complaintController');
const expressLayouts = require('express-ejs-layouts');
const auth = require('./middlewares/auth');


require('dotenv').config();

const app = express();

app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use((req,res, next)=>{
  next();
});

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/crimeDB', {useNewUrlParser: true})
.then(data => console.log("Database connected"))
.catch(err => console.log("Database connection failed"));

app.get("/", function(req,res) {
    res.render("home");
});

app.get("/login", function(req,res) {
  res.render("login");
});

app.post("/signup", userController.signup);

app.get("/signup", function(req,res) {
  res.render("signup");
});

app.post("/login", userController.login);

app.get("/complaint", function(req,res) {
  res.render("complaint");
});

app.post('/complaint', auth, complaintController.createComplaint);

app.get("/crime", async (req, res) => {
    try {
      const details = await Crime.find();
      console.log('start')
      console.log(details);
      console.log('end')
    //   res.send(articles);
      res.render("crime", {listTitle: "Crime Report", 'item': details});
    } catch (err) {
      console.log(err);
    }
  });

  app.get("/", function(req, res){

    Post.find({}, function(err, posts){
      res.render("home", {
        startingContent: homeStartingContent,
        posts: posts
        });
    });
  });

  const Cluster = require('./models/cluster');

  app.get("/cluster", async (req,res) => {
    try {
      let crime_type = req.query.crime;
      let clusterpath = path.join(__dirname, 'clusters');
      // res.render(`${clusterpath}/${crime_type}.ejs`);
      // res.render(`${clusterpath}/murder.ejs`);
      // const cluster = await Cluster.find({});
      // console.log(cluster);
      // crime_type = dummy;
    res.render("cluster");
    console.log(crime_type);
    res.redirect("map");  
    // res.redirect(`./clusters/${crime_type}.ejs`);
    }
    catch (err) {
      console.log(err);
    }
  });

// app.get("/cluster", getVal, renderForm);

// function getVal(req, res, next) {
//    // Code here
//    res.locals.savedPayees = req.query.crime;
//    next();
// };

// function renderForm(req, res) {
//   res.render("cluster", {'crime': req.query.crime});
// };

  const Predict = require('./models/predict');

  app.get("/predict", async(req,res)=>{
    try{
      var list_type = req.query.crimetype;
      var state = req.query.state;
      var model = list_type + state;
      console.log(model);
      // const values = await Predict.find({State: state});
      res.render("predict",{'state':state});
    }
    catch(err){
      console.log(err);
    }
  });
  

app.listen(process.env.PORT || 3000, function() {
   console.log("Server listening on Port 3000!"); 
});