/* eslint-disable no-undef */
const gameBoard = require('../src/gameBoard');
const testShip = require('../src/ship');

const newship = testShip(5);
const oldship = testShip(2);
const player1 = gameBoard();
const player2 = gameBoard();
player1.placeShip([0,0],newship);
player2.placeShip([[1,1],[1,2]],oldship);

test('report ship',()=>{
    expect(player1.isLost()).toBe(false);
})

test('hit ship',()=>{
    expect(player1.receiveAttack([0,0])).toBe(true);
})

test('miss ship',()=>{
    expect(player1.receiveAttack([1,1])).toBe(false);
})

test('report ship all hit',()=>{
    expect(player1.isLost()).toBe(true)
})

test('ship 2 receive 2 hit ',()=>{
    player2.receiveAttack([1,1]);
    player2.receiveAttack([1,2]);
    expect(player2.isLost()).toBe(true)
})