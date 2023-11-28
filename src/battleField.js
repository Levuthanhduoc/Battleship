const status = {
    layout : false,
    current: [null,[null,null]],
    shipType: [0,"X"],
    shipLocation: [null,null,null,null,null],
    shipName:[ 	"Carrier", "Battleship", "Destroyer", "Submarine", "PatrolBoat"],
    shipLength:[5,4,3,3,2]
}

// layout

function resetStatus(){
    status.current = [null,[null,null]];
    status.shipType = [0,"X"];
    status.shipLocation = [null,null,null,null,null];
}

function removeField(){
    const field = document.querySelector("#battleField");
    field.remove();
    status.layout = false;
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
    status.layout = true;
    return battleField;
}

// setup

function nameTag(text,place){
    const div = document.createElement("div");
    div.id = "nametag";
    div.textContent = text;
    place.append(div);
}

function chooseShipType(){
    const box = document.querySelector("#player1Mess");
    const select = document.createElement("select");
    select.setAttribute("name", "shipName");
    select.setAttribute("id","shipName");
    status.shipName.forEach((ship,index)=>{
        const option = document.createElement("option");
        option.setAttribute("value",`${index}`);
        option.textContent = `${status.shipName[index]}`;
        select.append(option);
    })
    box.append(select);
}

function showshipPreview(){
    const messbox = document.querySelector("#player1Mess");
    const past = document.querySelector("#previewBox");
    const previewBox = document.createElement("div");
    previewBox.id = "previewBox";
    if(messbox === null){
        return;
    }
    if(past !== null){
        past.remove();
    }
    const [index,axis] = status.shipType;
    const ship = document.createElement("div");
    ship.setAttribute("id","shipModel");
    let direction = "column";
    if(axis === "Y"){
        direction = "row";
    }
    ship.style =`display:flex; flex-direction:${direction};`;
    for(let i = 0;i< status.shipLength[index]; i+=1){
        const box = document.createElement("div");
        box.style = "width:20px; height:20px; border: black solid 1px;"
        ship.append(box);
    }
    previewBox.append(ship);
    messbox.append(previewBox);
}

function previewRotationButton(){
    const messbox = document.querySelector("#player1Mess");
    const button = document.createElement("button");
    button.setAttribute("id","rotationButton");
    button.textContent = "Rotation";
    button.addEventListener("click",()=>{
        if(status.shipType[1] === "X"){
            status.shipType[1] = "Y";
        }else if(status.shipType[1] === "Y"){
            status.shipType[1] = "X";
        }
    })
    messbox.append(button);
}

function setButton(){
    const messbox = document.querySelector("#player1Mess");
    const button = document.createElement("button");
    button.id = "setButton";
    button.textContent = "SET";
    messbox.append(button);
    return button;
}

function checkMissingShip(){
    const result = [];
    status.shipLocation.forEach((item,index)=>{
        if(item === null || item[0] === undefined){
            result.push(index);
        }
    })
    return result;
}

function ShowShipInField(arr,shipName){
    if(arr[0] === 0 || arr[1] === 0){
        return;
    }
    let tag = shipName;
    const axis = status.shipType[1];
    const length = status.shipLength[status.shipType[0]];
    const mid = Math.floor(length/2);
    const start = [arr[0] - mid,arr[1] - mid];
    const end = [start[0] + length - 1,start[1] + length - 1];
    const conditionX = (start[0] <= 0 || end[0] > 10) && axis === "X";
    const conditionY = (start[1] <= 0 || end[1] > 10) && axis === "Y";
    if(conditionX || conditionY){
        tag = "shipError";
    }
    for(let i =0 ; i< length; i+=1){
        if(axis === "X"){
            if(start[0] + i > 0 && start[0] + i <= 10){
                const box = document.querySelector(`[data-id = "${start[0] + i},${arr[1]}"]`);
                box.classList.add(`${tag}`);
            }
        }else if(axis === "Y"){
            if(start[1]+i > 0 && start[1]+i <= 10){
                const box = document.querySelector(`[data-id = "${arr[0]},${start[1]+ i}"]`);
                box.classList.add(`${tag}`);
            }
        }
    }
}

function removeShipInField(shipName){
    let ship = document.querySelectorAll(`.${shipName}`);
    ship = Array.from(ship);
    ship.forEach((item)=>{
        const box = item;
        box.classList.remove(`${shipName}`);
    })
}

function isShipCollide(shipName){
    let shipLocation = document.querySelectorAll(`.${shipName}`);
    let result = false;
    shipLocation = Array.from(shipLocation);
    shipLocation.forEach(item =>{
        let tag = item.classList.value;
        tag = tag.split(" ");
        if(tag[2]=== "ship" || tag.length >= 4){
            result = true
        }
    })
    return result;
}

function alertDiv(message){
    const past = document.querySelector(".alertBox");
    if(past !== null ){
        past.remove();
    }
    const messageBox = document.querySelector(".messageBox");
    const div = document.createElement("div");
    div.classList.add("alertBox");
    div.textContent = message;
    messageBox.append(div);
    setTimeout(()=>{
        div.remove();
    },3000); 
}

function collectLocation(shipName){
    let allLocation = document.querySelectorAll(`.${shipName}`);
    allLocation = Array.from(allLocation);
    const shipLocation = allLocation.map((item)=>{
        const coordinates = item.dataset.id;
        const [x,y] = coordinates.split(",");
        return [Number(x),Number(y)];
    })
    return shipLocation;
}

