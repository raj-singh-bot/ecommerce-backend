const User = require('../../model/userModel')
// const generateToken = require('../../config/generateToken')
const jwt = require("jsonwebtoken");

const adminRegister = (req, res) => {
    User.findOne({email: req.body.email}).exec((error, user) => {
        if(user){
            return res.status(400).json({
                message: 'Admin already registered'
            })
        }
    })

    const {email, password} = req.body
    const admin = new User({
        email,
        password,
        role: 'admin'
    })

    admin.save((error, data) => {
        if (error) {
          return res.status(400).json({
            message: "Something went wrong",
          });
        }

        if (data) {
          return res.status(201).json({
            message: "Admin created Successfully..!",
          });
        }
    });
}

const adminLogin = async(req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({error: 'Please fill all the fields'})
    }
    // try{

        const admin = await User.findOne({email})
        if(!admin){
            return res.status(400).json({error: 'invalid username'})
        }
        if(admin && (await admin.matchPassword(password)) && admin.role == 'admin'){
            const token = jwt.sign(
                { _id: admin._id, role: admin.role },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
              );
              const { _id, email, role,  } = admin;
            res.status(200).json({
                _id: _id,
                email: email,   
                role: role,
                token
            })
        }else{
            res.status(404).json({error: 'invalid password'})
        }
    // }catch(error){
    //     console.log(error,'idhars')
    //     res.status(404).json({error: error.message})
    // }
}
module.exports = {adminRegister, adminLogin}