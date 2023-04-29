const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
const mongoose = require('mongoose');
const { forEach } = require('lodash');
const userController = require('./controllers/userController');
const complaintController = require('./controllers/complaintController');
const auth = require('./middlewares/auth');

const app = express();
require('dotenv').config();
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(express.json());

app.use((req,res, next)=>{
  console.log('HTTP Method: ' + req.method + 'URL: ' + req.url);
  next();
});
// process.env.MONGODB_URL
mongoose.connect('mongodb://localhost:27017/crimeDB', {useNewUrlParser: true})
.then(data => console.log("Database connected"))
.catch(err => console.log("Database connection failed"))

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

app.get("/dashboard", function(req,res) {
    res.render("dashboard");
});

// const Crime = require('./models/complaint');
app.get("/complaint", function(req,res) {
    res.render("complaint");
});

app.post('/complaint', auth, complaintController.createComplaint);

// app.put('/')

// app.post("/complaint", function(req,res) {
//   function getTime() {
//     var date = new Date();
//     var currentTime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
//     return currentTime;
//   }

//   function getday() {
//     var currentdate = req.body.date;
//     const dt = new Date(currentdate);
//     const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday","Friday","Saturday"];
//     var currentday = dt.getDay();
//     currentday = dayNames[currentday];
//     return currentday;
//   }

//   function lat(position) {
//     const latitude = position.coords.latitude;
//      return latitude;
//   }

//   function lon(position) {
//     const longitude = position.coords.longitude;
//     return longitude;
//   }
 
//   function findCoords() {
//     const apiKey = process.env.MAP_API;
//     console.log(apiKey);
//   }

//   function getMail() {
//     return "abc@gail.com";
//   }
//     const complaint = new Crime({
//         fullname: req.body.fullname,
//         email: getMail(),
//         crimeDate: req.body.crimedate,
//         district: req.body.district,
//         address: req.body.address,
//         complaint_type: req.body.complaint_type,
//         complaint: req.body.complaint
//     });
//     // findCoords();
//     complaint.save(function(err) {
//         if(!err) {
//           console.log(complaint);
//             res.redirect("/complaint");
//         }
//         else if(err){
//           console.log(err);
//         }
//     });
// });

app.get("/updatecomplaint", function(req,res) {
  res.redirect("update");
});
app.post("/updatecomplaint", function(req,res) {
  var uname = req.body.uname;
  console.log(uname);
  // res.redirect("update");
});



app.get("/crime", async (req, res) => {
    try {
      const details = await Crime.find();
      console.log('start')
      console.log(details);
      console.log('end')
    //   res.send(articles);
      res.render("viewcrime", {listTitle: "Crime Report", 'item': details});
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
    const crime_type = req.query.crime;
    const cluster = await Cluster.find({});
    console.log(cluster);
res.render("cluster", {'item': cluster,'crimetp':crime_type});
  }
  catch (err) {
    console.log(err);
  }
});



const Predict = require('./models/predict');

app.get("/predict", async(req,res)=>{
  try{
    const list_type = req.query.crimetype;
    const state = req.query.state;
    const values = await Predict.find({State: state});
    res.render("predict",{'item':values,'state':state});
  }
  catch(err){
    console.log(err);
  }
});

app.listen(process.env.PORT || 3000, function() {
   console.log("Server listening on Port 3000!"); 
});