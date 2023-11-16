function ship(num){
    let damaged = 0;
    const length = num;
    const hit = ()=>{
        damaged +=1;
    }
    const isSunk = ()=>damaged >= length;
    return{hit,isSunk}
}

module.exports = ship;