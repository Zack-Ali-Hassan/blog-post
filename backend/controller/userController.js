import User from "../models/user_model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const registerUsers = async (req, res) => {
  try { 
    const { username, email, password } = req.body;
    
    const userExist = await User.findOne({
      $or :[
        { username },
        { email }
      ]
    });
    if (userExist) {
      if(userExist.username == username.toLowerCase()){
        return res.status(400).send({ status: false, message: "Username already exists..." });
      }
      if(userExist.email == email.toLowerCase()){
        return res.status(400).send({ status: false, message: "Email already exists..." });
      }
    }
    const hashedPassword =await bcrypt.hash(password,10);
    const user = new User({ username: username.toLowerCase(), email: email.toLowerCase(), password:hashedPassword });
    await user.save();
    res.status(201).send( {username : user.username, email : user.email} );
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, message: "Unknow error" });
  }
};
export const loginUser = async (req, res) => {
  try { 
    const { username, password } = req.body;
    
    const userExist = await User.findOne({ username: username.toLowerCase() });
    if (!userExist) {
      return res.status(400).json( "Invalid Username or Password.." );
    }
    const validPassword =await bcrypt.compare(password,userExist.password);
    if (!validPassword) {
      return res.status(400).json( "Invalid Username or Password.." );
    }
    const jwt_secret = "abdh3jdkakjdeid";
    const token =jwt.sign({_id:userExist._id}, jwt_secret);
    res.cookie('token', token, {
      httpOnly:true,
      secure:false,
      maxAge : 10 * 24 * 60 * 60 * 1000
    });

    userExist.password =undefined;
    res.status(200).send(userExist);
  } catch (error) {
    console.log(error);
    res.status(500).json( "Unknow error" );
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.password =undefined;
    res.status(200).json(user)
  } catch (error) {
    console.log("Error get user profile : " + error);
    res.status(500).json("Unknown error")
  }
}

export const logout =async(req, res)=>{
  try {
    res.clearCookie("token");
    res.status(201).send("deleted cookie")
  } catch (error) {
    console.log("Error logout: " + error);
    res.status(400).send(error);
  }
}