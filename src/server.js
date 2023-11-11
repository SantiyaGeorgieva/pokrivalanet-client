const mysql = require('mysql2');
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const creds = require('./config/db.config.js');
const { googleSecretApiKey } = require('./config/configApi');

dotenv.config();

const pool = mysql.createPool({
  host: creds.HOST,
  user: creds.USER,
  password: creds.PASSWORD,
  database: creds.DB
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
    let response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${googleSecretApiKey}&response=${token}`);
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
    host: creds.HOST_EMAIL,
    port: creds.PORT_EMAIL,
    auth: {
      user: creds.USER_EMAIL,
      pass: creds.PASSWORD_EMAIL
    }
  });

  var content = `Name: ${name}\nEmail: ${email} \n\n Message: ${message} `;
  const mailOptions = {
    from: name,
    email: email,
    subject: subject,
    text: content,
    to: 'sales@pokrivala.net'
  }

  transporter.sendMail(mailOptions, (err, result) => {
    if (err) {
      console.log(err);
      res.json('Opps error occured')
    } else {
      res.send(200).json('thanks for e-mailing me', result.response);
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

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});