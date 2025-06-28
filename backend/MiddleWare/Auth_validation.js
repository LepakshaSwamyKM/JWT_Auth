const joi = require("joi");
const { Schema } = require("mongoose");

const Sign_upValidation = (req, res, next) => {
  const userSchema = joi.object({
    user: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(3).max(30).required(),
  });

  const { error } = userSchema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ message: "bad request", error: error.details[0].message });
  }
  next();
};
const LoginValidation = (req, res, next) => {
  const userSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(3).max(30).required(),
  });

  const { error } = userSchema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ message: "bad request", error: error.details[0].message });
  }
  next();
};

module.exports = { Sign_upValidation, LoginValidation };
