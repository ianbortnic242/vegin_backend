import { v4 as uuidv4 } from "uuid";    
const fs = require("fs");


class Cart {
    constructor(path_cart, path_products){

        this.path_carts = path_cart
        this.path_products = path_products
    }
    async getJson(path){
        const data = await fs.promises.readFile(path, 'utf-8')
        return JSON.parse(data)
    }

    async createCart(){
        const carts = await this.getJson(this.path_carts)
        const new_cart = {
                id: uuidv4(),
                timestap: new Date().toLocaleString(),
                products: [

                ],
              };
        carts.push(new_cart)
        await fs.promises.writeFile(this.path_carts, JSON.stringify(carts, null, '\t'))
        return new_cart.id
        }

    async deleteCart(id){

        const carts = await this.getJson(this.path_carts)
        const index = carts.findIndex(
            (cart) => cart.id === id
        )
        if (index < 0) {
        throw "El carro no existe";
        }
        carts.splice(index, 1)

        fs.promises.writeFile(this.path_carts, JSON.stringify(carts, null, '\t'))
    }

    async productsByCartId(id){
        const carts = await this.getJson(this.path_carts)
        const index = carts.findIndex(
            (cart) => cart.id === id
        )
        if (index < 0) {
            throw "El carro no existe";
        }
        return carts[index].productos;

      }

    async addProductToCart(idCart, idProduct) {
        
        const carts = await this.getJson(this.path_carts)
        const products = await this.getJson(this.path_products)

        const indexCart = carts.findIndex(
          (cart) => cart.id === idCart
        ) 
        const indexProduct = products.findIndex(
          (product) => product.id === idProduct
        ) 
        if (indexCart < 0) {
          throw "El carrito no existe";
        }
        if (indexProduct < 0) {
          throw "El producto no existe";
        }
        
        carts[indexCart].products.push(products[indexProduct])
    
        fs.promises.writeFile(this.path_carts, JSON.stringify(carts, null, '\t'))
      }

    async deleteProductToCart(idCart, idProduct){
        const carts = await this.getJson(this.path_carts)
        const products = await this.getJson(this.path_products)

        const indexCart = carts.findIndex(
          (cart) => cart.id == idCart
        ) 

        const indexProduct = products.findIndex(
          (product) => product.id == idProduct
        ) 
        if (indexCart < 0) {
          throw "El carrito no existe";
        }

        if (indexProduct < 0) {
          throw "El producto no existe";
        }
        
        carts[indexCart].products.splice(products[indexProduct], 1)
    
        await fs.promises.writeFile(this.path_carts, JSON.stringify(carts, null, '\t'))
    
      }
}


const cartsPath = './src/data/carts.json'
const productsPath = './src/data/products.json'


const cartController = new Cart(cartsPath, productsPath);


export default cartController