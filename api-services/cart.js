const productData = require("../product.data.json");
const postalData = require("../postalData.json");
const Shipping = require("./shipping");
const axios = require("axios");
const {CartWeight,shippingcharges,productsPrice}=require("../helpers/index")


//Here cartList holds the products added into the cart

let cartList = [];
exports.addToCart = async (req, res) => {
  let product_id = req.body.product_id;
  let quantity = req.body.quantity;
  let product_result = productData.find((each) => {
    if (each.product.id === parseInt(product_id)) {
      return each;
    }
  });

  if (product_result) {
    let cartItem = { ...product_result.product, quantity };
    cartList.push(cartItem);
    res.status(200).json({
      status: "success",
      message: "Item has been added to cart",
    });
  } else {
    res.status(400).json({
      status: "error",
      message: "Invalid product id",
    });
  }
};


exports.getCart = async (req,res) => {
  res.status(200).json({
    status: "success",
    message: "Items available in the cart",
    items: cartList,
  });
};


exports.emptyCartList = async (req, res) => {
  if (req.body.action == "empty_cart") {
    cartArr = [];
    res.status(200).json({
      status: "success",
      message: "All items have been removed from the cart",
    });
  }
};


exports.checkOutPrice = async (req, res) => {
  let postal_code = req.query.shipping_postal_code;

  //Invoking shipping api to get the distance based on postal_code from the dummy postalData.json
  let getDistance = await axios(
    `${req.protocol}://${req.get('host')}/warehouse/distance?postal_code=${postal_code}`
  );
  
  let distance = getDistance.data.distance_in_kilometers;
  if(cartList.length>=1){
    let cart_weight = CartWeight(cartList);
    let shipping_price = shippingcharges(distance, cart_weight);
    let products_price= productsPrice(cartList);
    let total_price = shipping_price.price + products_price;
    res.status(200).json({
      status: "success",
      message: `Total value of your shopping cart is : ${
        "$" + total_price.toFixed(2)
      }`,
    });
  }else{
    res.status(200).json({message:"Cart is Empty",status:"success"})
  }
};
