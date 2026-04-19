const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// connect to MongoDB
mongoose.connect("mongodb://mongodb-service:27017/mydb")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// schema
const ItemSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model("Item", ItemSchema);

// routes
app.get("/api", (req, res) => {
  // simulate CPU work
  let total = 0;
  for (let i = 0; i < 1e7; i++) {
    total += i;
  }

  res.json({ message: "Heavy response 🚀", total });
});

// save data
app.post("/api/items", async (req, res) => {
  const item = new Item({ name: req.body.name });
  await item.save();
  res.json(item);
});

// get data
app.get("/api/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});