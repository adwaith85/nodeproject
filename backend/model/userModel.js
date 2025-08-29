import mongoose from "mongoose";
import bcrypt from "bcrypt"

const UserSchema=new mongoose.Schema({
    name:String ,
    email:String,
    number:String,
    password:String    
})


UserSchema.pre('save',async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10); // generate salt
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
})

UserSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

 const Usermodel=mongoose.model("Users",UserSchema);

export default Usermodel