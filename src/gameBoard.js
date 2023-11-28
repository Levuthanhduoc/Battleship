function gameBoard(){
    const data = {};

    const placeShip = (arr,ojb)=>{
        if(Array.isArray(arr[0])){
            arr.forEach(item=>{
                const [x,y] = item;
                data[`${x},${y}`] = ojb;
            })
        }else{
            const [x,y] = arr;
            data[`${x},${y}`] = ojb;
        }  
    }

    const receiveAttack = (arr)=>{
        const [x,y] = arr;
        if(data[`${x},${y}`] !== undefined){
            data[`${x},${y}`].hit();
            data[`${x},${y}`] = "O";
            return true;
        }
        data[`${x},${y}`] = "X";
        return false;
    }

    const isLost = ()=>{
        let result = true;
        Object.keys(data).forEach(item=>{
            if(typeof(data[item]) === "object"){
                result = false;
            }
        })
        return result;
    }

    return {placeShip,receiveAttack,isLost,data};
}

module.exports = gameBoard;