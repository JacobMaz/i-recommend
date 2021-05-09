const express = require("express");
const router = express.Router();
const { Like } = require("../models");
const validateSession = require("../middleware/validateSession");

router.get("/test", (req, res) => res.send("LIKE: THIS IS TEST"));

router.post("/add", validateSession, async (req, res) => {
  if (req.user.role === "user" || req.user.role === "admin") {
    try {
      const { like, foodId } = req.body;
      let newLike = await Like.create({ like, userId: req.user.id, foodId });
      res.status(200).json({
        status: 'success',
        like: newLike,
        message: "Like Added!",
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: "Failed to add Like",
      });
    }
  } else {
      res.status(500).json({
          status: 'error',
          error: 'You Do Not Have Permission'
      })
  }
});

router.get('/userlikes', validateSession, async (req, res)=>{
  try {
    let userLikes = await Like.findAll({
      where: {userId: req.user.id},
      include: ['user', 'food']
    });
    res.status(200).json({
      userLikes: userLikes,
      message: `All of ${req.user.username}'s liked restaurants retrieved`
    });
  } catch (error) {
    res.status(500).json({error: error})
  }
})

router.get('/user/:userId', validateSession, async (req, res) => {
  if (req.user.role === 'user' || req.user.role === 'admin') {
    try {
      let userRec = await Like.findAll({
      where: { userId: req.params.userId},
      include: ['food', 'user']
    });
    res.status(200).json({
      userRec: userRec,
      message: `User's Recommendations Retrieved`
    })
    } catch (error) {
      res.status(500).json({
        error: error,
        message: 'something went wrong'
      })
    }
  }
})

router.delete('/:id', validateSession, async (req, res) => {
  let like = await Like.findOne({where: {id: req.params.id}});
  if (like.userId === req.user.id || req.user.role === 'admin'){
    try {
      await Like.destroy({
        where: {id: req.params.id}
      });
      res.status(200).json({
        status: 'success',
        message: 'Like Deleted',
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        error: 'Something went wrong'
      });
    }
  } else {
    res.status(500).json({
      status: 'error',
      error: 'You Do Not Have Permission'
    })
  }
})

module.exports = router;
