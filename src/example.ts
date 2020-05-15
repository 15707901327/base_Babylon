import {Engine} from "./Engines";
import {Scene} from "./scene";
import {FreeCamera} from "./Cameras";
import {Vector3} from "./Maths";

window.addEventListener('DOMContentLoaded', () => {

    const canvas = document.getElementById('renderCanvas');

    // 创建3D引擎
    const engine = new Engine(canvas, true);

    function createScene() {
        // 创建场景
        var scene = new Scene(engine);

        // 创建自由相机
        var camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene);
        camera.setTarget(Vector3.Zero()); // 设置视点
        camera.attachControl(canvas, false); // 相机添加到画布上
        // console.log(scene);
    }
    var scene = createScene();

});