
const server = require('./services/server')
const initWsServer = require('./services/socket');

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