const express = require("express");
const app = express();
const Vehicle = require("./models/Vehicle")
const bcrypt = require("bcrypt")
const User = require("./models/Users")
const jwt = require("jsonwebtoken")

const verifyLogin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });
  try {

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}

app.get("/", (req, res) => {
  console.log("Request hit!");
  res.send("API is working");
});

app.listen(3001, "0.0.0.0", () => {
  console.log("Server running on port 3001");
});

const cors = require("cors");
app.use(cors());

app.use(express.json());

app.get('/api/vehicles', async (req, res) => {
  const vehicles = await Vehicle.find();
  res.json(vehicles);
})
app.post('/api/vehicles', async (req, res) => {
  const newVehicle = new Vehicle(req.body);
  await newVehicle.save();
  res.json(newVehicle);
})

app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered"
      })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role
    })
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.json({
      token,
      user: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      },
      message: "User registered successfully"
    })
  } catch (err) {
    return res.status(500).json({ message: "Server Error" })
  }
})

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password not matching" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: {
        name: user.name,
        role: user.role,
        email: user.email
      },
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


require("dotenv").config()
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo DB Connected"))
  .catch((err) => console.log(err))