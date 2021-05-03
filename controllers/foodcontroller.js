const express = require("express");
const router = express.Router();
const { Food } = require("../models");
const validateSession = require("../middleware/validateSession");

router.get("/test", (req, res) => res.send("FOOD: THIS IS TEST"));

router.post("/create", validateSession, async (req, res) => {
  if (req.user.role === "user" || req.user.role === "admin") {
    try {
      const {
        name,
        cuisine,
        location,
        city,
        state,
        phone,
        website,
        menu,
        priceRange,
      } = req.body;
      let newFood = await Food.create({
        name,
        cuisine,
        location,
        city,
        state,
        phone,
        website,
        menu,
        priceRange,
      });
      res.status(200).json({
        food: newFood,
        message: "Food Created!",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Food Creation Failed.",
      });
    }
  } else {
    res.status(500).json({
      message: "You Do Not Have Permission",
    });
  }
});

router.get("/name/:name", async (req, res) => {
  try {
    let foodByName = await Food.findAll({
      where: { name: req.params.name },
      include: ["likes"],
    });
    res.status(200).json({
      foodByName: foodByName,
      message: "yumm",
    });
  } catch (error) {
    res.status(500).json({
      error: error,
      message: "something went wrong",
    });
  }
});

router.get("/cuisine/:cuisine", async (req, res) => {
  try {
    let foodByCuisine = await Food.findAll({
      where: { cuisine: req.params.cuisine },
      include: ["likes"],
    });
    res.status(200).json({
      foodByCuisine: foodByCuisine,
      message: `${req.params.cuisine} Food`,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
      message: "something went wrong",
    });
  }
});

router.get("/city/:city", async (req, res) => {
  try {
    let foodByCity = await Food.findAll({
      where: { city: req.params.city },
      incluede: ["likes"],
    });
    res.status(200).json({
      foodByCity: foodByCity,
      message: `Restaurants in ${req.params.city}`,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
      message: "something went wrong",
    });
  }
});

router.get("/allfood", async (req, res) => {
  try {
    let allFood = await Food.findAll({
      include: ["likes"],
    });
    res.status(200).json({
      allFood: allFood,
      message: "All Food Retrived",
    });
  } catch (error) {
    res.status(200).json({
      error: error,
      message: "Something went wrong",
    });
  }
});

module.exports = router;
