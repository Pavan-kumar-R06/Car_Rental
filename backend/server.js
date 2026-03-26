const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const User = require("./models/User");
const Car = require("./models/Car");
const Rental = require("./models/Rental");
const app = express();
const port = process.env.PORT || 5000;



require('dotenv').config();

// ✅ This logic checks the .env first, then uses a default if .env fails
const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/car_rental";

mongoose.connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

 // No more hardcoded string!

// ================== MIDDLEWARE ==================
app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(express.json());


// ================== SESSION ==================
let sessions = {};

// ================== AUTH ==================

// REGISTER
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res.json({ success: false, error: "User already exists" });
    }

    const newUser = await User.create({ name, email, password });

    const sessionId = Math.random().toString(36).substring(7);
    sessions[sessionId] = newUser;

    res.json({ success: true, sessionId, user: newUser });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ success: false, error: "User not found" });
  }

  if (user.password !== password) {
    return res.status(401).json({ success: false, error: "Wrong password" });
  }

  const sessionId = Math.random().toString(36).substring(7);

  sessions[sessionId] = user;

  res.json({ success: true, sessionId, user });
});

// GET CURRENT USER
app.get("/api/user", async (req, res) => {
  const sessionId = req.headers.authorization?.replace("Bearer ", "");
  const sessionUser = sessions[sessionId];

  if (!sessionUser) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const user = await User.findById(sessionUser._id);
  res.json({ user });
});

// ================== USER ADMIN ==================

app.get("/api/admin/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.delete("/api/admin/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// ================== CARS ==================

// GET ALL CARS
app.get("/api/cars", async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
});

// GET SINGLE CAR
app.get('/api/cars/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const mongoose = require("mongoose"); // ✅ ADD THIS

    // ✅ FIX: use mongoose instead of ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const car = await Car.findById(id);

    if (car) {
      res.json(car);
    } else {
      res.status(404).json({ error: "Car not found in MongoDB" });
    }
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});
// ADD CAR
app.post("/api/cars", async (req, res) => {
  const car = await Car.create(req.body);
  res.json({ success: true, car });
});

// UPDATE CAR


// DELETE CAR

// ================== BOOKINGS ==================

// CREATE BOOKING
app.post("/api/bookings", async (req, res) => {
  const rental = await Rental.create(req.body);
  res.json({ success: true, rental });
});

// ADMIN VIEW BOOKINGS
app.get("/api/admin/rentals", async (req, res) => {
  const rentals = await Rental.find();
  res.json(rentals);
});


// --- ✏️ UPDATE CAR DATA (PUT) ---

// --- ✏️ UPDATE CAR DATA (MONGODB VERSION) ---
app.put('/api/cars/:id', async (req, res) => {
  const { id } = req.params;
  const { name, brand, category, price, image, available, seats, transmission, fuel } = req.body;

  try {
    // 1. Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    // 2. Update in MongoDB
    const updatedCar = await Car.findByIdAndUpdate(
      id,
      { 
        name, 
        brand, 
        category, 
        price: Number(price), 
        image,
        available,
        seats: Number(seats),
        transmission,
        fuel
      },
      { new: true } // This returns the updated document instead of the old one
    );

    if (updatedCar) {
      console.log(`✅ MongoDB: Vehicle ${id} updated successfully`);
      res.json({ success: true, car: updatedCar });
    } else {
      res.status(404).json({ error: "Vehicle not found in database" });
    }
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ error: "Failed to update vehicle in MongoDB" });
  }
});

// --- 👤 UPDATE USER PROFILE ---
app.put("/api/user/update", async (req, res) => {
  // Check both the body and the params just in case
  const id = req.body.id || req.params.id; 
  const { name, email } = req.body;

  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      console.log("❌ Received Invalid ID:", id); // This will show in your VS Code terminal
      return res.status(400).json({ error: "Invalid User ID" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    ).select("-password"); // Don't send the password back to the frontend!

    res.json({ success: true, user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.put("/api/user/change-password", async (req, res) => {
  const { id, currentPassword, newPassword } = req.body;

  const mongoose = require("mongoose");

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.json({ success: false, error: "Invalid User ID" });
  }

  // ✅ renamed variable
  const existingUser = await User.findById(id);

  if (!existingUser) {
    return res.json({ success: false, error: "User not found" });
  }

  if (existingUser.password !== currentPassword) {
    return res.json({ success: false, error: "Incorrect current password" });
  }

  existingUser.password = newPassword;
  await existingUser.save();

  res.json({ success: true });
});

// --- 🗑️ DELETE CAR DATA (DELETE) ---
app.delete('/api/cars/:id', (req, res) => {
  const { id } = req.params;
  try {
    const carsPath = path.join(__dirname, 'data', 'cars.json');
    let cars = JSON.parse(fs.readFileSync(carsPath, 'utf8'));
    
    const filteredCars = cars.filter(c => String(c.id) !== String(id));
    
    if (cars.length === filteredCars.length) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    fs.writeFileSync(carsPath, JSON.stringify(filteredCars, null, 2));
    console.log(`🗑️ Vehicle ${id} removed from fleet`);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete vehicle" });
  }
});
// ================== STATIC ROUTES ==================

const pages = ['/', '/cars', '/about', '/contact', '/login', '/signup', '/dashboard', '/admin'];

pages.forEach(route => {
  app.get(route, (req, res) => {
    const fileName = route === '/' ? 'index.html' : `${route.substring(1)}.html`;
    res.sendFile(path.join(__dirname, 'public', fileName));
  });
});

app.get('/cars/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'car-detail.html'));
});

// ================== START SERVER ==================
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});