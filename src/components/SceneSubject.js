import * as THREE from 'three'
import alphaTexture from '../stripes_gradient.jpg';

export default (scene,camera,renderer,canvas) => {

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

    uniforms.brush.value = new THREE.Vector2(0.5, 0.5);
    lastTime = new Date().getTime();


    function deformGeometry(geometry) {
        for (let i=0; i<geometry.vertices.length; i+=2) {
            const scalar = 1 + Math.random()*0.8;
            geometry.vertices[i].multiplyScalar(scalar)
        }

        return geometry;
    }

    function update(time) {
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

    }

    function Resize(width, height) {

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

    function onMouseMove(x, y) {
        mousePosition.x = x;
        mousePosition.y = y;

        if(mouseDown)
          uniforms.brush.value = new THREE.Vector2(mousePosition.x/canvas.width, 1-mousePosition.x/canvas.height);
    }

    function onMouseDown() {
        mouseDown = true;
        uniforms.brush.value = new THREE.Vector2(mousePosition.x/canvas.width, 1-mousePosition.x/canvas.height);
        console.log('mouse DOWN');
    }

    function onMouseUp() {
        mouseDown = false;
    }

    return {
        update,
        Resize,
        onMouseMove,
        onMouseDown,
        onMouseUp
    }
}
