const shipBot = {
    data: [null,null,null,null,null],
    guess:[],
    history:[],
    isHit:false,
    shipName:["Carrier", "Battleship", "Destroyer", "Submarine", "PatrolBoat"],
    shipLength:[5,4,3,3,2]
} 

function resetStatus(){
    shipBot.data = [null,null,null,null,null];
    shipBot.guess = [];
    shipBot.history = [];
    shipBot.isHit = false;
}

function random(start,end){
    return Math.floor((Math.random()*(end + 1 - start)) + start);
}

function randomPosition(){
    let position = "row"
    const rd = random(0,1);
    if(rd === 1){
        position = "column";
    }
    return position;
}

function checking(arr){
    let result = true;
    const [x,y] = arr;
    const condition = x <= 10 && y <= 10 && y >0 && x > 0;
    if(!condition){
        result = false;
    }
    for(let i  = 0 ; i< 5; i+=1){
        const item = shipBot.data[i]
        if(item !== null){
            for(let j = 0 ;j < item.length;j+=1){
                const [dataX,dataY] = item[j];
                if(dataX === x && dataY === y){
                    result = false;
                }
            } 
        }
    }
    return result;
}

function generatingShip(shiplength){
    let isDone = false;
    let ship = [];
    while(!isDone){
        const [x,y] = [random(1,10),random(1,10)];
        const pos = randomPosition();
        for(let i =0 ;i < shiplength; i+=1){
            let newCoordinates = null;  
            if(pos === "row"){
                newCoordinates = [x,y+i];
            }else if(pos === "column"){
                newCoordinates = [x + i,y];
            }
            if(!checking(newCoordinates)){
                ship = [];
                break;
            }
            ship.push(newCoordinates);
        }
        if(ship.length === shiplength){
            isDone = true;
        }
    }
    return ship; 
}


function placeShip(){
    for(let i = 0;i < 5;i+=1){
        shipBot.data[i] = generatingShip(shipBot.shipLength[i]);
    }
    return shipBot.data;
}

function isAttackValid(arr){
    let result = true;
    const [x,y] = arr;
    for(let i = 0 ; i< shipBot.history.length;i+=1){
        const history = shipBot.history[i];
        const condition = (x === history[0] && y === history[1]) 
        || x > 10 || y > 10 || y <= 0 || x <= 0 ;
        if(condition){
            result = false;
            break;
        }
    }
    return result;
}

function generatingAttack(){
    let isDone = false;
    let newAtack = null;
    while(!isDone){
        const [x,y] = [random(1,10),random(1,10)];
        if(isAttackValid([x,y])){
            newAtack = [x,y];
            isDone = true;
        }
    }
    return newAtack;
}

function Attacking(){
    let attack = null;
    if(shipBot.isHit){
        const lastIndex = shipBot.history.length - 1;
        const [x,y] = shipBot.history[lastIndex];
        const guess = [[x + 1,y],[x-1,y],[x,y+1],[x,y-1]];
        guess.forEach(item =>{
            if(isAttackValid(item)){
                shipBot.guess.push(item);
                shipBot.history.push(item);
            }
        })
    }
    
    if(shipBot.guess.length !== 0){
        [attack] = shipBot.guess.splice(0,1);
    }else{
        attack = generatingAttack();
    }
    shipBot.history.push(attack);
    return attack;
}

function isAttackHit(bool){
    shipBot.isHit = bool;
}

module.exports ={placeShip,Attacking,isAttackHit,resetStatus};