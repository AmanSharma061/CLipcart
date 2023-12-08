import express from 'express';
import connect from './db/connection.js';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './Routing/auth.js';
const app = express ();
const port = process.env.PORT || 3000;
app.use (cors ());
app.use (express.json ());
app.use (router);

connect ();
dotenv.config ({path: './config.env'});
app.listen (port, () => {
  console.log ('Server is listening on port 3000');
});
