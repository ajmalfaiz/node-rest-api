const mongoose = require('mongoose');

const productSchemas = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type:String, required: true},
    price: { type:Number, required:true}
});

module.exports = mongoose.model('Product', productSchemas);