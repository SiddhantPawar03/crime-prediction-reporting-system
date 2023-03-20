const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
const mongoose = require('mongoose');


const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/crimeDB", {useNewUrlParser: true});


const crimeSchema = {
    id: Number,
    date: String,
    day: String,
    district: String,
    address: String,
    xcoord: Number,
    ycoord: Number
};

const Crime = mongoose.model("Post", crimeSchema);





app.get("/", function(req,res) {
    res.send("HELLO!");
});

app.get("/dashboard", function(req,res) {
    res.render("dashboard");
})

app.get("/complaint", function(req,res) {
    res.render("complaint");
});

app.post("/complaint", function(req,res) {
    const complaint = new Crime({
        // date: req.body.date,
        day: req.body.days,
        district: req.body.district,
        address: req.body.address,
        xcoord: req.body.xcoord,
        ycoord: req.body.ycoord
    });
    console.log(req.body.address);

    complaint.save(function(err) {
        if(!err) {
            res.redirect("/");
        }
    });
});


app.get("/viewcrime", async (req, res) => {
    try {
      const details = await Crime.find({ });
    //   res.send(articles);
      res.render("viewcrime", {listTitle: "Crime Report", item: details});
      console.log(details.day);
    } catch (err) {
      console.log(err);
    }
  });

//   app.get("/viewcrime", function(req,res) {
//     Crime.find({}, function(err, details){
//         res.render("viewcrime", {
//             listTitle: "Crime Report", details: details
//           });
//       });
//   });

  app.get("/", function(req, res){

    Post.find({}, function(err, posts){
      res.render("home", {
        startingContent: homeStartingContent,
        posts: posts
        });
    });
  });


app.listen(process.env.PORT || 3000, function() {
   console.log("Server listening on Port 3000!"); 
});