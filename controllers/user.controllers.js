const User = require('../models/user.model');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const user = new User(req?.body);
    await user.save();
    res.status(201).send({ code: 201, data: user, message: "User created successfully" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send({ code: 400, message: "Email already exists" });
    }
    return res.status(500).send({ code: 500, message: error.message, data: null });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).send({ data: users, message: "Users fetched successfully" });
  } catch (error) {
    return res.status(500).send({ code: 500, message: error.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req?.params?.id);
    if (!user) {
      return res.status(404).send({ code: 404, message: "User not found" });
    }
    return res.status(200).send({ data: user, message: "User fetched successfully" });
  } catch (error) {
    return res.status(500).send({ code: 500, message: error.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    // First check if the user exists
    const existingUser = await User.findById(req?.params?.id);
    if (!existingUser) {
      return res.status(404).send({ code: 404, message: "User not found" });
    }
    // Only check for email uniqueness if email is being updated and it's different from current email
    if (req?.body?.email && req?.body?.email !== existingUser?.email) {
      const emailExists = await User.findOne({
        email: req?.body?.email,
        _id: { $ne: req?.params?.id }
      });

      if (emailExists) {
        return res.status(400).send({ code: 400, message: "Email already exists" });
      }
    }
    // Update user data
    const updatedUser = await User.findByIdAndUpdate(
      req?.params?.id,
      req?.body,
      { new: true, runValidators: true }
    );

    return res.status(200).send({
      data: updatedUser,
      message: "User updated successfully"
    });

  } catch (error) {
    return res.status(500).send({
      code: 500,
      message: error.message
    });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ code: 404, message: "User not found" });
    }
    return res.status(200).send({ data: user, message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).send({ code: 500, message: error.message });
  }
};
