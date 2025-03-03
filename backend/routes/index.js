
const express = require('express')
const userSignUp = require('../controller/user/userSignUp')
const userSignIn = require('../controller/user/userSignin')
const userDetails = require('../controller/user/userDeatails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const UploadProduct = require('../controller/product/UploadProduct')
const getProduct = require('../controller/product/getProduct')

const getCategoryProduct = require('../controller/product/getCategoryProduct')
const getCatagoryWise = require('../controller/product/getCatagoryWise')
const getProductDetails = require('../controller/product/getProductDetails')
const addToCartController = require('../controller/user/addToCartController')
const countCartProdct = require('../controller/user/countCartProdct')
const cartViewProduct = require('../controller/user/cartViewProduct')
const updateCartProduct = require('../controller/user/updateCartProduct')
const deleteCartProduct = require('../controller/user/deleteCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')
const paymentController = require('../controller/order/paymentController')
const updateProductController = require('../controller/product/updateProductController')


const router = express.Router()


// user signup,in,userdetails,logout

router.post("/signup", userSignUp)
router.post("/signin", userSignIn)
router.get("/UserDetails", authToken, userDetails)
router.get("/userLogout", userLogout)

// adminpanel

router.get("/Allusers", authToken, allUsers)
router.post("/updateUser", authToken, updateUser)

// product
router.post("/uploadProduct", authToken, UploadProduct)
router.get("/get-Product", authToken, getProduct)
router.get("/get-Product-bycatagory", getCategoryProduct)
router.post("/updateProductController",authToken, updateProductController)
router.post("/category-product", getCatagoryWise)
router.post("/product-details", getProductDetails)
router.get("/search", searchProduct)
router.post("/filterProduct", filterProductController)

// Cart
router.post("/addtocart", authToken, addToCartController)
router.get("/countCartProduct", authToken, countCartProdct)
router.get("/view-card-product", authToken, cartViewProduct)
router.post("/update-cart-product", authToken, updateCartProduct)
router.post("/delete-cart-product", authToken, deleteCartProduct)

router.post("/create-paypal-order", authToken, paymentController)



module.exports = router  