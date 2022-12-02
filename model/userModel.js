const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type: String,
        enum: ["user", "admin", "super-admin"],
        default: "user",
      },
},{
    timestamps: true
})
userSchema.methods.matchPassword= async function(enteredPass) {
    return await bcrypt.compare(enteredPass, this.password)
}
userSchema.pre('save', async function(next){
    if(!this.isModified){
        next()
    }
    const salt =  await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})
const User = mongoose.model('User', userSchema)
module.exports = User