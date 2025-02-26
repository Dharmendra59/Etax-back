import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
      name: {
            type: String,
            required: true,
      },
      email: {
            type: String,
            required: true,
            unique: true,
      },
      password: {
            type: String,
            required: true,
      },
      role: {
            default: "user",
            type: String,
      }

});

const UserModel = mongoose.model('users', UserSchema);
export default UserModel;