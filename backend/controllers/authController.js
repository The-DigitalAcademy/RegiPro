const nodemailer = require("nodemailer");
const db = require("../models");
const config = require("../config/authConfig");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            var token = jwt.sign({ id: user.id }, config.secret, {
              expiresIn: 86400, // 24 hours
            });

            res.status(201).send({
              message: "User registered successfully!",
              id: user.id,
              email: user.email,
              firstname: user.firstname,
              lastname: user.lastname,
              roles: req.body.roles,
              accessToken: token,
            });
          });
        });
      } else {
        // user role = 1
        user.setRoles([2]).then(() => {
          var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400, // 24 hours
          });

          res.status(201).send({
            message: "User registered successfully!",
            id: user.id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            roles: ["user"], // You can customize this role if needed
            accessToken: token,
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signout = (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};

//forgot password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    // Create a transport using Nodemailer
    const transporter = nodemailer.createTransport({
      service: "Gmail", // e.g., 'Gmail'
      auth: {
        user: "chalatsethabo@gmail.com",
        pass: "xicawwpjgjwenprt",
      },
    });

    let resetLink = "http://localhost:4200/reset-password";
    // Define the email options
    const mailOptions = {
      from: "chalatsethabo@gmail.com",
      to: user.email,
      subject: "Password Reset Request",
      // text: `To reset your password, click the following link: ${x}`,
      html: `
      <p>Hello,</p>
      <p>To reset your password, click the following link:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>If you didn't request this, please ignore this email.</p>
    `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .send({ message: "Password reset email sent successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
// reset password
exports.resetPassword = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).send({ message: "Passwords do not match" });
    }

    const user = await User.findOne({ where:  {email:email}  });
    if (!user) {
      return res.status(400).send({ message: "User not available" });
    }

    // Update the user's password and reset token
    user.password = bcrypt.hashSync(password, 10);

    // Save the updated user
    await user.save();

    return res.status(200).send({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

