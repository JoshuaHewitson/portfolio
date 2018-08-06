(function(){

// Canvas.
var canvas;
var canvasQ;
var canvasWidth;
var canvasHeight;

var mMouseX, mMouseY;
var mMouseDown = false;

var mRenderer;
var mScene;
var mCamera;
var mUniforms;
var mColors;
var mColorsNeedUpdate = true;
var mLastTime = 0;

var speed = 0.1;

var mTexture1, mTexture2;
var mGSMaterial, mScreenMaterial;
var mScreenQuad;

var mToggled = false;

var mMinusOnes = new THREE.Vector2(-1, -1);

var presets = [
    { // Default
        feed: 0.026,
        kill: 0.051
    },
    { // Solitons
        feed: 0.035,
        kill: 0.059
    },
    { // Pulsating solitons
        feed: 0.024,
        kill: 0.055
    },
    { //
        feed: 0.014,
        kill: 0.045
    },
    { // worms
        feed: 0.025,
        kill: 0.06
    },
    { // Holes
        feed: 0.018,
        kill: 0.051
    },
    { // Chaos
        feed: 0.026,
        kill: 0.051
    },
    { // Chaos and holes (by clem)
        feed: 0.034,
        kill: 0.056
    },
    { // Moving spots.
        feed: 0.014,
        kill: 0.054
    },
    { // Spots and loops.
        feed: 0.018,
        kill: 0.051
    },
    { // Waves
        feed: 0.014,
        kill: 0.045
    },
    { // The U-Skate World
        feed: 0.062,
        kill: 0.06093
    }
];

//color preset counter
var presetIndex=0;
//color presets
var colorValues = [
  [
    [0, '#78DCA0'],
    [0.182, '#E87856'],
    [0.212, '#000000'],
    [0.227, '#B2F3B8'],
    [0.333, '#74B299']
  ],
  [
    [0, '#FF9053'],
    [0.159, '#DE00FF'],
    [0.227, '#00FCFF'],
    [0.288, '#2A00FF'],
    [0.326, '#000000']
  ],
  [
    [0, '#FFFFFF'],
    [0.288, '#000000'],
    [0.326, '#6F6F6F'],
    [0.333, '#FFFFFF'],
    [0.894, '#454545']
  ],
  [
    [0, '#8BFFDD'],
    [0.257, '#EA7950'],
    [0.356, '#000000'],
    [0.364, '#88C8B7'],
    [0.742, '#22413D']
  ],
  [
    [0, '#78DCA0'],
    [0.18181818181818182, '#E87856'],
    [0.21212121212121213, '#000000'],
    [0.22727272727272727, '#B2F3B8'],
    [0.3333333333333333, '#74B299']
  ],
  [
    [0, '#FFFFFF'],
    [0.144, '#1E00FF'],
    [0.159, '#FFFFFF'],
    [0.371, '#FFFFFF'],
    [0.697, '#FFFFFF']
  ],
]

var speeds = [
  0.1,
  0.8,
  0.1,
  0.1,
  0.1,
  0.5
]

// Configuration.
var feed = presets[0].feed;
var kill = presets[0].kill;

init = function()
{
    init_controls();

    canvasQ = $('#myCanvas');
    canvas = canvasQ.get(0);

    canvas.onmousedown = onMouseDown;
    canvas.onmouseup = onMouseUp;
    canvas.onmousemove = onMouseMove;

    mRenderer = new THREE.WebGLRenderer({canvas: canvas, preserveDrawingBuffer: true});

    mScene = new THREE.Scene();
    mCamera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, -10000, 10000);
    mCamera.position.z = 100;
    mScene.add(mCamera);

    mUniforms = {
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
    mColors = [mUniforms.color1, mUniforms.color2, mUniforms.color3, mUniforms.color4, mUniforms.color5];
    $("#gradient").gradient("setUpdateCallback", onUpdatedColor);

    mGSMaterial = new THREE.ShaderMaterial({
            uniforms: mUniforms,
            vertexShader: document.getElementById('standardVertexShader').textContent,
            fragmentShader: document.getElementById('gsFragmentShader').textContent,
        });
    mScreenMaterial = new THREE.ShaderMaterial({
                uniforms: mUniforms,
                vertexShader: document.getElementById('standardVertexShader').textContent,
                fragmentShader: document.getElementById('screenFragmentShader').textContent,
            });

    var plane = new THREE.PlaneGeometry(1.0, 1.0);
    mScreenQuad = new THREE.Mesh(plane, mScreenMaterial);
    mScene.add(mScreenQuad);

    mColorsNeedUpdate = true;

    resize(canvas.clientWidth, canvas.clientHeight);

    render(0);
    mUniforms.brush.value = new THREE.Vector2(0.5, 0.5);
    mLastTime = new Date().getTime();
    requestAnimationFrame(render);
}

var resize = function(width, height)
{
    // Set the new shape of canvas.
    canvasQ.width(width);
    canvasQ.height(height);

    // Get the real size of canvas.
    canvasWidth = canvasQ.width();
    canvasHeight = canvasQ.height();

    mRenderer.setSize(canvasWidth, canvasHeight);

    // TODO: Possible memory leak?
    mTexture1 = new THREE.WebGLRenderTarget(canvasWidth/2, canvasHeight/2,
                        {minFilter: THREE.LinearFilter,
                         magFilter: THREE.LinearFilter,
                         format: THREE.RGBAFormat,
                         type: THREE.FloatType});
    mTexture2 = new THREE.WebGLRenderTarget(canvasWidth/2, canvasHeight/2,
                        {minFilter: THREE.LinearFilter,
                         magFilter: THREE.LinearFilter,
                         format: THREE.RGBAFormat,
                         type: THREE.FloatType});
    mTexture1.wrapS = THREE.RepeatWrapping;
    mTexture1.wrapT = THREE.RepeatWrapping;
    mTexture2.wrapS = THREE.RepeatWrapping;
    mTexture2.wrapT = THREE.RepeatWrapping;

    mUniforms.screenWidth.value = canvasWidth/2;
    mUniforms.screenHeight.value = canvasHeight/2;
}

var render = function(time)
{
    var dt = (time - mLastTime)/10.0;
    if(dt > speed || dt<=0)
        dt = speed;
    mLastTime = time;

    mScreenQuad.material = mGSMaterial;
    mUniforms.delta.value = dt;
    mUniforms.feed.value = feed;
    mUniforms.kill.value = kill;

    for(var i=0; i<8; ++i)
    {
        if(!mToggled)
        {
            mUniforms.tSource.value = mTexture1;
            mRenderer.render(mScene, mCamera, mTexture2, true);
            mUniforms.tSource.value = mTexture2;
        }
        else
        {
            mUniforms.tSource.value = mTexture2;
            mRenderer.render(mScene, mCamera, mTexture1, true);
            mUniforms.tSource.value = mTexture1;
        }

        mToggled = !mToggled;
        mUniforms.brush.value = mMinusOnes;
    }

    if(mColorsNeedUpdate)
        updateUniformsColors();

    mScreenQuad.material = mScreenMaterial;
    mRenderer.render(mScene, mCamera);

    requestAnimationFrame(render);
}

loadPreset = function(idx)
{
    feed = presets[idx].feed;
    kill = presets[idx].kill;
    worldToForm();
}


var updateUniformsColors = function()
{
    $("#gradient").gradient("setValues", colorValues[presetIndex]);
    if(presetIndex >= colorValues.length-1){
      presetIndex=0;
    } else {
      presetIndex++;
    }
    var values = $("#gradient").gradient("getValuesRGBS");
    for(var i=0; i<values.length; i++)
    {
        console.log(values[i]);
        var v = values[i];
        mColors[i].value = new THREE.Vector4(v[0], v[1], v[2], v[3]);
    }
    mColorsNeedUpdate = false;
}



var onMouseMove = function(e)
{
    var ev = e ? e : window.event;

    mMouseX = ev.pageX - canvasQ.offset().left; // these offsets work with
    mMouseY = ev.pageY - canvasQ.offset().top; //  scrolled documents too

    mUniforms.brush.value = new THREE.Vector2(mMouseX/canvasWidth, 1-mMouseY/canvasHeight);
}

var onMouseDown = function(e)
{
    var ev = e ? e : window.event;
    mMouseDown = true;
    clean();
    loadPreset(presetIndex);
    speed = speeds[presetIndex]
    mColorsNeedUpdate = true;
}

var onMouseUp = function(e)
{
    mMouseDown = false;
}

var onUpdatedColor = function()
{
    mColorsNeedUpdate = true;
}

clean = function()
{
    mUniforms.brush.value = new THREE.Vector2(-10, -10);
}


var worldToForm = function()
{
    //document.ex.sldReplenishment.value = feed * 1000;
    $("#sld_replenishment").slider("value", feed);
    $("#sld_diminishment").slider("value", kill);
}

var init_controls = function()
{
    $("#sld_replenishment").slider({
        value: feed, min: 0, max:0.1, step:0.001,
        change: function(event, ui) {$("#replenishment").html(ui.value); feed = ui.value; updateShareString();},
        slide: function(event, ui) {$("#replenishment").html(ui.value); feed = ui.value; updateShareString();}
    });
    $("#sld_replenishment").slider("value", feed);
    $("#sld_diminishment").slider({
        value: kill, min: 0, max:0.073, step:0.001,
        change: function(event, ui) {$("#diminishment").html(ui.value); kill = ui.value; updateShareString();},
        slide: function(event, ui) {$("#diminishment").html(ui.value); kill = ui.value; updateShareString();}
    });
    $("#sld_diminishment").slider("value", kill);

    $('#share').keypress(function (e) {
        if (e.which == 13) {
            parseShareString();
            return false;
        }
    });

    $("#btn_clear").button({
        icons : {primary : "ui-icon-document"},
        text : false
    });
    $("#btn_snapshot").button({
        icons : {primary : "ui-icon-image"},
        text : false
    });
    $("#btn_fullscreen").button({
        icons : {primary : "ui-icon-arrow-4-diag"},
        text : false
    });

    $("#notworking").click(function(){
        $("#requirement_dialog").dialog("open");
    });
    $("#requirement_dialog").dialog({
        autoOpen: false
    });
}

alertInvalidShareString = function()
{
    $("#share").val("Invalid string!");
    setTimeout(updateShareString, 1000);
}



updateShareString = function()
{
    var str = "".concat(feed, ",", kill);

    var values = $("#gradient").gradient("getValues");
    for(var i=0; i<values.length; i++)
    {
        var v = values[i];
        str += "".concat(",", v[0], ",", v[1]);
    }
    $("#share").val(str);
}

})();