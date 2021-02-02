const express = require('express');
const { query } = require('../db');
const router = express.Router();
const {Food} = require('../models');

router.get('/test', (req, res)=> res.send('FOOD: THIS IS TEST'));

router.post('/create', async (req, res)=>{
    try{
        const{name, cuisine, location} = req.body;
        let newFood = await Food.create({name, cuisine, location, userId: req.user.id});
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

router.get("/userfood", async (req, res)=>{
    try {
        let userFood = await Food.findAll({
            where: {userId: req.user.id},
            include: ['user', 'likes']
        })
        res.status(200).json({
            userFood: userFood,
            message: 'All My Food Retrieved'
        })
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/cuisine/:cuisine', async (req, res)=>{
    try {
        let foodByCuisine = await Food.findAll({
            where: {cuisine: req.params.cuisine},
            incluede: ['user']
        })
        res.status(200).json({
            foodByCuisine: foodByCuisine,
            message: `${req.params.cuisine} Food`
        })
    } catch (error) {
        res.status(500).json({
            error: error,
            message: 'no foods'
        })
    }
})

router.get("/allfood", async (req,res) =>{
    try {
        let allFood = await Food.findAll({
            include: ['user']
        })
        res.status(200).json({
            allFood: allFood,
            message: 'All Food Retrived'
        })
    } catch (error) {
        res.status(200).json({
            error: err,
            message: 'No Foods'
        })
    }
})

router.put('/:id', async (req, res) => {
    try {
        let editFood = await Food.findOne({
            where: {id: req.params.id}
        })
        if (editFood.userId === req.user.id) {
            let query = req.params.id
            await Food.update(req.body, {where: {id: query}})
                .then((foodUpdated) => {
                    Food.findOne({
                        where: {id: query}
                    }).then((updatedFood) => {
                        res.status(200).json({
                            updatedFood: updatedFood,
                            message: 'Food Updated Successfully!',
                            foodUpdated: foodUpdated
                        })
                    })
                })
        } else {
            res.status(500).json({
                error: 'You Do Not Have Permission!'
            })
        }
    } catch (error) {
        res.status(500).json({
            error: 'Nope!'
        })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let deleteFood = await Food.findOne({where: {id: req.params.id}})
    if(deleteFood.userId === req.user.id){
        await Food.destroy({
            where: {id: req.params.id}
        })
        res.status(200).json({
            message: 'Food Deleted!'
        })
    } else {
        res.status(500).json({
            error: 'You Do No Have Permission'
        })
    }
    } catch (error) {
        res.status(500).json({
            error: 'Could Not Delete'
        })
    }
})

module.exports = router;