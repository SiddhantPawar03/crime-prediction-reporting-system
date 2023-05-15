const express = require('express');
const bodyParser = require('body-parser');
const ejsMate = require('ejs-mate')
const path = require('path')
const _ = require('lodash');
const mongoose = require('mongoose');
const session = require('express-session')
const { forEach } = require('lodash');
const flash = require('connect-flash')
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const userController = require('./controllers/userController');
const complaintController = require('./controllers/complaintController');
const expressLayouts = require('express-ejs-layouts');
const {auth,isLogedIn} = require('./middlewares/auth');
const Crime = require('./models/complaint')

const dbUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/crimeDB'
const secret = process.env.SECRET_KEY || "EDI@50";
require('dotenv').config();

const app = express();

const store = MongoStore.create({
  mongoUrl: dbUrl,
  secret,
  touchAfter: 24*60*60
})
store.on('error',e => {
  console.log('Session Error!!!',e)
})

app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.set('views', './views');
app.set('view engine', 'ejs');

const sessionConfig = {
  store,
  name: 'YelpCampSession',
  secret,
  resave:false,
  saveUninitialized:true,
  cookie:{
      httpOnly:true,  //just a extra layer of security to avoid client site req / cross-plaform req
      // secure: true,        //how extra security (sends no cookies for local host as well)
      expires:Date.now() + (1000 * 60 * 60 * 24 * 7),     //expires after 1 week of creation
      maxAge: (1000 * 60 * 60 * 24 * 7)
  }
}
app.use(session(sessionConfig))
app.use(flash())
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use((req,res, next)=>{
  next();
});

mongoose.connect(dbUrl, {useNewUrlParser: true})
.then(data => console.log("Database connected"))
.catch(err => console.log("Database connection failed"));


//middleware for flashing all msg
app.use((req,res,next)=>{
  res.locals.currentUser = isLogedIn(req)
  res.locals.success = req.flash('success')       //this will send success to all the rendering requests
  res.locals.warning = req.flash('warning')
  res.locals.error = req.flash('error')
  next()
})


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
app.get("/logout", userController.logout);

app.get("/complaint",auth, function(req,res) {
  res.render("complaint");
});

app.post('/complaint', auth, complaintController.createComplaint);

app.get("/crime",auth, async (req, res) => {
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

  app.get("/cluster",auth, async (req,res) => {
    try {
      let crime_type = req.query.crime || "murder";
      let clusterpath = path.join(__dirname, 'clusters');
      // res.render(`${clusterpath}/${crime_type}.ejs`);
      // res.render(`${clusterpath}/murder.ejs`);
      // const cluster = await Cluster.find({});
      // console.log(cluster);
      // crime_type = dummy;
    // res.render("cluster");
    console.log(crime_type);
    // res.redirect("map");  
    res.render(`./clusters/${crime_type}.ejs`);
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

  const Ipc = require('./models/ipc');
  const Sll = require('./models/sll');
  const Predict = require('./models/predict');


  var table = new Object();


  table['ap'] = 'Andhra Pradesh';
  table['ar'] = 'Arunachal Pradesh';
  table['as'] = 'Assam';
  table['br'] = 'Bihar';
  table['cg'] = 'Chhattisgarh';
  table['ga'] = 'Goa';
  table['gj'] = 'Gujarat';
  table['hr'] = 'Haryana';
  table['hp'] = 'Himachal Pradesh';
  table['jk'] = 'Jammu and Kashmir';
  table['jh'] = 'Jharkhand';
  table['ka'] = 'Karnataka';
  table['kl'] = 'Kerala';
  table['mp'] = 'Madhya Pradesh';
  table['mh'] = 'Maharashtra';
  table['mn'] = 'Manipur';
  table['ml'] = 'Meghalaya';
  table['mz'] = 'Mizoram';
  table['nl'] = 'Nagaland';
  table['od'] = 'Odisha';
  table['pb'] = 'Punjab';
  table['rj'] = 'Rajasthan';
  table['sk'] = 'Sikkim';
  table['tn'] = 'Tamil Nadu';
  table['tr'] = 'Tripura';
  table['up'] = 'Uttar Pradesh';
  table['uk'] = 'Uttarakhand';
  table['wb'] = 'West Bengal';
  table['ts'] = 'Telangana';
  table['an'] = 'Andaman & Nicobar Islands';
  table['ch'] = 'Chandigarh';
  table['dn'] = 'Dadar and Nagar Haveli';
  table['dd'] = 'Daman and Diu';
  table['ld'] = 'Lakshadweep';
  table['dl'] = 'Delhi';
  table['py'] = 'Puducherry';


  function findKey(state) {
    for (var key in table) {
      if (table.hasOwnProperty(state)) {
        console.log('key is: ' + key + ', value is: ' + table[key]);
        return table[state];
      }
    }
  }

  function getValues(item){
    var arr = [];
    item.forEach(function(items){
      items.reports.forEach(function(report){
        // console.log(report);
        arr.push(report);
      })
    })
    return arr;
  }

  function getDateValue(arr) {
    const datearr = ['2003-01-01','2004-01-01','2005-01-01','2006-01-01','2007-01-01','2008-01-01','2009-01-01','2010-01-01','2011-01-01','2012-01-01','2013-01-01','2014-01-01','2015-01-01','2016-01-01','2017-01-01','2018-01-01','2019-01-01', '2020-01-01'];
    var res = [];
    var dict = {};
    for(var i=0;i<arr.length;i++) {
      dict[datearr[i]] = arr[i];
      res.push(dict);
    }
    return res;
  }

  app.get("/predict",auth, async(req,res)=>{
    try{
      var list_type = req.query.crimetype;
      var state = req.query.state;
      var state_name = findKey(state);
      var model = list_type + state;
      if(list_type === "i"){
        var ipcValue = await Ipc.find({State: state_name});
        var ari = [];
        ari = getValues(ipcValue);
        var finalAri = [];
        finalAri = getDateValue(ari);
        console.log(finalAri);
      } else{
        var sllValue = await Sll.find({State: state_name});
        var ars = [];
        ars = getValues(sllValue);
        var finalArs = [];
        finalArs = getDateValue(ars);
        console.log(finalArs);
      }
      res.render("predict",{'state':state});
    }
    catch(err){
      console.log(err);
    }
  });

  

app.listen(process.env.PORT || 3000, function() {
   console.log("Server listening on Port 3000!"); 
});
