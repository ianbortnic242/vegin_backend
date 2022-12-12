export const dbOptions = {
    mysql:{
        client: "mysql2",
    connection:{
        host:'localhost',
        user:'root',
        password:'',
        database:'entrega_7'
    }
    },
    sqlite:{
        client:'sqlite3',
    connection:{
        filename:'./DB/messages.sqlite'
    },
    useNullAsDefault:true
    }
}