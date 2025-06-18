import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      minlength: 6, // minimum length of password
      maxlength: 10, // maximum length of password
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }, // automatically manage createdAt and updatedAt fields
  }
);

// in case of mongodb we should not export the schema
// but the model(must be exported )

export default mongoose.model("User", userSchema);
