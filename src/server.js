const dotenv = require('dotenv');
const mysql = require('mysql2');
const compression = require('compression');
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

dotenv.config();

const pool = mysql.createPool({
  host: process.env.HOSTING,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB
}).promise();

// var bcrypt = require('bcrypt');
// var saltRounds = 10;

const app = express();

// Set security HTTP headers
app.use(helmet());

// Data sanitization against XSS (cross-side script attack)
app.use(xss());

app.disable('x-powered-by');
app.use(compression());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});

app.use('/', limiter);

//Set Cors
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

//Routes
// app.post("/register", async (req, res, next) => {
//   const password = req.body.password;
//   const encryptedPassword = await bcrypt.hash(password, saltRounds);
//   let users = {
//     "username": req.body.username,
//     "password": encryptedPassword
//   };

//   pool.query('INSERT INTO users SET ?', users, function (error, results, fields) {
//     if (error) {
//       res.send({
//         "code": 400,
//         "status": error
//       })
//     } else {
//       res.send({
//         "code": 200,
//         "status": "User registered sucessfully"
//       });
//     }
//   });
//   next();
// });

// app.post("/login", async (req, res) => {
//   var username = req.body.username;
//   var password = req.body.password;

//   pool.query('SELECT users.*, count(roles.role_id) AS rolesUser FROM users LEFT JOIN roles ON roles.role_id=user.id WHERE username = ?', [username], async function (error, results, fields) {
//     if (error) {
//       res.send({
//         "code": 400,
//         "failed": "error occurred",
//         "error": error
//       })
//     } else {
//       if (results.length > 0) {
//         const comparison = await bcrypt.compare(password, results[0].password);

//         if (comparison) {
//           res.send({
//             "code": 200,
//             "success": "Login successful",
//             "id": results[0].id,
//             "userName": results[0].user_name,
//           })
//         } else {
//           res.send({
//             "code": 204,
//             "error": "Username and password does not match"
//           })
//         }
//       } else {
//         res.send({
//           "code": 206,
//           "error": "Username does not exist"
//         });
//       }
//     }
//   });
// });

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
      res.send(200).json({ 'message': result.response });
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

app.post("/windproofcurtains-priceoffer", async (req, res, next) => {
  const {
    width,
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

  if (+thick === 0.8) {
    priceThick = 24;
  } else {
    priceThick = 20;
  }

  finalPrice = ((w + e) * (h + e));
  finalPrice = (finalPrice.toFixed(2) * priceThick).toFixed(2);

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

  res.status(200).json({
    'status': 'success',
    'result': finalPrice
  });
});

app.post("/windproofcurtains-offer-file", async (req, res) => {
  try {
    let response = await pool.query("INSERT INTO `windproof-curtains` SET ?", req.body, function (error, results, fields) {
      pool.release();
      return results;
    });
    return res.status(200).json({
      success: true,
      status: "success",
      message: "File information saved sucessfully!",
      offerId: response[0].insertId
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error
    });
  }
});

app.post("/windproofcurtains-offer-email", async (req, res, next) => {

  let transporter = nodemailer.createTransport({
    host: process.env.HOST_EMAIL,
    port: process.env.PORT_EMAIL,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.PASSWORD_EMAIL
    }
  });

  const mailOptions = {
    from: 'Клиент',
    subject: 'Оферта за ветроупорна завеса',
    to: process.env.USER_EMAIL,
    html: `<h1>Оферта от клиент</h1>`,
    attachments: [
      {
        filename: req.body.filename,
        path: req.body.file
      }
    ]
  };

  transporter.sendMail(mailOptions, (err, result) => {
    if (err) {
      console.error(err);
      res.status(400).json({ "message": err })
    } else {
      res.status(200).json({ 'status': "success", 'message': 'Email sent:' + result.response });
    }
  });
});

app.post("/truckcovers-priceoffer", async (req, res, next) => {
  const {
    width,
    length,
    hood,
    back_cover,
    falling_pipe,
    falling_right,
    number_stretches,
    date_manufacture,
    tarpaulin_type,
    longitudinal_pocket,
    fitting_left,
    fitting_right,
    assembly
  } = req?.body?.values;
  const { title } = req?.body;

  var finalPrice;
  let l = Number(length) + 0.6;

  if (title === 'card_text4') {
    let totalLength = 0;
    let priceTarpaulin = 0;
    const longitudinalPocketPrice = 0.3;
    const fittingPrice = 50;
    const assemblyPrice = 1.2;
    let totalWidth = 0;

    let w = Number(width) + 0.8;
    const hood_value = Number(hood);
    const back_cover_value = Number(back_cover);
    const falling_pipe_value = Number(falling_pipe);
    const falling_right_value = Number(falling_right);
    const number_stretches_value = (Number(number_stretches) * 0.2);

    totalWidth = (w + hood_value + back_cover_value + number_stretches_value).toFixed(2);
    totalLength = (l + falling_pipe_value + falling_right_value + number_stretches_value).toFixed(2);

    if (longitudinal_pocket) {
      totalLength = (Number(totalLength) + Number(longitudinalPocketPrice)).toFixed(2);
    }

    if (tarpaulin_type === '680гр/кв.м') {
      priceTarpaulin = 12;
    } else {
      priceTarpaulin = 16;
    }

    finalPrice = (Number(totalWidth) * Number(totalLength) * Number(priceTarpaulin)).toFixed(2);

    if (fitting_right || fitting_left) {
      finalPrice = (Number(finalPrice) + Number(fittingPrice)).toFixed(2);
    }

    if (assembly) {
      finalPrice = (Number(finalPrice) * Number(assemblyPrice)).toFixed(2);
    }
  } else {
    let totalLength = 0;
    let h = 3;
    totalLength = l * h * 15;

    if (title === 'card_text8') {
      finalPrice = (totalLength + 50).toFixed(2);
    } else if (title === 'card_text7') {
      finalPrice = (totalLength + 25).toFixed(2);
    }
  }

  res.status(200).json({
    'status': 'success',
    'result': finalPrice
  });
});

app.post("/truckcovers-offer-file", async (req, res) => {
  try {
    let response = await pool.query("INSERT INTO `truck-covers` SET ?", req.body, function (error, results, fields) {
      pool.release();
      return results;
    });
    return res.status(200).json({
      success: true,
      status: "success",
      message: "File information saved sucessfully!",
      offerId: response[0].insertId
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error
    });
  }
});

app.post('/truckcovers-offer-email', async (req, res, next) => {

  let transporter = nodemailer.createTransport({
    host: process.env.HOST_EMAIL,
    port: process.env.PORT_EMAIL,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.PASSWORD_EMAIL
    }
  });

  const mailOptions = {
    from: 'Клиент',
    subject: 'Оферта за покривало',
    to: process.env.USER_EMAIL,
    html: `<h1>Оферта от клиент</h1>`,
    attachments: [
      {
        filename: req.body.filename,
        path: req.body.file
      }
    ]
  };

  transporter.sendMail(mailOptions, (err, result) => {
    if (err) {
      console.error(err);
      res.status(400).json({ "message": err })
    } else {
      res.status(200).json({ 'status': "success", 'message': 'Email sent:' + result.response });
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!');
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'build')));

  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});