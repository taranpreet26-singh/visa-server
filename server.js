import express from "express";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import cors from "cors"

const app = express();
const port = 3000;
app.use(cors())

app.use(bodyParser.json()); // To parse JSON request body

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ishanarora594@gmail.com",
    pass: "eqbh pres gwux nngq", // Use App Password or update this if necessary
  },
});

app.post('/mail', (req, res) => {
  console.log(req.body)
  const { from, to, subject, text, html } = req.body;

  const emailHtml = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #212428;
            color: #fff;
            padding: 20px;
            margin: 0;
          }
          .container {
            background-color: #1e1f23;
            padding: 20px;
            border-radius: 10px;
          }
          h1 {
            color: #ff014f;
            font-size: 24px;
            font-weight: bold;
          }
          p {
            font-size: 16px;
            color: #bbb;
          }
          .contact-details {
            margin-top: 20px;
          }
          .contact-details p {
            font-size: 14px;
            margin: 5px 0;
          }
          .button {
            background-color: #ff014f;
            color: white;
            padding: 10px 15px;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            display: inline-block;
          }
          .button:hover {
            background-color: #e10a42;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>New Contact Form Submission</h1>
          <p><strong>Name:</strong> ${req.body.name}</p>
          <p><strong>Phone:</strong> ${req.body.phone}</p>
          <p><strong>Email:</strong> ${req.body.email}</p>
          <p><strong>Subject:</strong> ${req.body.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${req.body.message}</p>
          <div class="contact-details">
            <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
            <a href="mailto:${req.body.email}" class="button">Reply</a>
          </div>
        </div>
      </body>
    </html>
  `;

  const mailOptions = {
    from: req.body.email,
    to: "ishanarora594@gmail.com",  // Replace with the actual email address
    subject: subject || "New Contact Form Submission",
    text: text || "You have received a new contact form submission.",
    html: emailHtml,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
      return res.status(500).send("Error sending email");
    } else {
      console.log("Message sent: %s", info.messageId);
      return res.status(200).send("Message sent successfully");
    }
  });
});

app.listen(port, () => {
  console.log(`Successfully connected with http://localhost:${port}`);
});
