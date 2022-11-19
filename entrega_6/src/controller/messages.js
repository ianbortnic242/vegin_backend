const express = require("express")
const fs = require("fs");

class Message {
    constructor(path){
        this.path = path
    }

    async save(message){
        const data = await this.getJson()
        data.push(message)
        fs.promises.writeFile(this.path, JSON.stringify(data, null, '\t'))
    }

    async getJson(){
        const data = await fs.promises.readFile(this.path, 'utf-8')
        return JSON.parse(data)
    }

    async getAll(){
        const messages = await this.getJson()
        return messages
    }

}


const messageController = new Message('./src/data/messages.json');

module.exports = messageController

