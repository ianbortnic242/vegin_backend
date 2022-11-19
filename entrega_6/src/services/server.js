const express = require('express');
const http = require('http')
const path = require('path');
const mainRouter = require('../routes/index');
const productController = require('../controller/products');
const messageController = require('../controller/messages');

/** INICIALIZACION API con EXPRESS */
const app = express();
const server = http.Server(app)

app.use(express.static('public'));

app.set('view engine', 'ejs');
const viewsPath = path.resolve(__dirname, '../views');
app.set('views', viewsPath);


app.get('/', async (req, res) => {

    const products = await productController.getAll()
    const messages = await messageController.getAll()
    res.render('index', { products, messages})
})

app.use(express.json());	//permite json
app.use(express.urlencoded({ extended: true }));  //permite form data

app.use('/api', mainRouter);

module.exports = server;