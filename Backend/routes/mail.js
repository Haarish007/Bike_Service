const nodemailer = require("nodemailer");
const Email = require("../models/mail");
const express=require("express")
const routes=express.Router()



routes.post("/newmail",async(req, res) => {
    console.log(req.body);
  try {
    // Create a transporter with SMTP options
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "haarishda.20cse@kongu.edu",
        pass: "hari@007",
      },
    });
    // Create an email object with user input
    const email = new Email({
      userName:req.body.userName,
      from:"haarishda.20cse@kongu.edu",
      to:req.body.from,
      text: req.body.text,
    });

    // Send the email using nodemailer
    const info = await transporter.sendMail({
      from:"haarishda.20cse@kongu.edu",
      to: req.body.from,
      text: req.body.text,
      html:`<h5> Email :</h5><p>${"haarishda.20cse@kongu.edu"}</p> <br><h5> Phone Number:</h5> <p>${2937846298} </p> <br><h5> Name :</h5> <p> ${req.body.userName} </p> <br> <h4> Message : </h4> <br> <p> ${req.body.text} </p> `
    });

    // Save the email object to MongoDB
    await email.save();

    // Send a response to the client
    console.log("Email sent successfully");
    res.json({ message: "Email sent successfully", info });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

// exports.email_get = async (req, res) => {
//     console.log("Get")
//   try {
//     const emails = await Email.find({});
//     res.json(emails);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server Error");
//   }
// };
// exports.email_delete = async (req, res) => {
//   try {
//     const deletedEmail = await Email.findByIdAndDelete(req.params.id);
//     if (!deletedEmail) {
//       return res.status(404).json({ message: "Email not found" });
//     }
//     res.json({ message: "Email deleted successfully", email: deletedEmail });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error", error: err });
//   }
// };


module.exports=routes;