import stage1 from "./intro";
import './intro.css';
import stage2 from "./battleField";
import './battleField.css';

async function start(){
    const body = document.querySelector("body");
    stage1.layout(body);
    let value = await stage1.script();
    stage2.layout(body,1);
    
}start();