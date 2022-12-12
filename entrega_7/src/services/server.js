import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from "url"
import { sqLiteDb } from "../classes/sqLiteDb.js"
import { mySqlDb } from "../classes/mySqlDb.js"

/** INICIALIZACION API con EXPRESS */
const app = express();
const server = http.Server(app)

app.use(express.static('public'));

app.set('view engine', 'ejs');
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const viewsPath = path.resolve(__dirname, '../views');
app.set('views', viewsPath);


app.get('/', async (req, res) => {

    //  solo se corre una vez, pra crear las tablas
    // await sqLiteDb.createTables() 
    // await mySqlDb.createTables()

    const products = await mySqlDb.getAll()
    const messages = await sqLiteDb.getAll()
    console.log(products)
    res.render('index', { products, messages})
})

app.use(express.json());	//permite json
app.use(express.urlencoded({ extended: true }));  //permite form data


export default server