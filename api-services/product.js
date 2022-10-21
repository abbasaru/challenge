const productsData = require("../product.data.json");

//Here productsData is a dummy data for testing purpose

exports.getProductById = async (req, res) => {
  let productId = req.params.id;
  let searchProduct = productsData.find((each) => {
    if (each.product.id === parseInt(productId)) {
      return each;
    }
  });

  if (searchProduct) {
    res.status(200).json(searchProduct);
  } else {
    res.status(400).json({
      status: "error",
      message: "Invalid product id.Valid product id range is 100 to 110.",
    });
  }
};
