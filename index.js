const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bookService = require("./services/book-service")
const userService = require("./services/user-service")


app.use(express.static("public"))// essas duas linhas é pro express carregar arquivos estáticos como html e css
app.use(express.static("views"))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())

app.set("view engine", "ejs")

mongoose.connect("mongodb://localhost:27017/library", { useNewUrlParser: true, useUnifiedTopology: true })

const JWTSecret = "essaEhASenhaDeGeracaoDeTokensDaNossaAPINinguemPodeSabe-laApenasEu"

function auth_middleware(req, res, next) { // a req, antes de chegar na api, é capturada pelo middleware o middleware só deixa a requisiçao chegar na api, se a função next() for chamada 
    let authorization = req.headers["authorization"] // a autorização fica nessa variavel => "bearer" + token

    if (authorization != undefined) {
        let token = authorization.split(" ")[1] // authorization.split(" ")[0] == "bearer"
        jwt.verify(token, JWTSecret, (error, data) => {   // essa função verifica se o token recebido é válido e se ainda não expirou o primeiro argumento é o token, o segundo é a chave da autenticação da api, que serve tanto pra criptografar quanto pra descriptografar, que é o caso
            if (error) {
                res.status(400)
                res.json({ error: "token inválido" })
            }
            else {
                req.token = token   // criei esses dois parametros na request, que podem ser acessados pelos metodos http, de forma que podemos contar quantos acessos uma api teve, quem acessou...
                req.usuario = { id: data.id, email: data.email }
                next()
            }
        })
    }
    else {
        res.status(400)
        res.json({ "error": "autorização inválida" }) // não vai pra api. Já retorna o erro
    }
}

// app.get("/", (req, res) => {  // quem chama essa requisição é quem entra no site -> NÃO É ASSIM QUE FAZ. TEM QUE ABRIR O ARQUIVO AHHTP DIRETAMENTE
//     res.sendFile("./views/login.html")
// })

// app.post("/user", async (req, res) => {    //essa requisição é chamada a partir do formulario de login
//     // var status = await userService.Create(
//     //     req.body.email,
//     //     req.body.password
//     // )
//     // if(status){ // aqui a gente faz o tratamento se o salvamento deu errado
//     //     res.redirect("/")
//     // }else{
//     //     res.send("Ocorreu uma falha!")
//     // } 
//     var status = await userService.VerifyUser(    //ERROOOO: ESQUECI DO AWAIT DESSA LINHA. DEMOREI UM SECULO PARA ACHAR O ERRO
//         req.body.email,
//         req.body.password
//     )

//     if (status) {
//         jwt.sign({ email: req.body.email }, JWTSecret, { expiresIn: "48h" }, (erro, token) => {
//             if (erro) {
//                 res.status(400)
//                 res.json({ "erro": "falha interna" })
//             }
//             else {
//                 res.status(200)
//                 res.json({ "token": token })
//             }
//         }).then(() => {
//             localStorage.setItem("token", token)
//             axiosConfig.headers.authorization = "Bearer " + localStorage.getItem("token")
//         }).catch(error => { console.log(error) })
//     }
//     else {
//         res.status(400)
//         res.send("Usuário sem acesso à API")
//     }

// })

app.post("/book", auth_middleware, async (req, res) => { // quem chama essa requisição é o forms do arquivo home.html
    console.log("Entre na axios.post com os dados:"+req.body.nomeDoLivro+req.body.nomeDoAutor+req.body.descricaoDoLivro)
    var status = await bookService.Create(
        req.body.nomeDoLivro,  // esses nomes devem estar conforme o atributo "name" do formulario do arquivo create, pois é esse forms que chama essa função
        req.body.nomeDoAutor,
        req.body.descricaoDoLivro
    )
    console.log("Acabei de sair da função Create")
    console.log("o status do create é: "+status)
    if (status) { // aqui a gente faz o tratamento se o salvamento deu errado
        res.status(200)
        // res.redirect("/home.html") ISSO AQUI NÃO FUNCIONA POR ALGUM MOTIVO DE CORS (???)
    } else {
        res.send("Ocorreu uma falha!")
    }

})

app.get("/books", auth_middleware, async (req, res) => {

    let books = await bookService.GetAll()    //será que precisa de await aqui? Precisa.
    
    res.json(books) // esse aqui é o return de uma requisição http

})

// REQUISIÇÃO HTTP QUE AUTENTICA O USUÁRIO NA PÁGINA DE LOGIN

app.post("/auth", async (req, res) => {

    console.log(req.body.password + "Entrei no axios.post e vou verifyUser com email= "+ req.body.email+" e senha: "+req.body.password)    // os console.log que estao na api, aparecem no terminal do vscode
    var status = await userService.VerifyUser(    //ERROOOO: ESQUECI DO AWAIT DESSA LINHA. DEMOREI UM SECULO PARA ACHAR O ERRO
        req.body.email, 
        req.body.password
    )
    console.log("Acabei de verificar o usuário")
    console.log(status)

    if (status) {
        jwt.sign({ email: req.body.email }, JWTSecret, { expiresIn: "48h" }, (erro, token) => {   // Essa linha gera e assina um token para a utilização da nossa
            if (erro) {
                res.status(400)
                res.json({ "erro": "falha interna" })
            }
            else {
                res.status(200)
                res.json({ "token": token })
            }
        })
    } else {
        res.sendStatus(400)
        res.send("erro: email inválido") 
    }

})

app.listen(8080, () => {console.log("API RODANDO!") })