const express = require('express')
const router = express.Router()
const Ice_model = require('../models/ice_model')

//fetch all ice creams
router.get('/', async (req,res) => {
    try {
        const ice = await Ice_model.find()
        res.json(ice)
    } catch(err) {
        res.status(500).json({ message: err.message})
    }
})

//fetch by search
router.get('/d=:double', async (req,res) => {
    try {
        const doubleSearch = req.params.double
        const ice = await Ice_model.find({ $or: [{ brand: { $regex: doubleSearch, $options: 'i' } }, { flavour: {$regex: doubleSearch, $options: 'i' }}] })
        res.json(ice)
        
    } catch(err) {
        res.status(500).json({ message: err.message})
    }
})


//fetch my ranking
router.get('/myrank', async (req,res) => {
    try {
        const ice = await Ice_model.find().sort({ result: -1 })
        res.json(ice)

    } catch(err) {
        res.status(500).json({ message: err.message})
    }
})

//fetch only vegan
router.get('/vegan', async (req,res) => {
    try {
        const ice = await Ice_model.find({ isVegan:true })
        res.json(ice)
    } catch(err) {
        res.status(500).json({ message: err.message})
    }
})

//create one
router.post('/', async (req,res) => {
    const ice = new Ice_model({
        brand : req.body.brand,
        flavour : req.body.flavour,
        description : req.body.description,
        result : req.body.result,
        review : req.body.review,
        isVegan : req.body.isVegan,
        image : req.body.image
    })
    try {
        const newIceModel = await ice.save()
        res.status(201).json(newIceModel)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

module.exports = router