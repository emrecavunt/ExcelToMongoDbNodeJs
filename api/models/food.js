const mongoose = require('mongoose');

const foodSchema=mongoose.Schema({
    //_id:mongoose.Schema.Types.ObjectId,
    name:String,
    healthPoint:String,
    karbonhidrat:{type:Number},
    protein:{type:Number},
    fat:{type:Number},//Yağ
    lif:{type:Number},
    kolestrol:{type:Number},
    sodyum:{type:Number},
    potasyum:{type:Number},
    kalsiyum:{type:Number},
    vitaminA:{type:Number},
    vitaminB:{type:Number},
    demir:{type:Number},
});

module.exports = mongoose.model('Food',foodSchema);