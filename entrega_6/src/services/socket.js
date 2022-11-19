const socketIO = require('socket.io')
// const {saveFile,readFile,validateBody} = require('../controllers/files')
// const { v4: uuidv4 } = require("uuid");
const moment = require('moment/moment');
const productController = require('../controller/products');
const messageController = require('../controller/messages');

let io;

const initWsServer = (server) =>{
    io = socketIO(server)

    io.on('connection', (socket) =>{
        console.log('Conexion Nueva')


        socket.on('addProduct', async (product) =>{
            await productController.save(product)
            all_products = await productController.getAll()
            io.emit('addTable', all_products[all_products.length-1])
        })

        socket.on('addMessage', async (message) =>{
            const newMessage  = {
                email: message.email,
                message: message.message,
                time: moment().format('h:mm a')
            }
            await messageController.save(newMessage)
            io.emit('showMessage', newMessage)
        })
    })
return io
}

module.exports = initWsServer