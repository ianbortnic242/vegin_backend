import {Server} from 'socket.io'
import moment from 'moment';
import { mySqlDb } from "../classes/mySqlDb.js"
import { sqLiteDb } from "../classes/sqLiteDb.js"

let io;

const initWsServer = (server) =>{
    const io = new Server(server)

    io.on('connection', (socket) =>{
        console.log('Conexion Nueva')


        socket.on('addProduct', async (product) =>{
            
            const newProduct = {
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail,
                };
            await mySqlDb.insertData(newProduct)
            io.emit('addTable', newProduct)
        })

        socket.on('addMessage', async (message) =>{
            const newMessage  = {
                email: message.email,
                msg: message.message,
                time: moment().format('h:mm a')
            }
            await sqLiteDb.insertData(newMessage)
            io.emit('showMessage', newMessage)  
        })
    })
return io
}

export default initWsServer