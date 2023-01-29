
// var express = require('express');

// var app = express();
// var server = app.listen(3000);

// app.use(express.static('public'));

// console.log("my socket server is running"); 

// var socket = require('socket.io');

// var io = socket(server);

// io.sockets.on('connection', newConnection);

// function newConnection(socket) {
//     console.log('new connection: ' + socket.id);
// }

// const express=require("express")

// // Importing all the routes
// const homeroute=require("./routes/Home.js")
// const displayroute=require("./routes/display")

// // Creating express server
// const app=express()

// // Handling routes request
// app.use("/home",homeroute)
// app.use("/display", displayroute)
// app.listen((3000),()=>{
// 	console.log("Server is Running")
// })

const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const { Parser } = require('json2csv');
const fields = ['share'];
const fs = require('fs');

app.use(express.urlencoded({ extended: true }))

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/views/index.html'));
  //__dirname : It will resolve to your project folder.
});

router.post('/', function (req, res, next) {
    //console.log(JSON.stringify(req.body.share));
    const json2csvParser = new Parser({ fields, header: false });
    let csv = json2csvParser.parse(req.body);
    console.log(csv);
    fs.appendFile('experience.csv',csv+',', function(err) {
        if (err) throw err;
    console.log('Saved!');
    res.redirect('/display');
    });
});

router.get('/display',function(req,res){
    res.sendFile(path.join(__dirname+'/views/display.html'));
    //__dirname : It will resolve to your project folder.
  });  

//add the router
app.use('/', router);
app.use("/static", express.static('./static/'));
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');
