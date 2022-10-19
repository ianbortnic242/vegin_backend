const fs = require("fs");
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




const main = async() =>{

    

    new_product = {
        title: "soya",
        price: 3000,
        thumbnail: "iwucb",
    }
    
    const productos = await new Contenedor('./data/data.json')
    all_products = await productos.getAll()
    console.log(all_products)
    console.log('-----')
    productos.save(new_product)
    all_products = await productos.getAll()
    console.log(all_products)
    console.log('-----')
    const product_by_id = await productos.getById(10)
    console.log(product_by_id)
    console.log('-----')
    await productos.deleteById(1)
    all_products = await productos.getAll()
    console.log(all_products)
    console.log('-----')
    await productos.deleteAll()
    all_products = await productos.getAll()
    console.log(all_products)
    console.log('-----')
}   

main()

