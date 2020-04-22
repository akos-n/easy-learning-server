const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const User = require("../authentication/User");
const UserSchemaValidator = require("../schemas/UserSchemaValidator");
const ResetPasswordSchema = require("../schemas/ResetPasswordSchema");

const db = mongoose.model("users", UserSchemaValidator);
const resetDb = mongoose.model("reset-password", ResetPasswordSchema);

router.post("/register", (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const newUser = new User(req.body.username, req.body.email, hash);
      db.create(newUser)
        .then(() => res.json(JSON.stringify({ success: true })))
        .catch((err) => {
          res.json(JSON.stringify({ success: false, err: err.message }));
        });
    })
    .catch((err) =>
      res.json(
        JSON.stringify({
          success: false,
          err:
            "Registration failed on the server's side, please try again a few minutes later!",
        })
      )
    );
});

router.post("/login", (req, res, next) => {
  db.findOne({ username: req.body.username }, (err, result) => {
    if (result === null)
      res.json(
        JSON.stringify({ success: false, err: "Invalid username or password!" })
      );
    else {
      bcrypt
        .compare(req.body.password, result.password)
        .then((value) => {
          if (value === true)
            res.json(
              JSON.stringify({
                success: true,

                needNewPassword: false,
                id: result._id,
                username: req.body.username,
              })
            );
          else
            resetDb.findOne({ userId: result._id }, (err, resetResult) => {
              if (resetResult)
                bcrypt
                  .compare(req.body.password, resetResult.newPassword)
                  .then((value) => {
                    if (value === true)
                      res.json(
                        JSON.stringify({
                          success: true,
                          needNewPassword: true,
                          id: result._id,
                          username: req.body.username,
                        })
                      );
                    else
                      res.json(
                        JSON.stringify({
                          success: false,
                          err: "Invalid username or password!",
                        })
                      );
                  })
                  .catch((err) =>
                    res.json(
                      JSON.stringify({
                        success: false,
                        err:
                          "Login failed on the server's side, please try again a few minutes later!",
                      })
                    )
                  );
              else
                res.json(
                  JSON.stringify({
                    success: false,
                    err: "Invalid username or password!",
                  })
                );
            });
        })
        .catch((err) =>
          res.json(
            JSON.stringify({
              success: false,
              err:
                "Login failed on the server's side, please try again a few minutes later!",
            })
          )
        );
    }
  });
});

router.post("/forgotten-datas", (req, res, next) => {
  db.findOne({ email: req.body.email }, (err, result) => {
    if (result === null)
      res.json(
        JSON.stringify({
          success: false,
          err: "There is no account for this email address in the database!",
        })
      );
    else {
      const newPassword = crypto.randomBytes(32).toString("hex");
      bcrypt
        .hash(newPassword, 10)
        .then((hash) => {
          resetDb
            .findOneAndDelete({
              userId: result._id,
            })
            .then(() => {
              resetDb
                .create({
                  userId: result._id,
                  newPassword: hash,
                  expires: new Date(),
                })
                .then((item) => {
                  if (!item)
                    res.json(
                      JSON.stringify({
                        success: false,
                        err: "Failed to create a new password.",
                      })
                    );
                  const nodemailer = require("nodemailer");
                  const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                      user: "easy.learning.noreply@gmail.com",
                      pass: "2yectrgL",
                    },
                  });
                  const mailOptions = {
                    from: "easy.learning.noreply@gmail.com",
                    to: result.email,
                    subject: "Easy Learning login datas",
                    text: `Hi, ${result.username},\n\nThis message was sent because someone asked for the login datas for this email addres on Easy Learning site.\n\nLogin datas:\n\tUsername: ${result.username}\n\tPassword: ${newPassword}\n\nThis password will expire in 10 minutes.\n\nRegards,\nEasy Learning Team`,
                  };
                  transporter.sendMail(mailOptions, function (err, info) {
                    if (err) {
                      res.json(
                        JSON.stringify({
                          success: false,
                          err: err.message,
                        })
                      );
                    } else {
                      res.json(
                        JSON.stringify({
                          success: true,
                          info: info.response,
                        })
                      );
                    }
                  });
                })
                .catch((err) => {
                  res.json(
                    JSON.stringify({ success: false, err: err.message })
                  );
                });
            });
        })
        .catch((err) =>
          res.json(
            JSON.stringify({
              success: false,
              err:
                "Registration failed on the server's side, please try again a few minutes later!",
            })
          )
        );
    }
  });
});

