import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  _id: { type: String, required: true },
});

const User = mongoose.model('users', UserSchema);

export default User;
