const express = require('express');
const path = require('path');
const mainRouter = require('../routes/index');
const productController = require('../controller/products');

/** INICIALIZACION API con EXPRESS */
const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');
const viewsPath = path.resolve(__dirname, '../views');
app.set('views', viewsPath);


app.get('/', (req, res) => {
    res.render('index')
    
})


app.get('/products', (req, res) => {
    productController.getAll().then((products)=>{
        res.render('products', { products })
    })
})

app.use(express.json());	//permite json
app.use(express.urlencoded({ extended: true }));  //permite form data

app.use('/api', mainRouter);

module.exports = app;