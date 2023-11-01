// IMPORTS AND MIDDLEWARE / CONFIG
var express = require('express');
var nodemailer = require('nodemailer');
var cors = require('cors');
const creds = require('../../config');
const { mysqlConnection } = require('../../server');
const app = express();
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 201,
};

// Multiple routing
const router1 = express.Router();
const router2 = express.Router();

app.use(cors(corsOptions));
app.use(express.json());
app.use('/contact', router1);
// app.use('/offer', router2);
app.set('port', 8080);

var transport = {
  host: 'kelvin.superhosting.bg',
  port: 587,
  auth: {
    user: creds.USER,
    pass: creds.PASS
  }
}
var transporter = nodemailer.createTransport(transport)
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log(success);
    // console.log('Server is ready to take messages');
  }
});

exports.contact = router1.post('/contact', (req, res) => {
  console.log('req', req);
  let contact = req.body;
  var name = req.body.name;
  var email = req.body.email;
  var subject = req.body.subject;
  var message = req.body.message;
  var content = `name: ${name} \n email: ${email} \n\n message: ${message} `;
  var mail = {
    from: name,
    to: 'sales@pokrivala.net',
    subject: subject,
    text: content
  }

  var sql = `SET @contact_name = ?;SET @contact_email = ?;SET @contact_subject = ?;SET @contact_message = ?; 
  CALL createContact(@contact_name, @contact_email, @contact_subject, @contact_meesage);`;
  mysqlConnection.query(sql, [contact.name, contact.email, contact.subject, contact.message], (err, rows, fields) => {
    console.log('rows', rows);

    if (!err) {
      rows.forEach(element => {
        console.log('element', element);
        // if (element.constructor == Array) {
        //   res.send('New Contact Name : ' + element[0].contact_name);
        // }
        res.status(200).send(element);
      });
    } else {
      console.log(err);
    }
  })

  // transporter.sendMail(mail, (err, data) => {
  //   if (err) {
  //     res.json({
  //       status: 'fail'
  //     })
  //   } else {
  //     res.json({
  //       status: 'success'
  //     })
  //   }
  // });
});

// router1.post('/contact', (req, res, next) => {
// console.log('req.body', req.body);
//   var name = req.body.name;
//   var email = req.body.email;
//   var subject = req.body.subject;
//   var message = req.body.message;
//   var content = `name: ${name} \n email: ${email} \n\n message: ${message} `;
//   var mail = {
//     from: name,
//     to: 'sales@pokrivala.net',
//     subject: subject,
//     text: content
//   }
//   transporter.sendMail(mail, (err, data) => {
//     if (err) {
//       console.log('err', err)
//       res.json({
//         status: 'fail'
//       })
//     } else {
//       console.log('here')
//       res.json({
//         status: 'success'
//       })
//     }
//   });
// });

exports.offer = async () => {
  await router2.post('/offer', (req, res, next) => {
    console.log('req.body', req.body);
    var subject = "Hey this is a subject example";
    var mail = {
      to: 'sales@pokrivala.net',  // Change to email address that you want to receive messages on
      subject: subject,
      attachments: [
        {
          filename: `${req.body.attachments[0].filename}`,
          content: `${req.body.attachments[0].content}`,
          encoding: `${req.body.attachments[0].encoding}`,
        },
      ],
    }
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          status: 'fail'
        })
      } else {
        res.json({
          status: 'success'
        })
      }
    });
  });
}