import server from './services/server.js'
import initWsServer from './routes/socket.js';

const puerto = 8080;


const init = async () =>{
    try{
        initWsServer(server)
		server.listen(puerto, () =>{
			console.log(`Puerto escuchando en : ${puerto}`);
		})
    }catch (err){
        console.log(err)
    }
}


init()