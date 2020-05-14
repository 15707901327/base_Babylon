import {Engine} from "./Engines";

window.addEventListener('DOMContentLoaded', () => {

    const canvas = document.getElementById('renderCanvas');

    // 创建3D引擎
    const engines = new Engine(canvas, true);
    console.log(engines);
});