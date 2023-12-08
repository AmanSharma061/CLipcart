import mongoose from 'mongoose';

const EmailNotificationSchema = new mongoose.Schema ({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const EmailNotification = mongoose.model (
  'EmailNotification',
  EmailNotificationSchema
);

export default EmailNotification;
