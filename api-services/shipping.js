const postalData=require("../postalData.json")

//Here we are using dummy postalData from the postalData.json for testing purpose
exports.calculateDistance=async(req,res)=>{
    let postal_code=(req.query.postal_code)
    let postal_code_exists = postalData.find((each) => {
      if (each.postal_code === parseInt(postal_code)) {
        return each;
      }
    });
  
    if (postal_code_exists) {
      res.status(200).json({
          status: "success",
          distance_in_kilometers:postal_code_exists.distance_in_kilometers
          });
    } else {
      res.status(400).json({
        status: "error",
        message: "Invalid postal code, valid ones are 465535 to 465545",
      });
    }
  }