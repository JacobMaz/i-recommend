const express = require('express');
const router = express.Router();
const {Food} = require('../models');

router.get('/test', (req, res)=> res.send('FOOD: THIS IS TEST'));

router.post('/create', async (req, res)=>{
    try{
        const{name, foodOne, foodTwo, foodThree, foodFour, foodFive} = req.body;
        let newFood = await Food.create({name, foodOne, foodTwo, foodThree, foodFour, foodFive, username: req.user.username, owner_id: req.user.id});
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
    let userID = req.user.id
    Food.findAll({
        where: {owner_id: userID}
    })
    .then(food => res.status(200).json({
        food: food,
        message: "All my Food Retrived"
    }))
    .catch(err => res.status(500).json({error: err}))
})

router.get("/userfood/:username", (req,res)=>{
    let username = req.params.username
    Food.findAll({
        where: {username: username}
    })
    .then(food => res.status(200).json({
        food: food,
        message: `${username}'s Food Retrived`
    }))
    .catch(err => res.status(500).json({
        error: err,
        message: "no food"
    }))
})

router.get("/allfood", (req,res) =>{
    Food.findAll()
        .then(food =>res.status(200).json({
            food: food,
            message: 'All Food Retrived',
        }))
        .catch(err => res.status(500).json({error: err}))
})

module.exports = router;