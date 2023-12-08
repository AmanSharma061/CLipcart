import mongoose, {mongo} from 'mongoose';

const orderSchema = new mongoose.Schema ({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'User',
  // },
  orderitems: [
    {
   
      Name: {type: String, required: true},

      price: {type: Number, required: true},
      quantity: {type: String, required: true},
    },
  ],
  shippingAddress: {
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    streetAddress: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    postalCode: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
});

const Order = mongoose.model ('Order', orderSchema);

export default Order;
