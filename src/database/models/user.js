import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
  },
  {
    versionKey: false,
  },
);

const User = mongoose.model('users', UserSchema);

export default User;
