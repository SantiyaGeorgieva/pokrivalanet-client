const mysql = require('mysql2');
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const request = require('request');
const { linkUrl } = require('./utils');
// const cookieParser = require('cookie-parser');
// const path = require('path');
// const fs = require('fs');

dotenv.config();

const pool = mysql.createPool({
  host: process.env.HOSTING,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB
}).promise();

var bcrypt = require('bcrypt');
var saltRounds = 10;

const app = express();

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 201,
};

// parse application/json
app.use(bodyParser.json());

// Require body-parser (to receive post data from clients)
app.use(bodyParser.urlencoded({ extended: true }));

// enable CORS using npm package
app.use(cors(corsOptions));

// app.use(cookieParser());

//Routes
app.post("/register", async (req, res, next) => {
  console.log('req', req.body);
  const password = req.body.password;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  let users = {
    "username": req.body.username,
    "password": encryptedPassword
  };

  pool.query('INSERT INTO users SET ?', users, function (error, results, fields) {
    console.log('error', error);
    console.log('results', results);
    console.log('fields', fields);
    if (error) {
      res.send({
        "code": 400,
        "status": error
      })
    } else {
      res.send({
        "code": 200,
        "status": "User registered sucessfully"
      });
    }
  });
  next();
});

app.post("/login", async (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  pool.query('SELECT users.*, count(roles.role_id) AS rolesUser FROM users LEFT JOIN roles ON roles.role_id=user.id WHERE username = ?', [username], async function (error, results, fields) {
    if (error) {
      res.send({
        "code": 400,
        "failed": "error occurred",
        "error": error
      })
    } else {
      if (results.length > 0) {
        const comparison = await bcrypt.compare(password, results[0].password);

        if (comparison) {
          res.send({
            "code": 200,
            "success": "Login successful",
            "id": results[0].id,
            "userName": results[0].user_name,
          })
        } else {
          res.send({
            "code": 204,
            "error": "Username and password does not match"
          })
        }
      } else {
        res.send({
          "code": 206,
          "error": "Username does not exist"
        });
      }
    }
  });
});

