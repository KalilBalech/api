var book = require("../models/book")    // schema de book - é um molde do tipo de informação que vai ser armazenada na base de dados
var mongoose = require("mongoose")

const Book = mongoose.model("Book", book)   // Book são todos os modelos/instancias do schema book existentes na base de dados. Se fizermos new Book criaremos uma nova instancia. Se fizermos apenas Book, nos referiremos aos Books existentes na base de dados

class BookService {
    
    async Create(name, author, description){    // função que cria um novo modelo na base de dados
        var newBook = new Book({
            nome: name, 
            autor: author,
            descricao: description
        })  
        try{
            await newBook.save()    // essa linha salva um novo modelo de book. um modelo é uma instancia de um schema
            return true
        }catch(error){
            console.log(error)
            return false
        }
    }

    async GetAll(){
        return await Book.find()
    }

}

module.exports = new BookService();