const {Schema , model} = require('mongoose')
const bcrypt = require('bcrypt');

const usersSchema = new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
},{
    timestamps:true
})

usersSchema.methods.encryptPassword = async function(password){
   const salt = await bcrypt.genSalt(10);
   return await bcrypt.hash(password, salt)
}

usersSchema.methods.comparePassword = async function(password){
  return await bcrypt.compare(password, this.password)
}

module.exports=model('User', usersSchema)