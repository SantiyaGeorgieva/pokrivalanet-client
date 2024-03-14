const dotenv = require('dotenv');
const mysql = require('mysql2');
const app = require('./backend/app');

dotenv.config({ path: './config.env' });

exports.pool = mysql.createPool({
  host: process.env.HOSTING,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB
}).promise();

// var bcrypt = require('bcrypt');
// var saltRounds = 10;

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

const server = app.listen(8080, () => {
  console.log('Server is running on port 8080');
});

module.exports = server;