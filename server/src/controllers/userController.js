// controllers/userController.js
const users = []; // Array to store user data

// Function to get all users
export const getAllUsers = (req, res) => {
  res.json(users); // Send all users as JSON response
};

// Function to create a new user
// Function to create a new user
export const createUser = (req, res) => {
  const {
    username,
    studentId,
    department,
    phone,
    address,
    email,
    password,
    userType,
  } = req.body;
  if (!email || !password || !username) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newUser = {
    id: Date.now().toString(),
    username,
    studentId,
    department,
    phone,
    address,
    email,
    password,
    userType: userType || "user",
  };

  users.push(newUser);
  res
    .status(201)
    .json({ message: "User registered successfully", user: newUser });
};

export const getUserById = (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
};
