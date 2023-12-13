const mongoose = require('mongoose');

const catalogySchema = mongoose.Schema({
    name: {type:String},
},{timestamps: true});

const catalogyModel = mongoose.model('catalogy',catalogySchema);

module.exports = catalogyModel;