const bcrypt = require("bcrypt");
const { users } = require("../model");
const jwt = require('jsonwebtoken')

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


exports.handleLogin = async(req,res)=>{
  try {
  const {email,password} = req.body;
  if(!email||!password){
    return res.status(400).json({
      message:"Please provide email and password",
    });
  }

    const user = await users.findOne({where:{email:email}});
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }


  const isSame = bcrypt.compareSync(password,user.password)

  if(!isSame){

      return res.status(401).json({
      message:"Invalid email or password",
    });
  }

  const token = jwt.sign({id: user.id},'admin',{
      expiresIn:'30d'
    })
  res.cookie('jwtToken',token)
  return res.status(200).json({
    message: "Login successful",
  }); 
  

} catch (error){
  console.error(error);
  return res.status(500).json({
    message:"Server error",
  });
}



};
