const express = require('express')
const UserCtrl = require('../controllers/user-ctrl')

var pgp = require('pg-promise')();

var db1 = pgp('postgres://iamadmin:password123@localhost:5432/nodejs_api')


const router = express.Router()

router.post('/users/signin', UserCtrl.validateUser)


router.post('/upload_file', (req, res) => {

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({success: false, error: 'No files were uploaded.'});
    }

    sampleFile = req.files.jsonFile;
    jsonData = JSON.parse(sampleFile.data.toString('utf8'));
    console.log(jsonData);


    const TABLE_NAME = "mytable";
    var allCols = [];
    var queries = [];
    var sqlstatement = "";
    for (let i=0; i< jsonData.length; i++) {
        var keylist = "(";
        var valuelist = "(";
        var firstPair = true;
        for (var key in jsonData[i]) {

          if (jsonData[i].hasOwnProperty(key)) {
 
              var value = (jsonData[i])[key];
              if (!firstPair) {
                  keylist += ", ";
                  valuelist += ", ";
              }
              firstPair = false;
              keylist += key
              allCols.push(key);

              valuelist += "'" + (value).toString() + "'";
          }
        }
        keylist += ")"
        valuelist += ")"
        sqlstatement = "INSERT INTO " + TABLE_NAME + " " + keylist + " VALUES " + valuelist;
        queries.push(sqlstatement)
    }

    queries = queries.slice(0,-1);
    
    const cols = [...new Set(allCols)];
    var createQuery = 'CREATE TABLE mytable (';
    for (let i=0; i<cols.length; i++) {
        if (cols[i].toLowerCase().includes('id'))
            createQuery += cols[i] + ' int, ';
        else
            createQuery += cols[i] + ' varchar(255), ';
    }
    createQuery = createQuery.slice(0,-2);
    createQuery += ')';
    
    console.log(createQuery);

    db1.none('DROP TABLE mytable').then(() => {
        db1.none(createQuery)
        .then(() => {
            console.log("successfully connected to table.");

            console.log(queries);

            for (let i=0; i<queries.length; i++) {
                db1.none(queries[i]);
            }
        })
        .catch(error => {
            console.log(error);
        })
    })

    return res.status(200).json({success: true, message: 'File uploaded!'});
});



router.get('/getData', function (req, res) {

    db1.any('SELECT * FROM mytable')
    .then(function(data) {
        console.log(data);
        return res.status(200).send({ data: data });
    })
    .catch(function(error) {
        console.log(error);
        return res.status(400).send({ error: error });
    });


})





















const { GenerateJWT, DecodeJWT, ValidateJWT } = require("../controllers/dec-enc.js");

router.post("/GenerateJWT", (req, res) => {
  let { header, claims, key } = req.body;
  // In case, due to security reasons, if the client doesn't send a key,
  // use our default key.
  key = key || "thisisdefaultkey";
  return res.status(200).json(GenerateJWT(header, claims, key));
});

router.post("/DecodeJWT", (req, res) => {
  res.json(DecodeJWT(req.body.sJWS));

});

router.post("/ValidateJWT", (req, res) => {
  let { header, token, key } = req.body;
  // In case, due to security reasons, if the client doesn't send a key,
  // use our default key.
  key = key || "thisisdefaultkey";
  res.json(ValidateJWT(header, token, key));
});




module.exports = router