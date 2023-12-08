import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../db/userSchema.js';
import localStorage from 'localStorage';
import Order from '../db/orderSchema.js';
import Querry from '../db/queerySchema.js';
const router = express.Router ();
import EmailNotification from '../db/subscriptionModel.js';
//USER LOGIN ROUTE
router.post ('/api/register', async (req, res) => {
  // objects destructuring for getting the data from the request body
  console.log (req.body);
  const {email, password, cpassword, cartProducts} = req.body;
  try {
    if (!email || !password || !cpassword) {
      return res.status (422).json ({error: 'Please fill all the fields'});
    } else if (password !== cpassword) {
      return res.status (422).json ({error: 'Passwords do not match'});
    }
    // checking if the user already exists
    const userExists = await User.findOne ({email: email});
    // checking if the phone already exists
    // const phoneExists = await User.findOne ({phone: phone});
    // if user exists then return error
    if (userExists) {
      return res.status (422).json ({error: 'Email already exists'});
    } else {
      // if user does not exist then create a new user

      // cc=cc?JSON.parse(cc):[]
      const user = new User ({
        email,
        password,
        cpassword,
        Cart: [cartProducts],
      });
      // saving the user to the database
      await user.save ();
      console.log (user);
      res.status (201).json ({message: 'User registered successfully'});
    }
  } catch (err) {
    // if any error occurs then catch the error
    console.log (err);
  }
});

//USER LOGIN ROUTE
router.post ('/api/login', async (req, res) => {
  // objects destructuring for getting the data from the request body

  try {
    const {email, password, cartProducts} = req.body;
    // checking if the user exists or not
    const emailExists = await User.findOne ({email: email});
    // if user does not exist then return error
    if (!emailExists) {
      return res.status (400).json ({error: 'Invalid Credentials'});
    } else {
      const pMatch = await bcrypt.compare (password, emailExists.password);
      if (pMatch) {
        const token = await emailExists.generateAuthToken ();
        // setting the token in the cookie
        // emailExists.Cart = !!localStorage.getItem ('cartProducts')
        // let bb= JSON.parse (localStorage.getItem ('cartProducts'))
        // emailExists.Cart.push (bb)
        res.cookie ('jwtoken', token, {
          expires: new Date (Date.now () + 25892000000),
          httpOnly: true,
        });
        // sending the response that user logged in successfully
        localStorage.setItem ('cartProducts', JSON.stringify (cartProducts));
        console.log ('sss', req.token);
        // cc.push(cartProducts)

        return res.status (200).json ({message: 'User logged in successfully'});
      }
    }
  } catch (error) {
    // if any error occurs then catch the error
    console.log (error);
  }
});
//USER LOGOUT ROUTE
router.get ('/api/logout', async (req, res) => {
  // clearing the cookie

  // res.status(202).clearCookie('auth-token').send('cookie cleared')

  res.clearCookie ('jwtoken', {path: '/'});
  res.status (200).send ({message: 'User logged out successfully'});

  // sending the response that user logged out successfully
});

router.post ('/api/address', async (req, res) => {
  const aaaa = [];
  const {
    firstname,
    lastname,
    email,
    phone,
    streetAddress,
    city,
    postalCode,
    country,
    state,
    cartProducts,
  } = req.body;

  //getting the user id from the request
  // const userID = req.user._id;
  // console.log (userID);

  try {
    if (
      !firstname ||
      !lastname ||
      !email ||
      !phone ||
      !streetAddress ||
      !city ||
      !postalCode ||
      !country ||
      !state
    ) {
      return res.status (422).json ({error: 'Please fill all the fields'});
    } else {
      // if user does not exist then create a new user
      // console.log (req.user._id)

      for (let i = 0; i < cartProducts.length; i++) {
        aaaa.push ({
          Name: cartProducts[i].title,
          quantity: cartProducts[i].quantity,
          price: cartProducts[i].price,
        });
      }
      
      const order = new Order ({
        // user: req.user._id,
        shippingAddress: {
          firstname,
          lastname,
          email,
          phone,
          streetAddress,
          city,
          postalCode,
          country,
          state,
        },
        orderitems: aaaa,
      });

      // saving the user to the database
      await order.save ();

      res.status (201).json ({message: 'User registered successfully'});
    }
  } catch (err) {
    // if any error occurs then catch the error
    console.log (err);
  }
});

router.post ('/api/contact', async (req, res) => {
  const {name, email, phone, message} = req.body;

  try {
    const Message = new Querry ({
      name: name,
      email: email,
      phone: phone,
      message: message,
    });

    await Message.save ();

    res.status (201).json ({message: 'Message Sent successfully'});
  } catch (err) {
    console.log (err);
  }
});
router.post("/api/subscribe", async (req, res) => {
  const { email } = req.body;
  try {
    const Email = new EmailNotification({
      email: email,
    });
    await Email.save();
    res.status(201).json({ message: "Email Subscribed successfully" });
  } catch (err) {
    console.log(err);
  }
}
);

export default router;
