import path from "path";
import { config } from "dotenv";
import express from "express";
import nodemailer from "nodemailer";

const app = express();

// Configuration
config();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(express.json());

app.get("/", (req, res) => {
  return res.render("home");
});

app.post("/send-email", async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: process.env.MAIL_TO,
      subject: "Sending Email using Node.js",
      text: "<h1>Welcome</h1><p>That was easy!</p>",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.render("failure");
      } else {
        return res.render("success");
      }
    });
  } catch (error) {
    return res.render("failure");
  }
});

app.listen(3000, () => {
  console.log("Listening at port 3000");
});
