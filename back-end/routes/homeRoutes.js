import express from "express";
import Home from "../models/Home.js";

const router = express.Router();

// READ all home models
router.get("/read", async (req, res) => {
  try {
    const homes = await Home.findAll();
    res.json(homes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// CREATE a home model
router.post("/create", async (req, res) => {
  const address = req.body;

  try {
    const newHome = await Home.create({
      street: address.street,
      city: address.city,
      state: address.state,
      zipcode: address.zipcode,
    });

    res.send({ valid: true, home: newHome });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error saving the address" });
  }
});

export default router;
