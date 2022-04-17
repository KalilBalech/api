const mongoose = require("mongoose")

const book = new mongoose.Schema({  // um schema é um molde de uma informação a ser armazenada na base de dados. É como se fosse uma classe
    nome: String,
    autor: String,
    descricao: String
})

module.exports = book 