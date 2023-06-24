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

// READ a single home model
router.get("/read/:id", async (req, res) => {
  try {
    const home = await Home.findByPk(req.params.id);
    if (!home) {
      return res.status(404).send("Home not found");
    }
    res.json(home);
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

// UPDATE a home model
router.put("/update/:id", async (req, res) => {
  try {
    const updatedHome = await Home.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!updatedHome[0]) {
      return res.status(404).send("Home not found");
    }

    res.send({ valid: true, home: updatedHome });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error updating the home" });
  }
});

// DELETE a home model
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedHome = await Home.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedHome) {
      return res.status(404).send("Home not found");
    }

    res.send({ valid: true, message: "Home deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error deleting the home" });
  }
});

export default router;