router.post("/update-password", (req, res, next) => {
  db.findOne({ _id: req.body.userId, username: req.body.username }).then(
    (result) => {
      console.log(result);
      if (result)
        bcrypt
          .compare(req.body.oldPassword, result.password)
          .then((value) => {
            if (value) {
              bcrypt
                .hash(req.body.newPassword, 10)
                .then((hash) => {
                  db.updateOne(
                    { _id: req.body.userId, username: req.body.username },
                    { password: hash }
                  ).then(() => {
                    db.findOne({
                      _id: req.body.userId,
                      username: req.body.username,
                    })
                      .then((result) => {
                        bcrypt
                          .compare(req.body.newPassword, result.password)
                          .then((value) => {
                            if (value)
                              res.json(JSON.stringify({ success: true }));
                            else
                              res.json(
                                JSON.stringify({
                                  success: false,
                                  err: "Update failed, please try again later!",
                                })
                              );
                          })
                          .catch((err) => {
                            res.json(
                              JSON.stringify({
                                success: false,
                                err: "Update failed, please try again later!",
                              })
                            );
                          });
                      })
                      .catch((err) =>
                        res.json(
                          JSON.stringify({ success: false, err: err.message })
                        )
                      );
                  });
                })
                .catch((err) =>
                  res.json(JSON.stringify({ success: false, err: err.message }))
                );
            } else {
              resetDb
                .findOne({ userId: req.body.userId })
                .then((resetResult) => {
                  if (resetResult)
                    bcrypt
                      .compare(req.body.oldPassword, resetResult.newPassword)
                      .then((value) => {
                        if (value)
                          bcrypt
                            .hash(req.body.newPassword, 10)
                            .then((hash) => {
                              db.updateOne(
                                {
                                  _id: req.body.userId,
                                  username: req.body.username,
                                },
                                { password: hash }
                              ).then(() => {
                                db.findOne({
                                  _id: req.body.userId,
                                  username: req.body.username,
                                })
                                  .then((result) => {
                                    bcrypt
                                      .compare(
                                        req.body.newPassword,
                                        result.password
                                      )
                                      .then((value) => {
                                        if (value)
                                          res.json(
                                            JSON.stringify({ success: true })
                                          );
                                        else
                                          res.json(
                                            JSON.stringify({
                                              success: false,
                                              err:
                                                "Update failed, please try again later!",
                                            })
                                          );
                                      })
                                      .catch((err) => {
                                        res.json(
                                          JSON.stringify({
                                            success: false,
                                            err:
                                              "Update failed, please try again later!",
                                          })
                                        );
                                      });
                                  })
                                  .catch((err) =>
                                    res.json(
                                      JSON.stringify({
                                        success: false,
                                        err: err.message,
                                      })
                                    )
                                  );
                              });
                            })
                            .catch((err) =>
                              res.json(
                                JSON.stringify({
                                  success: false,
                                  err: err.message,
                                })
                              )
                            );
                        else
                          res.json(
                            JSON.stringify({
                              success: false,
                              err: "Invalid old or temporary password!",
                            })
                          );
                      });
                  else
                    res.json(
                      JSON.stringify({
                        success: false,
                        err: "Invalid old password!",
                      })
                    );
                });
            }
          })
          .catch((err) =>
            res.json(JSON.stringify({ success: false, err: err.message }))
          );
      else
        res.json(
          JSON.stringify({
            success: false,
            err: "User was not found in the database!",
          })
        );
    }
  );
});

module.exports = router;
