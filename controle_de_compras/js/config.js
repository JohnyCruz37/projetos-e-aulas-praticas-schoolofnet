function setConfig (){
    const texts = {
        "title" : "Controle de comprar",
    };
    document.title = texts.title;
    document.getElementById("navTitle").innerHTML = texts.title;
}

setConfig();