const { contact, offer } = require('./server/routes/index.js');
const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
var app = express();
var cors = require('cors');
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

exports.mysqlConnection = mysql.createConnection({
  host: 'kelvin.rdb.superhosting.bg',
  user: 'pokrvx48_santiya',
  password: 'mAFnWY3F@8FI',
  database: 'pokrvx48_pokrivala',
  multipleStatements: true
});

this.mysqlConnection.connect((err) => {
  if (!err)
    console.log('Connection Established Successfully');
  else
    console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
});

app.use(cors(corsOptions));
app.use(bodyparser.json());
app.use("/contact", contact);
// app.use("/offer", offer);

//Establish the server connection
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(8080, () => console.log(`Listening on port ${port}..`));