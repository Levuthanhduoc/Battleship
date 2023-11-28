/* eslint-disable no-undef */
const shipBOT = require('../src/shipBOT');



test("attacking",()=>{
    expect(Array.isArray(shipBOT.Attacking())).toBe(true);
    expect(shipBOT.Attacking().length).toBe(2);
})
test('test valid attack',()=>{
    shipBOT.history.push([1,1]);
    expect(shipBOT.isAttackValid([1,1])).toBe(false);
})

test('test invalid attack',()=>{
    expect(shipBOT.isAttackValid([1,2])).toBe(true);
})