function setUp(mess){
    if(status.layout === false){
        return null;
    }
    const messbox = document.querySelector("#player1Mess");
    nameTag(mess,messbox);
    alertDiv("Please place your ship! hit SET button when you done")
    chooseShipType();
    previewRotationButton();
    const end = new Promise((resolve)=>{
        setButton().addEventListener("click",()=>{
            const result = checkMissingShip();
            if(result[0] === undefined){
                resolve(status.shipLocation);
                removeField();
                resetStatus();
            }else{
                let text = "missing ";
                result.forEach(item=>{
                    text += `${status.shipName[item]} `
                })
                alertDiv(text);   
            }
        })
    });
    showshipPreview();
    messbox.addEventListener("click",()=>{
        const checked = document.querySelector("#shipName>option:checked");
        if(checked === null){
            return;
        }
        status.shipType[0] = Number(checked.value);
        showshipPreview();
    })
    let smallBox = document.querySelectorAll("#player1field>div.smallBox");
    smallBox = Array.from(smallBox);
    smallBox.forEach((box)=>{
        box.addEventListener("click",(e)=>{
            const index = status.shipType[0];
            const boxId = e.target.dataset.id;
            const [x,y] = boxId.split(",");
            const ship = status.shipName[index];
            if(status.shipLocation[index] !== null){
                removeShipInField(ship);
            }
            ShowShipInField([Number(x),Number(y)],`${ship}`);
            if(!isShipCollide(ship)){
                status.shipLocation[index] = collectLocation(ship);
            }else{
                removeShipInField(ship);
                status.shipLocation[index] = null;
                alertDiv("ship collided!!! Please choose different location!");
            }
        })
        box.addEventListener("mouseenter",(e)=>{
            const boxId = e.target.dataset.id;
            const [x,y] = boxId.split(",");
            ShowShipInField([Number(x),Number(y)],"ship");
            if(isShipCollide("ship")){
                ShowShipInField([Number(x),Number(y)],"shipError");
            }
        })
        box.addEventListener("mouseleave",()=>{
            removeShipInField("ship");
            removeShipInField("shipError");
        })
    })
    return end;
}

// battle

function turnBlock(player1,player2){
    let nowBlock = player1;
    let text = "Player1 Turn";
    const add = ()=>{
        const past = document.querySelector(".turnBlock");
        if(past === undefined || past === null){
            const div = document.createElement("div");
            div.textContent =`${text}`;
            div.classList.add("turnBlock");
            nowBlock.append(div);
            if(nowBlock === player1){
                nowBlock = player2;
                text = "Player2 Turn";
            }else{
                nowBlock = player1; 
                text = "Player1 Turn";
            } 
        }  
    }
    const remove = () =>{
        const bk = document.querySelector(".turnBlock");
        if(bk !== undefined && bk !== null ){
            bk.remove();
        }
    }
    return {add,remove}
}

function blockInput(target){
    const div = document.createElement("div");
    div.classList.add("turnBlock");
    target.append(div);
}

function playerControll(playerNumber){
    const require = status.layout;
    if(!require){
        throw new Error("require Layout");
    }
    const Player = document.querySelector(`#player${playerNumber}field`);
    const input = (arr)=>{
        const box = Player.querySelector(`.smallBox[data-id="${arr[0]},${arr[1]}"]`);
        box.dispatchEvent(new CustomEvent('click', {bubbles: true,}))
    }

    const output = ()=> status.current;

    return {input,output}
}

function battle(player1Data,player2Data){
    if(status.layout === false){
        return null;
    }
    const player1Field = document.querySelector("#player1field");
    const player1Mess = document.querySelector("#player1Mess");
    const player2Field = document.querySelector("#player2field");
    const player2Mess = document.querySelector("#player2Mess");
    const playerField = [player1Field,player2Field]; 
    const playerData = [player1Data,player2Data];

    const Block = turnBlock(player1Field,player2Field);
    Block.add();
    playerField[1].scrollIntoView();
    nameTag("Player 2",player1Mess);
    nameTag("Player 1",player2Mess);

    for(let i = 0;i < 2;i+=1){
        playerField[i].addEventListener("click",(e)=>{
            if(!e.target.classList.contains("smallBox")){
                return;
            }
            const coordinates =  e.target.dataset.id;
            const [x,y] = coordinates.split(",");
            const condition = e.target.classList.contains("hit") 
            || e.target.classList.contains("miss") 
            || !e.target.classList.contains("smallBox") || x === "0" || y === "0";
            
            if(condition){
                return;
            }
            playerField[(i+1)%2].scrollIntoView();
            Block.remove();
            Block.add();
            
            const result = playerData[i].receiveAttack([x,y]);
            status.current = [i+1,[x,y]];
            if(result){
                e.target.classList.add("hit");
                e.target.textContent = "X"
            }else{
                e.target.classList.add("miss");
            }

        })
    }
    
    return new Promise((resolve)=>{
        const field = document.querySelector("#battleField");
        let result = null
        field.addEventListener("click",()=>{
            if(result === null){
                if(player1Data.isLost()){
                    result = "P2";
                }else if(player2Data.isLost()){
                    result = "P1";
                }
                if(result !== null){
                    resolve(result);
                    blockInput(field);
                }
            }
        })
    })
}


module.exports = {layout,setUp,battle,playerControll}; 