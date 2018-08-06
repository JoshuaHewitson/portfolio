import * as THREE from 'three';
import SceneSubject from './SceneSubject';
import GeneralLights from './GeneralLights';

export default canvas => {

    const clock = new THREE.Clock();
    const origin = new THREE.Vector3(0,0,0);

    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    }

    const mousePosition = {
        x: 0,
        y: 0
    }
    var mouseDown = false;

    const scene = buildScene();
    const renderer = buildRender(screenDimensions);
    const camera = buildCamera(screenDimensions);
    scene.add(camera)
    const sceneSubjects = createSceneSubjects(scene,camera,renderer,canvas);


    function buildScene() {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#FFF");

        return scene;
    }

    function buildRender({ width, height }) {
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, preserveDrawingBuffer: true });
        const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);

        renderer.gammaInput = true;
        renderer.gammaOutput = true;

        return renderer;
    }

    function buildCamera({ width, height }) {
        const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, -10000, 10000);
        camera.position.z = 100;
        return camera;
    }

    function createSceneSubjects(scene,camera,renderer,canvas) {
        const sceneSubjects = [
            //new GeneralLights(scene),
            new SceneSubject(scene,camera,renderer,canvas)
        ];

        return sceneSubjects;
    }

    function update() {
        const elapsedTime = clock.getElapsedTime();

        for(let i=0; i<sceneSubjects.length; i++)
            sceneSubjects[i].update(elapsedTime);

        renderer.render(scene, camera);
    }

    function updateCameraPositionRelativeToMouse() {
        camera.position.x += (  (mousePosition.x * 0.01) - camera.position.x ) * 0.01;
        camera.position.y += ( -(mousePosition.y * 0.01) - camera.position.y ) * 0.01;
        camera.lookAt(origin);
    }

    function onWindowResize() {
        const { width, height } = canvas;

        screenDimensions.width = width;
        screenDimensions.height = height;

        renderer.setSize(width, height);

        for(let i=0; i<sceneSubjects.length; i++)
            sceneSubjects[0].Resize(screenDimensions.width,screenDimensions.height);
    }

    function onMouseMove(x, y) {
        mousePosition.x = x;
        mousePosition.y = y;
        sceneSubjects[0].onMouseMove();
    }

    function onMouseDown() {
        mouseDown = true;
        sceneSubjects[0].onMouseDown();
    }

    function onMouseUp() {
        mouseDown = false;
        sceneSubjects[0].onMouseUp();
    }



    return {
        update,
        onWindowResize,
        onMouseMove,
        onMouseDown,
        onMouseUp
    }
}
