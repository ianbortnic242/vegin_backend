const express = require("express")
const fs = require("fs");


Array.prototype.max = function() {
    return Math.max.apply(null, this);
};


class Product {
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
        fs.promises.writeFile(this.path, JSON.stringify(data, null, '\t'))
    }

    async getById(id){

        const data = await this.getJson()
        const product = data.filter((product) => product.id==id)
        return product.length>0 ? product[0] : null
    }

    async updateByID(id, data){
        const products = await this.getJson()
        const index = products.findIndex((product) => product.id === id)

        if(index < 0){
            return 'El producto no existe'
        }

        products[index] = {
            id,
            thumbnail: data.thumbnail,
            price: data.price,
            title: data.title,
        }
        fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))

    }


    async deleteById(id){

        const data = await this.getJson()
        const filtered_data = data.filter((product) => product.id!=id)
        fs.promises.writeFile(this.path, JSON.stringify(filtered_data, null, '\t'))
    }

    async deleteAll(){
        const new_data = []
        fs.promises.writeFile(this.path, JSON.stringify(new_data, null, '\t'))
    }
}


const productController = new Product('./src/data/products.json');

export default productController

