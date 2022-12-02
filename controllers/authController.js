const User = require('../model/userModel')
const bcrypt = require('bcryptjs')
const generateToken = require('../config/generateToken')

const registerUser = async(req, res) => {
    const {email, password} = req.body
    try {
        const userExist = await User.findOne({email})
        if(userExist){
            return res.status(404).json({msg: 'User already exist'})
        }
        if(!email || !password){
            return res.status(404).json({msg: 'please fill all the fields'})
        }
       
        const user = await User.create({
            email, password
        })

        res.json(user)
    } catch (error) {
        // console.log(error)
        res.status(500).json({error : error.message })
    }
}  

const loginUser = async(req, res) => {
    const {email , password} = req.body;
    if(!email || !password){
        return res.status(404).json({msg: 'please fill all the fields'})
    }

    const user = await User.findOne({email})
    try{
        if(user && (await user.matchPassword(password))){

            res.status(200).json({
                _id: user._id,
                token: generateToken(user._id)
            })
        }
}
catch(error){
    console.log(error)
    res.status(404).json({error: error.message})
}
}

module.exports = {registerUser, loginUser}