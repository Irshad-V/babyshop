const mongoose = require('mongoose')

const addToCart = mongoose.Schema({
   productId : {
        ref : 'product',
        type : String,
   },
   quantity : Number,
   userId : String, 
},{
    timestamps : true
})
 

const CartModel = mongoose.model("addToCart",addToCart)

module.exports = CartModel