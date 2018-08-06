import * as THREE from 'three';
import SceneManager from './SceneManager';

export default container => {
    const canvas = createCanvas(document, container);

    let canvasHalfWidth;
    let canvasHalfHeight;

    var toggled = false;
    var texture1, texture2;
    var minusOnes = new THREE.Vector2(-1, -1);
    var lastTime;

    var feed = 0.037;
    var kill = 0.06;

    const mousePosition = {
        x: 0,
        y: 0
    }
    var mouseDown = false;

    window.onresize = Resize;
    window.onmousemove = mouseMove;
    canvas.onmousedown = onMouseDown;
    canvas.onmouseup = onMouseUp;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, preserveDrawingBuffer: true });

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, -10000, 10000);
    camera.position.z = 100;
    scene.add(camera)

    var uniforms = {
        screenWidth: {type: "f", value: undefined},
        screenHeight: {type: "f", value: undefined},
        tSource: {type: "t", value: undefined},
        delta: {type: "f", value: 1.0},
        feed: {type: "f", value: feed},
        kill: {type: "f", value: kill},
        brush: {type: "v2", value: new THREE.Vector2(-10, -10)},
        color1: {type: "v4", value: new THREE.Vector4(0, 0, 0.0, 0)},
        color2: {type: "v4", value: new THREE.Vector4(0, 1, 0, 0.2)},
        color3: {type: "v4", value: new THREE.Vector4(1, 1, 0, 0.21)},
        color4: {type: "v4", value: new THREE.Vector4(1, 0, 0, 0.4)},
        color5: {type: "v4", value: new THREE.Vector4(1, 1, 1, 0.6)}
    };
    var colors = [uniforms.color1, uniforms.color2, uniforms.color3, uniforms.color4, uniforms.color5];

    var GSMaterial = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: document.getElementById('standardVertexShader').textContent,
            fragmentShader: document.getElementById('gsFragmentShader').textContent,
        });
    var ScreenMaterial = new THREE.ShaderMaterial({
                uniforms: uniforms,
                vertexShader: document.getElementById('standardVertexShader').textContent,
                fragmentShader: document.getElementById('screenFragmentShader').textContent,
            });

    var plane = new THREE.PlaneGeometry(1.0, 1.0);
    var ScreenQuad = new THREE.Mesh(plane, ScreenMaterial);
    scene.add(ScreenQuad);

    Resize(canvas.width, canvas.height);

    render(0);
    uniforms.brush.value = new THREE.Vector2(0.5, 0.5);
    lastTime = new Date().getTime();
    requestAnimationFrame(render);


    function Resize(width, height) {

      canvas.style.width = '100%';
      canvas.style.height= '100%';

      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      canvasHalfWidth = Math.round(canvas.offsetWidth/2);
      canvasHalfHeight = Math.round(canvas.offsetHeight/2);

      renderer.setSize(canvas.width, canvas.height);

      // TODO: Possible memory leak?
      texture1 = new THREE.WebGLRenderTarget(width/2, height/2,
                          {minFilter: THREE.LinearFilter,
                           magFilter: THREE.LinearFilter,
                           format: THREE.RGBAFormat,
                           type: THREE.FloatType});
      texture2 = new THREE.WebGLRenderTarget(width/2, height/2,
                          {minFilter: THREE.LinearFilter,
                           magFilter: THREE.LinearFilter,
                           format: THREE.RGBAFormat,
                           type: THREE.FloatType});
      texture1.wrapS = THREE.RepeatWrapping;
      texture1.wrapT = THREE.RepeatWrapping;
      texture2.wrapS = THREE.RepeatWrapping;
      texture2.wrapT = THREE.RepeatWrapping;

      uniforms.screenWidth.value = width/2;
      uniforms.screenHeight.value = height/2;
    }


    function createCanvas(document, container) {
        const canvas = document.createElement('canvas');
        container.appendChild(canvas);
        return canvas;
    }


    function mouseMove({screenX, screenY}) {
        mousePosition.x = screenX-canvasHalfWidth;
        mousePosition.y =  screenY-canvasHalfHeight;
        if(mouseDown)
          uniforms.brush.value = new THREE.Vector2(mousePosition.x/canvas.width, 1-mousePosition.y/canvas.height);
    }

    function onMouseUp() {
      mouseDown = false;
    }

    function onMouseDown() {
      console.log('hi');
      mouseDown = true;
      uniforms.brush.value = new THREE.Vector2(mousePosition.x/canvas.width, 1-mousePosition.y/canvas.height);
    }

    function render(time) {
      var dt = (time - lastTime)/20.0;
      if(dt > 0.8 || dt<=0)
          dt = 0.8;
      lastTime = time;

      ScreenQuad.material = GSMaterial;
      uniforms.delta.value = dt;
      uniforms.feed.value = feed;
      uniforms.kill.value = kill;

      for(var i=0; i<8; ++i)
      {
          if(!toggled)
          {
              uniforms.tSource.value = texture1;
              renderer.render(scene, camera, texture2, true);
              uniforms.tSource.value = texture2;
          }
          else
          {
              uniforms.tSource.value = texture2;
              renderer.render(scene, camera, texture1, true);
              uniforms.tSource.value = texture1;
          }

          toggled = !toggled;
          uniforms.brush.value = minusOnes;
      }

      ScreenQuad.material = ScreenMaterial;
      renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
}
