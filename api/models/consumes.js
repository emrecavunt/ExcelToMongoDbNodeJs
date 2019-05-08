const mongoose = require('mongoose');

const consumerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    food : { type:mongoose.Schema.Types.ObjectId,ref:'Food'},
    healthPoint:String,
    karbonhidrat:{type:Number,default:0},
    protein:{type:Number,default:0},
    fat:{type:Number,default:0},//Yağ
    lif:{type:Number,default:0},
    kolestrol:{type:Number,default:0},
    sodyum:{type:Number,},
    potasyum:{type:Number,default:0},
    kalsiyum:{type:Number,default:0},
    vitaminA:{type:Number,default:0},
    vitaminB:{type:Number,default:0},
    demir:{type:Number,default:0},
});

module.exports = mongoose.model('Consumer',consumerSchema);