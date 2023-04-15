import {model, Schema} from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
},{
  timestamps: true,
  versionKey: false
})

userSchema.statics.encryptPassword = async (password) => {
  const salt =  await bcrypt.genSalt(10);
  const encryptPassword = await bcrypt.hash(password,salt)
  return encryptPassword
}

userSchema.statics.verifyPassword = async (password,encryptPassword) => {
  const verify = await bcrypt.compare(password,encryptPassword)
  return verify;
}

const userModel = model('User', userSchema);
export default userModel
