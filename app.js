const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
const mongoose = require('mongoose');
const { forEach } = require('lodash');
const userRouter = require('./routes/userRoutes');

const app = express();
require('dotenv').config();
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(express.json());
app.use("/users", userRouter);

app.use((req,res, next)=>{
  console.log('HTTP Method: ' + req.method);
  next();
});
// process.env.MONGODB_URL
mongoose.connect('mongodb://localhost:27017/crimeDB', {useNewUrlParser: true})
.then(data => console.log("Database connected"))
.catch(err => console.log("Database connection failed"))


const crimeSchema = {
    id: Number,
    name: String,
    date: String,
    day: String,
    time: String,
    district: String,
    address: String,
    complaint_type: String,
    complaint: String,
    xcoord: Number,
    ycoord: Number
};

const Crime = mongoose.model("complaints", crimeSchema);


app.get("/", function(req,res) {
    res.render("home");
});

app.get("/dashboard", function(req,res) {
    res.render("dashboard");
})

app.get("/complaint", function(req,res) {
    res.render("complaint");
});

app.post("/complaint", function(req,res) {
  function getTime() {
    var date = new Date();
    var currentTime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return currentTime;
  }

  function getday() {
    var currentdate = req.body.date;
    const dt = new Date(currentdate);
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday","Friday","Saturday"];
    var currentday = dt.getDay();
    currentday = dayNames[currentday];
    return currentday;
  }

  function lat(position) {
    const latitude = position.coords.latitude;
     return latitude;
  }

  function lon(position) {
    const longitude = position.coords.longitude;
    return longitude;
  }
 
  function findCoords() {
    const apiKey = process.env.MAP_API;
    console.log(apiKey);
  }

    const complaint = new Crime({
        name: req.body.name,
        date: req.body.date,
        time: getTime(),
        day: getday(),
        district: req.body.district,
        address: req.body.address,
        xcoord: req.body.xcoord,
        ycoord: req.body.ycoord
    });
    findCoords();
    complaint.save(function(err) {
        if(!err) {
            res.redirect("/complaint");
        }
    });
});

app.get("/updatecomplaint", function(req,res) {
  res.redirect("update");
});
app.post("/updatecomplaint", function(req,res) {
  var uname = req.body.uname;
  console.log(uname);
  // res.redirect("update");
});



app.get("/viewcrime", async (req, res) => {
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

  const reportSchema = {
    date: String,
    Category: String,
    Descript: String,
    DayOfWeek: String,
    PdDistrict: String,
    Resolution: String,
    Address: String,
    X: String,
    Y: String
};

  const Report = mongoose.model("reports", reportSchema);
app.get("/viewreport", async (req, res) => {
  // function searchResults(reports) {
  //     var search = req.body.report;
  //     // console.log(report);
  //     // var s1 = search.toString();
  //     // var s2 = s1.toLowerCase();
  //     console.log(search);
  //     // var myCursor = report.reports.find( );
  //     // myCursor.forEach(printjson);
  //     console.log(Report.reports.find({"Category": {search }})) ;
  // }
  try {
    const search = req.query.report;
    // if(search === null || search === undefined){
    //   search = "WARRANTS";
    // }
    // var search = "WARRANTS";
    // search = String(search);
    console.log(search);
    const report = await Report.find({Category:search},{},{limit: 40});
  //   res.send(articles);searchResults();    
  // searchResults(report);
res.render("viewreport", {'item': report});

    console.log(report);
  } catch (err) {
    console.log(err);
  }
});

app.post("/viewreport", function(req,res) {
  const search = req.body.report;
  console.log(search);
  res.redirect("/viewreport");
});

const clusterSchema = {
  state: String,
  murder: String,
  dowry : String,
  suicide: String,
  humantrafficiking: String,
  blackmailing: String,
  robbery: String,
  coordinates: String,
  latitude: String,
  longitude: String
};

const Cluster = mongoose.model("cluster", clusterSchema);


app.get("/viewcluster", async (req,res) => {
  try {
    const crime_type = req.query.crime;
    // console.log(typeof(crime_type));
    const cluster = await Cluster.find({});
    console.log(cluster);
res.render("viewcluster", {'item': cluster,'crimetp':crime_type});
  }
  catch (err) {
    console.log(err);
  }
});

const predictSchema = {
  State: String,
  reports : [String]
};

const Predict = mongoose.model("predict", predictSchema);

app.get("/predict", async(req,res)=>{
  try{
    const list_type = req.query.crimetype;
    const state = req.query.state;
    // console.log(list_type);
    console.log(state);
    const values = await Predict.find({State: state});
    console.log(values);
    res.render("predict",{'item':values,'state':state});
  }
  catch(err){
    console.log(err);
  }
});

app.listen(process.env.PORT || 3000, function() {
   console.log("Server listening on Port 3000!"); 
});