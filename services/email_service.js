// 'use strict';

// import secrets from './secrets.js';
// const sendgrid = require('sendgrid')(secrets.API_KEY) ;

// export default function sendEmail(err, formData) {
//   let data = formData;
//   const emailContent = `Emails coming from Tulu app to Sendgrid to User
//   Form content
//   First Name: ${data.firstName}
//   Last Name: ${data.lastName}
//   Email: ${data.email}
//   Phone: ${data.phone}
//   Comments: ${data.comments}`;
  
//   const request = sendgrid.emptyRequest({
//     method: 'POST',
//     path: '/v3/mail/send',
//     body: {
//       personalizations: [
//         {
//           to: [
//             {
//               email: 'jsrhodes15@gmail.com'
//             }
//           ],
//           subject: 'Test email from Tulu / Sendgrid'
//         }
//       ],
//       from: {
//         email: 'test@example.com'
//       },
//       content: [
//         {
//           type: 'text/plain',
//           value: emailContent
//         }
//       ]
//     }
//   });

//   sendgrid.API(request, function (error, response) {
//     if (error) {
//       console.log('Error response received');
//     }
//     console.log("Status code: ", response.statusCode)
//     console.log("Response Body: ", response.body)
//     console.log("Response Headers: ", response.headers)
//   });

// };
