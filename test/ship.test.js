/* eslint-disable no-undef */
const ship = require('../src/ship');

test('ship being hit 4 time with ship lenght 4',()=>{
    const testShip = ship(4);
    for(let i = 0 ;i <4;i+=1){
        testShip.hit();
    }
    expect(testShip.isSunk()).toBe(true);
})
test('ship being hit 2 time with ship lenght 4',()=>{
    const testShip = ship(4);
    for(let i = 0 ;i <2;i+=1){
        testShip.hit();
    }
    expect(testShip.isSunk()).toBe(false);
})
test('ship being hit 6 time with ship lenght 5',()=>{
    const testShip = ship(5);
    for(let i = 0 ;i <6;i+=1){
        testShip.hit();
    }
    expect(testShip.isSunk()).toBe(true);
})