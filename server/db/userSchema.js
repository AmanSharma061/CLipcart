import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config ({path: './config.env'});

const userSchema = new mongoose.Schema ({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  Cart: [],
  tokens: [
    {
      token: {
        type: String,
        default: null,
      },
    },
  ],
});

userSchema.methods.generateAuthToken = async function () {
  let token = jwt.sign (
    {
      _id: this._id,
    },
    process.env.SECRET_KEY
  );

  this.tokens = this.tokens.concat ({token: token});
  await this.save ();
  return token;
};

userSchema.pre ('save', async function (next) {
  if (this.isModified ('password')) {
    this.password = await bcrypt.hash (this.password, 12);
    this.cpassword = await bcrypt.hash (this.cpassword, 12);
  }
  next ();
});

const User = mongoose.model ('USER', userSchema);

export default User;
