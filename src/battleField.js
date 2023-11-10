let status = {
    current: null,
    shipType: null,
    shipLocation: [null,null,null,null,null],
}

function resetStatus(){
    status = {
        current: null,
        shipType: null,
        shipLocation: [null,null,null,null,null],
    }
}

function grid(location,size){
    for(let i = 0 ; i <= size;i+= 1){
        for(let j = 0; j <= size; j+=1){
            const box = document.createElement("div");
            box.setAttribute("class","smallBox");
            box.setAttribute("data-id",`${i},${j}`);
            if(i === 0 && j > 0){
                box.textContent = String.fromCharCode(64 + j);
            }else if(j === 0 && i > 0){
                box.textContent = i;
            }
            location.append(box);
        }
    } 
}

function layout(location, number){
    if(typeof(number)!== "number"){
        throw new Error("TypeError");
    }
    if(number > 2){
        throw new Error("max 2");
    }
    const battleField =document.createElement("div");
    battleField.setAttribute("id","battleField")
    for(let i = 0; i < number;i+=1){
        const player = document.createElement("div");
        player.setAttribute("id",`player${i+1}field`);
        player.setAttribute("class","playerField");
        grid(player,10);
        const messageBox = document.createElement("div");
        messageBox.setAttribute("id",`player${i+1}Mess`);
        messageBox.setAttribute("class","messageBox");
        battleField.append(player,messageBox);
    }
    location.append(battleField);
}

function enableGrid(){
    let smallBox = document.querySelectorAll("#player1field>div.smallBox");
    smallBox = Array.from(smallBox);
    smallBox.forEach((box)=>{
        box.addEventListener("click",(e)=>{
            e.target.dataset.id
        })
    })

}

function setUp(){
    
}

module.exports = {layout}; 