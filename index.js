const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const bookService = require("./services/book-service")
const userService = require("./services/user-service")

app.use(express.static("public"))// essas duas linhas é pro express carregar arquivos estáticos como html e css
app.use(express.static("views"))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.set("view engine", "ejs")

mongoose.connect("mongodb://localhost:27017/library", {useNewUrlParser: true, useUnifiedTopology: true})

app.get("/", (req, res)=>{  // quem chama essa requisição é quem entra no site
    res.render("login")
})

app.post("/user", async(req, res)=>{    //essa requisição é chamada a partir do formulario de login
    // var status = await userService.Create(
    //     req.body.email,
    //     req.body.password
    // )
    // if(status){ // aqui a gente faz o tratamento se o salvamento deu errado
    //     res.redirect("/")
    // }else{
    //     res.send("Ocorreu uma falha!")
    // } 
    var status = await userService.VerifyUser(    //ERROOOO: ESQUECI DO AWAIT DESSA LINHA. DEMOREI UM SECULO PARA ACHAR O ERRO
        req.body.email,
        req.body.password
    )
    
    if(status){

    }
    else{
        
    }

})

app.post("/create", async (req, res)=>{ // quem chama essa requisição é o forms do arquivo create.ejs

    var status = await bookService.Create(
        req.body.nomeeee,  // esses nomes devem estar conforme o atributo "name" do formulario do arquivo create, pois é esse forms que chama essa função
        req.body.autorrrr,
        req.body.descricaoooo
    )

    if(status){ // aqui a gente faz o tratamento se o salvamento deu errado
        res.redirect("/")
    }else{
        res.send("Ocorreu uma falha!")
    } 

})

app.get("/books", async (req, res)=>{ 
    
    let books = await bookService.GetAll()    //será que precisa de await aqui? Precisa.

    res.json(books)

})

app.listen(8080, ()=>{})