const bcrypt = require("bcrypt");
const { users } = require("../model");

exports.handleRegistration = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Please provide username, email and password"
    });
  }

  const existingUser = await users.findOne({
    where: { email }
  });

  if (existingUser) {
    return res.status(409).json({
      message: "Already registered email"
    });
  }

  await users.create({
    username,
    email,
    password: bcrypt.hashSync(password, 10)
  });

  return res.status(201).json({
    message: "Registration successful"
  });
};
