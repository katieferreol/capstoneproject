const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const { Parser } = require('json2csv');
const fields = ['share', 'language'];
const fs = require('fs');
app.use(express.urlencoded({ extended: true }))

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/views/index.html'));
  //__dirname : It will resolve to your project folder.
});

router.post('/', function (req, res, next) {
    let csv = req.body.share;
    let language = req.body.language;
    console.log(csv, language);
    fs.appendFile('./static/assets/experience.csv',csv+','+language+'\r\n', function(err) {
        if (err) throw err;
    console.log('Saved!');
    res.redirect('/thankyou');
    });
});

router.get('/display',function(req,res){
    res.sendFile(path.join(__dirname+'/views/display.html'));
});  

router.get('/thankyou',function(req,res){
  res.sendFile(path.join(__dirname+'/views/thankyou.html'));
}); 

//add the router
app.use('/', router);
app.use("/static", express.static('./static/'));
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');
