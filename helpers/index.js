const CartWeight=(cartList)=>{
    let totalWeight = 0;
    cartList.forEach((element) => {
      totalWeight = totalWeight + element.weight_in_grams;
    });
    return totalWeight / 1000;
  }
  
  const shippingcharges=(distance, cart_weight)=>{
    if (cart_weight >0 && cart_weight<2) {
      if (distance > 0 && distance < 5) {
        return { price: 12 };
      } else if (distance > 5 && distance < 20) {
        return { price: 15 };
      } else if (distance > 20 && distance < 50) {
        return { price: 20 };
      } else if (distance > 50 && distance < 500) {
        return { price: 50 };
      } else if (distance > 500 && distance < 800) {
        return { price: 100 };
      } else if (distance > 800) {
        return { price: 220 };
      }
    } else if (cart_weight > 2.01 && cart_weight <= 5) {
      if (distance > 0 && distance < 5) {
        return { price: 14 };
      } else if (distance > 5 && distance < 20) {
        return { price: 18 };
      } else if (distance > 20 && distance < 50) {
        return { price: 24 };
      } else if (distance > 50 && distance < 500) {
        return { price: 55 };
      } else if (distance > 500 && distance < 800) {
        return { price: 110 };
      } else if (distance > 800) {
        return { price: 250 };
      }
    } else if (cart_weight > 5.01 && cart_weight <= 20) {
      if (distance > 0 && distance < 5) {
        return { price: 16 };
      } else if (distance > 5 && distance < 20) {
        return { price: 25 };
      } else if (distance > 20 && distance < 50) {
        return { price: 30 };
      } else if (distance > 50 && distance < 500) {
        return { price: 80 };
      } else if (distance > 500 && distance < 800) {
        return { price: 130 };
      } else if (distance > 800) {
        return { price: 270 };
      }
    } else if (cart_weight > 20.1) {
      if (distance > 0 && distance < 5) {
        return { price: 21 };
      } else if (distance > 5 && distance < 20) {
        return { price: 30 };
      } else if (distance > 20 && distance < 50) {
        return { price: 50 };
      } else if (distance > 50 && distance < 500) {
        return { price: 90 };
      } else if (distance > 500 && distance < 800) {
        return { price: 150 };
      } else if (distance > 800) {
        return { price: 300 };
      }
    }
  }
  
  
  const discountPercentage=(num, per)=>{
    return (num / 100) * per;
  }
  
  const productsPrice=(cartList)=>{
    let All_products_price = 0;
    cartList.forEach((each) => {
      let discounted_price = discountPercentage(
        each.price * each.quantity,
        each.discount_percentage
      );
      All_products_price =
        All_products_price + (each.price * each.quantity - discounted_price);
    });
    return All_products_price;
  }

  module.exports={CartWeight,shippingcharges,productsPrice}