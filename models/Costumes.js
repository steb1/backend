const mongoose = require('mongoose');

const CostumeSchema = new mongoose.Schema({
    ArticleName : {
        type : String,
        required : true
    },
    DateAjout : {
        type : Date,
        required : false,
        Default : Date.now,
    },
    Stock : {
        type : Number,
        required : true,
        default : 3

    },
    Prix : {
        type : Number,
        required : true
    },

    Date : {
        type : Date,
        required : true,
        default : Date.now
    }
    

})

module.exports = new mongoose.model('Costume', CostumeSchema);
