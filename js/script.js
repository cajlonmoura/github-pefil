//Chamas todas as outras funções

function getTypes(response){
    getResponsePerfil(response);
    getResponseFollowers(response);
    getResponseImg(response);
    getResponseBio(response);
    getResponseBlog(response);
    getResponseLocation(response);
}
//Estabele conexão peo AXIOS
function getConnection(usuario){
    var user = `https://api.github.com/users/${usuario}`;
    axios.get(user)
        .then(function(response){
            getTypes(response);
        })
        .catch(function(error){
            console.warn(error);
            alert("Tente outro perfil");
            var perfil = document.querySelector("#perfil")
            perfil.innerHTML = "";
        });

}
//Get username do github
function github(){
    var input = document.querySelector("#user_name");
    var name = (input).value;
    if(name === ""){
        alert("Tente outro perfil !");
        input.value = '';
    }else{
        getConnection(name);
        removeAviso();
    }
}
//GET de informações da API
function getResponsePerfil(response){
    var perfil = document.querySelector("#perfil")
    perfil.innerHTML = "";
    perfil.setAttribute('href',`${response.data.html_url}`);
    perfil.appendChild(document.createTextNode("Perfil no GitHub"));
}
function getResponseFollowers(response){
    document.querySelector("#seguidores").value = "";
    document.querySelector("#seguidores").innerHTML = `Seguidores: ${response.data.followers}`;
}
function getResponseImg(response){
    var img = document.querySelector("img");
    img.setAttribute('src', response.data.avatar_url);
}
function getResponseBio(response){
    var pBio = document.querySelector("#bio");
    pBio.innerHTML = "";
    (response.data.bio != null) ? pBio.innerHTML = `Bio: ${response.data.bio}`:" ";
}
function getResponseBlog(response){
    if(response.data.blog != null){
        var span = document.querySelector("#blog-title");
        span.innerHTML = "";
        span.innerHTML = `Blog: `;
        var link = document.querySelector("#link-blog");
        var text = document.createTextNode(`${response.data.blog}`);
        link.innerHTML = ``;
        link.appendChild(text);
        link.setAttribute('href',`${response.data.blog}`)
    }
}
function getResponseLocation(response){
    (response.data.location != null) ?  document.querySelector("#location").innerHTML = `Localização: ${response.data.location}` : "";
}
function removeAviso(){
    (document.querySelector("#output")).removeChild(document.querySelector("#output h1"));
}