/* eslint-disable no-await-in-loop */
import stage1 from "./intro";
import './intro.css';
import stage2 from "./battleField";
import './battleField.css';
import gameBroad from './gameBoard';
import ship from './ship';
import stage3 from "./winScreen";
import "./winScreen.css";
import bot from './shipBOT';


function createShip(arr,obj){
    arr.forEach(item => {
        const L = item.length;
        const newShip = ship(L);
        obj.placeShip(item,newShip);
    });
}



async function start(){
    const body = document.querySelector("body");
    stage1.layout(body);
    const playerNum = await stage1.script();
    let continueGame = true;
    while(continueGame){
        stage2.layout(body,1);
        const player1 = await stage2.setUp("Player 1");
        let player2 = null;
        if(playerNum === "2"){
            stage2.layout(body,1);
            player2 = await stage2.setUp("Player 2");
        }else{
            player2 = bot.placeShip();
        }
        const player1Board = gameBroad();
        const player2Board = gameBroad();
        createShip(player1,player1Board);
        createShip(player2,player2Board);
        const PvP = stage2.layout(body,2);
         // setup Bot
         if(playerNum === "1"){
            const P1 = document.querySelector("#player2field");
            const player2Controll = stage2.playerControll(1);
            P1.addEventListener("click",(e)=>{
                let hit  = e.target.dataset.id;
                hit = hit.split(",");
                hit = [Number(hit[0]),Number(hit[1])];
                const isPlayerMove = !e.target.classList.contains("smallBox") || e.target.classList.contains("miss") 
                || e.target.classList.contains("hit") || hit[0] > 10 || hit[0] <=0 || hit[1] > 10 || hit[1] <= 0;
                if(isPlayerMove){
                    return;
                }
                const [x,y] = bot.Attacking();
                player2Controll.input([x,y]);
                const hitBox = document.querySelector(`#player1field>.smallBox[data-id="${x},${y}"]`);
                if(hitBox.classList.contains("hit")){
                    bot.isAttackHit(true);
                }else{
                    bot.isAttackHit(false);
                }
                P1.scrollIntoView(); 
            })
        }
        const result = await stage2.battle(player1Board,player2Board);
        // setup Bot
        continueGame = await stage3.winScreen(result,body);
        bot.resetStatus();
        PvP.remove();  
    }
}start();

