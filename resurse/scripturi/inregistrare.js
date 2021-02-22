function verifica_campuri(){
    var parola1 = document.getElementById("parola1").value
    var rparola1 = document.getElementById("rparola1").value
    var conditie1 = (parola1 == rparola1)
    if (conditie1 == false) {
        alert ("Parolele nu coincid")
    }

    var username1 = document.getElementById("username1").value
    var nume1 = document.getElementById("nume1").value
    var prenume1 = document.getElementById("prenume1").value
    var email1 = document.getElementById("email1").value
    var conditie2 = (username1 != "")||(nume1 != "")||(prenume1 != "")||(email1 != "")

    var conditie3 = (email1.match(new RegExp("^[a-zA-Z0-9_\\-]+@[a-zA-Z0-9]+\\.[a-zA-Z]{2,3}$")) != null)
    if (conditie2 == false) {
        alert ("Introduceti toate campurile!")
    }

    
    
    if(conditie3) {
        alert ("corect!")
    }
    else {
        alert ("gresit!")
    }
    //console.log(email1.match(new RegExp("^[a-zA-Z0-9_\\-]+@[a-zA-Z0-9]+\\.[a-zA-Z]{2,3}$")))
    // if (rez == false)
    // {
    //     alert("Emailul nu e bun!")
    // }
    return conditie1 && conditie2 && conditie3
}
