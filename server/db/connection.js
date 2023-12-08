import mongoose from 'mongoose';
import dotenv from 'dotenv'; // dotenv is a package that allows us to use environment variables
dotenv.config ({path: './config.env'}); // This will allow us to use environment variables from config.env file

const connect = async () => {
  try {
    await mongoose.connect (process.env.DATABASE);
    console.log ('Database connected successfully');
  } catch (error) {
    console.log ("yh error hai",error);
  }
};

export default connect;
