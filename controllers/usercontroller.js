const router = require("express").Router();
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { UniqueConstraintError } = require("sequelize/lib/errors");
const validateSession = require("../middleware/validateSession");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

// const transporter = nodemailer.createTransport(sendgridTransport({
//     auth: {
//         api_key: process.env.SENDGRID_KEY
//     }
// }))

const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 1025,
  auth: {
    user: "project.1",
    pass: "secret.1",
  },
});

router.get("/test", (req, res) => res.send("THIS IS A TEST!"));

router.post("/register", async (req, res) => {
  try {
    let { email, username, password, role } = req.body;
    const newUser = await User.create({
      email,
      username,
      password: bcrypt.hashSync(password, 13),
      role: role || "user",
    });
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24,
    });
    transporter.sendMail({
      to: newUser.email,
      from: "NO-REPLY@email.com",
      subject: "Welcome To The Recommend App",
      html: "<h1>Welcome Homie!</h1>",
    });
    res.status(201).json({
      status: "success",
      message: "User registered!",
      user: newUser,
      sessionToken: token,
    });
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      res.status(409).json({
        status: "error",
        message: "Email or Username already in use.",
      });
    } else {
      res.status(500).json({
        status: "error",
        message: "Failed to register user.",
      });
    }
  }
});

router.post("/login", async (req, res) => {
  let { username, password } = req.body;
  try {
    let loginUser = await User.findOne({
      where: { username },
    });
    if (loginUser && (await bcrypt.compare(password, loginUser.password))) {
      const token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });
      res.status(200).json({
        status: "success",
        message: "Login Succeeded",
        user: loginUser,
        sessionToken: token,
      });
    } else {
      res.status(401).json({
        status: "error",
        message: "Login Failed: Userinformation incorrect.",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error Logging In.",
    });
  }
});

router.get("/:username", validateSession, async (req, res) => {
  if (req.user.role === "user" || req.user.role === "admin") {
    try {
      let userStuff = await User.findOne({
        where: { username: req.params.username },
        include: ["likes"],
      });
      res.status(200).json({
        userStuff: userStuff,
        message: `${req.params.username}'s stuff retrieved`,
      });
    } catch (error) {
      res.status(500).json({
        error: error,
        message: "something went wrong",
      });
    }
  }
});

router.post("/resetpassword", (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    User.findOne({
      where: { email: req.body.email },
    }).then((user) => {
      if (!user) {
        return res.status(422).json({ error: "No User With That Eamil." });
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      user.save().then((result) => {
        transporter.sendMail({
          to: user.email,
          from: "NO-REPLY@email.com",
          subject: "Reset Password Request",
          html: `
                                <h1>Password Reset Requested</h1>
                                <p>There was a request to reset your password. Use the link to reset your password</p>
                                <h4>Click this <a href="http://localhost:3000/resetpassword/${token}">LINK</a>to reset your password</h4>
                                `,
        });
        res.json({
            status: 'sent',
          message: "Check Your Email To Reset Password",
        });
      });
    });
  });
});

router.post('/newpassword', (req, res)=>{
  const newPassword = req.body.password;
  const sentToken = req.body.resetToken;
  User.findOne({
    where: {resetToken: sentToken}
  })
    .then(user=>{
      if(!user){
        return res.status(422).json({
          error: 'Try again session expired'
        })
      }
      bcrypt.hash(newPassword, 13)
        .then(hashedPassword=>{
          user.password = hashedPassword;
          user.resetToken = null;
          user.expireToken = null;
          user.save().then((savedUser)=>{
            res.json({
              message: 'password updated successfully',
              status: 'sent'
            })
          })
        })
          .catch(err => {
            console.log(err)
          })
    })
})

module.exports = router;
