const fs = require('fs/promises');
const path = require('path');
const { Router } = require('express');

const filePath = path.resolve(__dirname, '../data/products.json');
console.log(filePath);

Array.prototype.max = function() {
    return Math.max.apply(null, this);
};

const routeProducts = Router()


routeProducts.get('/', async (req, res) => {
	const fileData = await fs.readFile(filePath, 'utf-8');
	const products = JSON.parse(fileData);
	res.json({
		data: products,
	});
});

routeProducts.get('/:id', async (req, res) => {
	const id = req.params.id
	const fileData = await fs.readFile(filePath, 'utf-8');
	const products = JSON.parse(fileData);

	const indice = products.findIndex(unProducto => unProducto.id == id);

	if(indice < 0){
		return res.status(404).json({
			msg: "el producto no existe"
		})
	}

	res.json({
		msg: `devolviendo el producto con id ${id}`,
		data: products[indice]
	});
});


routeProducts.post('/', async (req, res) => {
	const data = req.body;
	console.log(req.body);

	const {title, price, thumbnail} = req.body;

	if(!title || !price || !thumbnail) {
		return res.status(400).json({
			msg: "Campos invalidos :( "
		})
	}


	const fileData = await fs.readFile(filePath, 'utf-8');
	const products = JSON.parse(fileData);

	console.log(products)

	if(products.length==0){
		id = 1
	}else{
		id = products.map((product) => product.id).max() + 1
	}

	const nuevoProducto = {
		id,
		title,
		price,
		thumbnail
	}
	products.push(nuevoProducto);

	await fs.writeFile(filePath, JSON.stringify(products, null, '\t'));

	res.json({
		msg: 'ok',
		data: nuevoProducto
	})
});

routeProducts.put('/:id', async (req, res) => {
	const id = req.params.id
	const fileData = await fs.readFile(filePath, 'utf-8');
	const products = JSON.parse(fileData);

	const indice = products.findIndex(unProducto => unProducto.id == id);

	if(indice < 0){
		return res.status(404).json({
			msg: "el producto no existe"
		})
	}

	const {title, price, thumbnail} = req.body;

	if(!title || !price || !thumbnail) {
		return res.status(400).json({
			msg: "Campos invalidos :( "
		})
	}


	const productoActualizado = {
		id: products[indice].id,
		title,
		price,
		thumbnail
	}

	products.splice(indice, 1, productoActualizado);

	await fs.writeFile(filePath, JSON.stringify(products, null, '\t'));

	//actualizar
	res.json({
		msg: `Modificando el producto con id ${id}`,
		data: productoActualizado,
	})
});

routeProducts.delete('/:id', async (req, res) => {
	const id = req.params.id;
	const fileData = await fs.readFile(filePath, 'utf-8');
	const products = JSON.parse(fileData);

	const indice = products.findIndex(unUsuario => unUsuario.id == id);

	if(indice < 0){
		return res.status(404).json({
			msg: "el producto no existe"
		})
	}

	products.splice(indice, 1);
	await fs.writeFile(filePath, JSON.stringify(products, null, '\t'));

	//borrar
	res.json({
		msg: `Borrando el producto con id ${id}`,
	})
})


module.exports = routeProducts;