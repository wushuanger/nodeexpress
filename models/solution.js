let mongoose = require('mongoose');

//Solution Schema
let solutionSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    client: {
        type: String,
        required: false
    },

    skill: { 
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
});

let Solution = module.exports = mongoose.model('solution', solutionSchema);