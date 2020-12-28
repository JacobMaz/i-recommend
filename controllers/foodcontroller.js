const express = require('express');
const router = express.Router();
const {Food} = require('../models');

router.get('/test', (req, res)=> res.send('FOOD: THIS IS TEST'));

router.post('/create', async (req, res)=>{
    try{
        const{name, location, foodOne, foodTwo, foodThree, foodFour, foodFive} = req.body;
        let newFood = await Food.create({name, location, foodOne, foodTwo, foodThree, foodFour, foodFive, username: req.user.username, userId: req.user.id});
        res.status(200).json({
            food: newFood,
            message: 'Food Created!'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Food Creation Failed.'
        })
    }
})

router.get("/ownerfood", (req, res)=>{
    try {
        let userID = req.user.id
    Food.findAll({
        where: {owner_id: userID}
    })
    res.status(200).json({
        food: food,
        message: "All my Food Retrived"
    })
    } catch (error) {
       res.status(500).json({error: err})
    }
})

router.get("/userfood/:username", (req,res)=>{
    try {
        let username = req.params.username
    Food.findAll({
        where: {username: username}
    })
    res.status(200).json({
        food: food,
        message: `${username}'s Food Retrived`
    })
    } catch (error) {
        res.status(500).json({
        error: err,
        message: "no food"
    })
    }
})

router.get("/allfood", (req,res) =>{
    try {
       Food.findAll()
        res.status(200).json({
            food: food,
            message: 'All Food Retrived',
        })
    } catch (error) {
       res.status(500).json({error: err})
    }
})

module.exports = router;