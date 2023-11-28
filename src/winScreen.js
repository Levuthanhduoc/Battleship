function Button(text){
    const button = document.createElement("button");
    button.id = `${text}Button`;
    button.textContent = `${text}`;
    return button;
}



function winScreen(winner,target){
    const winBox = document.createElement("div");
    winBox.id = "winScreen";
    const win = document.createElement("div");
    win.id ="winText";
    let wintext = "Player 1";
    if(winner === "P2"){
        wintext = "Player 2"
    }
    win.textContent = `${wintext} is the winner !!!`
    const restartButton = Button("Restart");
    const endButton = Button("End");
    const ButtonBox = document.createElement("div");
    ButtonBox.append(restartButton,endButton)
    winBox.append(win,ButtonBox);
    target.append(winBox);

    return new Promise((resolve)=>{
        winBox.addEventListener("click",(e)=>{
            if(e.target === restartButton){
                resolve(true);
            }else if(e.target === endButton){
                resolve(false);
            }
            winBox.remove();
        })
    })
}


module.exports = {winScreen};