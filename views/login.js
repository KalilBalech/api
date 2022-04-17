function login(){

    console.log("Entrei na função login")   // os console.log que estão no arquivo js ligados ao html aparecem no console do browser 

    let email = document.getElementById("email").value
    let senha = document.getElementById("password").value

    let dados = {"email": email, "password": senha} // essa aqui é a req.body que vai ser chamada no auth. As chaves do body devem ser as mesmas de dentro da função auth
    console.log("Vou entrar no axios.post com dados = "+dados.email+dados.password)
    axios.post("http://localhost:8080/auth", dados).then((res)=>{
        
        alert("Login realizado com sucesso!")

        let token = res.data.token
        localStorage.setItem("token", token)

        window.open("./home.html", "_self")

    }).catch((error)=>alert("Sai daqui, invasor: " +  error))
}