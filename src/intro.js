const status = {
    layout: false,
    scrip: false,
}

function layout(location){
    const tilte = document.createElement("div");
    tilte.textContent = "BATTLESHIP"
    const introBox = document.createElement("div");
    introBox.setAttribute("id","introBox");
    const form = document.createElement("form");
    form.setAttribute("id","introForm");
    const nameBox = document.createElement("div");
    nameBox.setAttribute("class","nameBox")
    for(let i = 0; i<2 ; i+=1){
        const label = document.createElement("label");
        label.setAttribute("for",`player${i+1}`);
        label.textContent = `${i+1} Player`
        nameBox.innerHTML += `<br><input id = "${i+1}player" type ="radio"  name ="player" value ="${i+1}">`;
        nameBox.append(label)
    }
    const button = document.createElement("button");
    button.setAttribute("id","loginButton");
    button.textContent = "START"
    location.append(introBox);
    form.append(nameBox,button);
    introBox.append(tilte,form);
    status.layout = true;
}

function script(){
    if(status.layout === false){
        return new Promise((resolve, reject) => {
            reject(new Error ("require layout to run first"))
        });
    }
    const button =document.querySelector("#loginButton");
    return new Promise((resolve) => {
        button.addEventListener("click",(e)=>{
            e.preventDefault();
            const mode = document.querySelector('input[name="player"]:checked');
            if(mode !== null){
                const intro = document.querySelector("#introBox");
                intro.remove();
                resolve(mode.value);
            }
        })    
    })
}

module.exports = {layout,script};