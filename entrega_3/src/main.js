const express = require("express")
const fs = require("fs");


const app = express()

Array.prototype.max = function() {
    return Math.max.apply(null, this);
};


class Contenedor{
    constructor(path){
        this.path = path
    }

    async getJson(){
        const data = await fs.promises.readFile(this.path, 'utf-8')
        return JSON.parse(data)
    }

    async getAll(){
        const products = await this.getJson()
        return products
    }


    async save(product){
        const data = await this.getJson()
        let new_id
        if(data.length==0){
            new_id = 1
        }else{
            new_id = data.map((product) => product.id).max() + 1
        }
        product.id = new_id
        data.push(product)
        fs.promises.writeFile(this.path, JSON.stringify(data))
    }

    async getById(id){

        const data = await this.getJson()
        const product = data.filter((product) => product.id==id)
        return product.length>0 ? product[0] : null
    }


    async deleteById(id){

        const data = await this.getJson()
        const filtered_data = data.filter((product) => product.id!=id)
        fs.promises.writeFile(this.path, JSON.stringify(filtered_data))
    }

    async deleteAll(){
        const new_data = []
        fs.promises.writeFile(this.path, JSON.stringify(new_data))
    }
}


const productos = new Contenedor('./src/data/data.json');


const server = app.listen(8080, () => {
    console.log('server listening')
})


app.get('/', (req, res) => {
    res.send('anda a /productos si quieres ver los productos, and a /productoRandom si quieres un productos random')

})

app.get('/productos', (req, res) => {
    productos.getAll().then((products)=>{
        res.send({products})
    })
})

app.get('/productoRandom', (req, res) => {
    productos.getAll().then((products)=>{
        const random_product = products[Math.floor(Math.random()*products.length)]
        res.send({random_product})
    })
})
