const server=require("../index")
const delay=require('delay')
let chai=require("chai")
chai.should()
const chaiServer=require("chai-http")
chai.use(chaiServer)

//Testing Get Product by id route 
describe("Product by id API",()=>{
    describe("GET /product/:id",()=>{
        let id=105
        it("should written a product with specified id",(done)=>{
            chai.request(server)
            .get('/product/'+id)
            .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a("object");
                response.body.should.have.property('product').property("name").eq("Product no 105")
                done();
            })
        });

        it("should should not written a product with specified id",(done)=>{
            let id=12
            chai.request(server)
            .get('/product/'+id)
            .end((err,response)=>{
                response.should.have.status(400);
                response.body.should.be.a("object");
                response.body.should.have.property('status').eq("error");
                response.body.should.have.property("message").eq("Invalid product id.Valid product id range is 100 to 110.")
                done();
            })
        });
    })
})

//Testing Get cart route 
describe("Cart API",()=>{
    describe("GET /cart/items",()=>{
        it("should written cart", ()=>{
            chai.request(server)
            .get('/cart/items')
            .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a("object");
                response.body.should.have.property('message').eq("Items available in the cart");
                response.body.should.have.property('items');
                delay();
            })
        });
    })
})

//Testing the clear cart route
describe("Cart API",()=>{
    describe("POST /cart/items",()=>{
        let data={action: "empty_cart"}
        it("should clear cart", (done)=>{
            chai.request(server)
            .post('/cart/items')
            .send(data)
            .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a("object");
                response.body.should.have.property('message').eq("All items have been removed from the cart");
                 done();
            })
        });
    })
})

//Testing the check value
describe("Checkout API",()=>{
    describe("GET /cart/checkout-value",()=>{
        it("should written check out value",(done)=>{
            let postal_code=465535
            chai.request(server)
            .get(`/cart/checkout-value?shipping_postal_code=${postal_code}`)
            .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a("object");
                response.body.should.have.property('status').eq("success")
                done();
            })
        });

        it("should written empty cart",(done)=>{
            let postal_code=465535
            chai.request(server)
            .get(`/cart/checkout-value?shipping_postal_code=${postal_code}`)
            .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a("object");
                response.body.should.have.property("message").eq("Cart is Empty")
                done();
            })
        });
    })
})
