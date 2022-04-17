
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
        let atrash = document.createElement("button")
        let apencil = document.createElement("button")
        atrash.setAttribute("onclick", "deletar()")
        apencil.setAttribute("onclick", "")
        let trash = document.createElement("i")
        let pencil = document.createElement("i")
        trash.setAttribute("class", "fa-solid fa-trash fa-lg")
        pencil.setAttribute("class", "fa-solid fa-pencil fa-lg")
        atrash.appendChild(trash)
        apencil.appendChild(pencil)
        divBook.setAttribute("class", "book")
        divBook.setAttribute("data-titulo", livro.nome)
        divBook.setAttribute("data-autor", livro.autor)
        divBook.setAttribute("data-descricao", livro.descricao)
        divBooktitle.innerHTML = divBook.getAttribute("data-titulo")
        divBookautor.innerHTML = divBook.getAttribute("data-autor")
        divBookdescricao.innerHTML = divBook.getAttribute("data-descricao")
        divBook.appendChild(divBooktitle)
        divBook.appendChild(divBookautor)
        divBook.appendChild(divBookdescricao)
        divBook.appendChild(apencil)
        divBook.appendChild(atrash)
        divBook.style.display = "block"
        document.getElementById("books").appendChild(divBook)
        
    });
    
}).catch(error => {console.log(error)})

function deletar(){
    console.log("Entrando na função deletar()")
    let clickedtrash = event.target // esse aqui é o "i"
    // console.log(clickedtrash.nodeName)
    let divBook = clickedtrash.parentNode.parentNode // isso aqui é uma div
    console.log(divBook.nodeName)
    let nomeDoLivro = divBook.getAttribute("data-titulo")
    console.log(nomeDoLivro)
    let nomeDoAutor = divBook.getAttribute("data-autor")
    console.log(nomeDoAutor)
    let descricao = divBook.getAttribute("data-descricao")
    console.log(descricao)
    let dados = {nome:nomeDoLivro, autor:nomeDoAutor, descricao: descricao}
    console.log("Vou entrar em axios.delete com nome:"+dados.nome+" autor: "+dados.autor+" descricao: "+dados.descricao)
    axios.delete("http://localhost:8080/book", dados, axiosConfig).then((response)=>{
        alert("Livro excluído")
    }).catch(error=>{console.log("DEU ERRO, CARAAAAAAI: "+error)})
}