// verify reCAPTCHA response
app.post("/verify-token", async (req, res) => {
  try {
    let token = req.body;
    let response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.REACT_APP_googleSecretApiKey}&response=${token}`);
    return res.status(200).json({
      success: true,
      message: "Token successfully verified",
      data: response.data
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error verifying token"
    });
  }
});

app.post("/contact", async (req, res, next) => {
  const { name, email, subject, message } = req.body;

  let transporter = nodemailer.createTransport({
    host: process.env.HOST_EMAIL,
    port: process.env.PORT_EMAIL,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.PASSWORD_EMAIL
    }
  });

  var content = `Name: ${name}\nEmail: ${email} \n\n Message: ${message} `;
  const mailOptions = {
    from: name,
    email: email,
    subject: subject,
    text: content,
    to: process.env.USER_EMAIL
  }

  transporter.sendMail(mailOptions, (err, result) => {
    if (err) {
      console.log(err);
      res.json('Opps error occured')
    } else {
      res.send(200).json('Thanks for e-mailing me', result.response);
    }
  });

  pool.query('INSERT INTO contacts SET ?', req.body, function (error, results, fields) {
    pool.release();

    if (error) {
      res.status(400).json({ message: error });
    } else {
      res.status(200).json({ message: "Contact registered sucessfully" });
    }
  });
});

app.post("/priceOffer", async (req, res, next) => {
  const { width,
    height,
    thick,
    edge,
    hardwareText,
    zips,
    lower_apron,
    pipe_pocket,
    knobs,
    curtain_have_door
  } = req.body;

  let priceThick = 0;
  let finalPrice = 0;
  let hardwareTextPrice = 0;
  let plasticKnobsPrice = 2.5;
  let metalKnobsPrice = 4.5;
  let strapPlatesPrice = 12;
  let pockets = 0.5;
  let zipPrice = 15;

  const w = Number(width);
  const h = Number(height);
  const e = (Number(edge) * 2) / 100;

  // console.log('req.body', req.body);

  if (+thick === 0.8) {
    priceThick = 24;
  } else {
    priceThick = 20;
  }

  finalPrice = ((w + e) * (h + e));
  finalPrice = (finalPrice.toFixed(2) * priceThick).toFixed(2);

  // console.log('hardwareText', hardwareText);

  if (hardwareText === 'plastic_knobs') {
    hardwareTextPrice = (((2 * h) / 0.35) * plasticKnobsPrice).toFixed(2);
    finalPrice = Number(finalPrice) + Number(hardwareTextPrice);
  }

  if (hardwareText === 'metal_knobs') {
    hardwareTextPrice = (((2 * h) / 0.35) * metalKnobsPrice).toFixed(2);
    finalPrice = Number(finalPrice) + Number(hardwareTextPrice);
  }

  if (hardwareText === 'strap_plates') {
    hardwareTextPrice = ((2 * h) * strapPlatesPrice).toFixed(2);
    finalPrice = Number(finalPrice) + Number(hardwareTextPrice);
  }

  if (pockets === 'pockets') {
    hardwareTextPrice = (((2 * h) / 0.15) * pockets).toFixed(2);
    finalPrice = Number(finalPrice) + Number(hardwareTextPrice);
  }

  if (zips === true) {
    hardwareTextPrice = (w * zipPrice).toFixed(2);
    finalPrice = Number(finalPrice) + Number(hardwareTextPrice);
  }

  if (lower_apron === true) {
    hardwareTextPrice = ((w * 0.35) * strapPlatesPrice).toFixed(2);
    finalPrice = Number(finalPrice) + Number(hardwareTextPrice);
  }

  if (pipe_pocket === true) {
    hardwareTextPrice = ((w * 0.20) * strapPlatesPrice).toFixed(2);
    finalPrice = Number(finalPrice) + Number(hardwareTextPrice);
  }

  if (knobs === true) {
    finalPrice = (Number(finalPrice) + 9).toFixed(2);
  }

  if (curtain_have_door === true) {
    finalPrice = (Number(finalPrice) + 60).toFixed(2);
  }

  // finalPrice = Number(finalPrice) + Number(hardwareTextPrice);
  // console.log('hardwareTextPrice', hardwareTextPrice);
  // console.log('finalPrice', finalPrice);

  res.status(200).json({
    'status': 'success',
    'result': finalPrice
  });
});

app.post("/offer", async (req, res, next) => {
  const { document } = req.body;
  // console.log('req.body', req.body);
  var PassThrough = require('stream').PassThrough;

  var nameOfAttachment = 'PokrivalaNET_offer.pdf';
  var imageUrlStream = new PassThrough();
  request
    .get({
      proxy: `${linkUrl}`, // if needed
      // url: document
    })
    .on('error', function (err) {
      // I should consider adding additional logic for handling errors here
      console.log(err);
    })
    .pipe(imageUrlStream);

  let transporter = nodemailer.createTransport({
    host: process.env.HOST_EMAIL,
    port: process.env.PORT_EMAIL,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.PASSWORD_EMAIL
    }
  });

  // var filePath = path.join(__dirname, document.name);

  const mailOptions = {
    from: 'test@test.com',
    subject: 'Оферта',
    to: process.env.USER_EMAIL,
    html: `<h1>Оферта от клиент</h1>`,
    attachments: [
      {
        filename: nameOfAttachment,
        content: imageUrlStream
        // filename: "test.pdf",
        // content: `data:text/plain;base64,${document}`,
        // content: fs.createReadStream(`${document}`)
        // streamSource: fs.createReadStream(filePath)
        // path: path.join(__dirname, `../output/PokrivalaOffer.pdf`),
        // href: document,
        // content: `${document}`,
        // contentType: "application/pdf",
        // encoding: 'utf-8',
        // encoding: 'base64',
      }
    ]
  }

  transporter.sendMail(mailOptions, (err, result) => {
    if (err) {
      console.log(err);
      res.json('Opps error occured')
    } else {
      res.send(200).json('Email sent: ' + result.response);
    }
  });

  // pool.query('INSERT INTO contacts SET ?', req.body, function (error, results, fields) {
  //   pool.release();

  //   if (error) {
  //     res.status(400).json({ message: error });
  //   } else {
  //     res.status(200).json({ message: "Contact registered sucessfully" });
  //   }
  // });
});

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});