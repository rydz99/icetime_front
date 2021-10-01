const mongoose = require('mongoose')

const iceSchema = new mongoose.Schema({
    brand: {
        type: String,
        require:true
    },
    flavour: {
        type: String,
        require:true
    },
    description: {
        type: String,
        require:true

    },
    result : {
        type: Number,
        require:true

    },
    review: {
        type: String,
        require:true
    },
    isVegan: {
        type: Boolean,
        require:true
,
    }, 
    image: {
        type: String,
        require:true
    }
})

module.exports = mongoose.model('Ice_model', iceSchema)