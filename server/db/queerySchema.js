import mongoose from 'mongoose';

const QuerrySchema = new mongoose.Schema ({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const Querry = mongoose.model ('Querry', QuerrySchema);

export default Querry;
