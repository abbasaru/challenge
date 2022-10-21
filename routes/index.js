const express = require('express');
const router = express.Router();
const { CartService, ProductService,ShippingService} = require('../api-services')

//Getting product by id
router.get('/product/:id', ProductService.getProductById)

//This route calculates the distance based on postal_code
router.get(`/warehouse/distance`,ShippingService.calculateDistance)

//Adding product to cart
router.post(`/cart/item`,CartService.addToCart)

//This route gets cartList
router.get('/cart/items',CartService.getCart)

//For making cartList empty
router.post('/cart/items',CartService.emptyCartList)

//checkout value calculation
router.get('/cart/checkout-value',CartService.checkOutPrice)

module.exports = router; 