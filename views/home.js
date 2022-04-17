// const book = require("../models/book")

let axiosConfig = {
    headers: {
        authorization: "Bearer " + localStorage.getItem("token") // o localStorage é um pedaço de memória que todo site possui para guardar informações do usuario
    }
}

function register(){
    console.log("Entrei na função register()")
    let name = document.getElementById("nome").value
    let autor = document.getElementById("autor").value
    let descricao = document.getElementById("descricao").value

    let dados = {nomeDoLivro: name, nomeDoAutor: autor, descricaoDoLivro: descricao}
    console.log("Vou entrar na axios.post")
    axios.post("http://localhost:8080/book", dados, axiosConfig).then((response)=>{ // aqui, o post já adiciona diretamente o dado, pois ele vira req.body
        alert("Livro adicionado")
    }).catch(error =>{console.log(error)})
}

console.log("vou entrar no axios.get")
axios.get("http://localhost:8080/books", axiosConfig).then((response)=>{
    let books = response.data   //books é um array de objetos, em que cada objeto é um model da collection books da base de dados library do

    books.forEach(livro => {
        let divBook = document.createElement("div")
        let divBooktitle = document.createElement("h3")
        let divBookautor = document.createElement("h4")
        let divBookdescricao = document.createElement("p")
        divBook.setAttribute("class", "book")
        divBooktitle.innerHTML = livro.nome
        divBookautor.innerHTML = livro.autor
        divBookdescricao.innerHTML = livro.descricao
        divBook.appendChild(divBooktitle)
        divBook.appendChild(divBookautor)
        divBook.appendChild(divBookdescricao)
        divBook.style.display = "block"
        document.getElementById("books").appendChild(divBook)
    
    });
    
}).catch(error => {console.log(error)})

// console.log(books)
