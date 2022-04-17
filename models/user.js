const mongoose = require("mongoose")

const user = new mongoose.Schema({  // um schema é um molde de uma informação a ser armazenada na base de dados. É como se fosse uma classe
    email: String,
    password: String
})

module.exports = user