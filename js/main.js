//global vars
var gl;
var shaderProgram;

var mvMatrix = mat4.create();
var mvMatrixStack = [];
var pMatrix = mat4.create();
var mesh;


//house variables
var houseActive = true;
var xHouseRot = 0;
var xHouseSpeed = 0;
var yHouseRot = 0;
var yHouseSpeed = 0;
var scaleHouseActive = false;
var translateHouseActive = false;
var shearHouseActive = false;
var rotateHouseActive = true;
var open = false;
var xHouseScale = 1.0;
var yHouseScale = 1.0;
var zHouseScale = 1.0;
var xHouseShear = 0;
var yHouseShear = 0;
var zHouseShear = 0;
var xHouseTranslate = 0.0;
var yHouseTranslate = 0.0;
var zHouseTranslate = 0.0;

//tree variables
var treeActive = false;
var xTreeRot = 0;
var xTreeSpeed = 0;
var yTreeRot = 0;
var yTreeSpeed = 0;
var scaleTreeActive = false;
var translateTreeActive = false;
var shearTreeActive = false;
var rotateTreeActive = true;
var xTreeScale = 1.0;
var yTreeScale = 1.0;
var zTreeScale = 1.0;
var xTreeShear = 0;
var yTreeShear = 0;
var zTreeShear = 0;
var xTreeTranslate = 0.0;
var yTreeTranslate = 0.0;
var zTreeTranslate = -8.0;
var lines = false;
var points = false;
var triangles = true;


var z = -15.0;


var cubeVertexPositionBuffer;
var cubeVertexNormalBuffer;
var cubeVertexTextureCoordBuffer;
var cubeVertexIndexBuffer;

var cubeTreeVertexPositionBuffer;
var cubeTreeVertexNormalBuffer;
var cubeTreeVertexTextureCoordBuffer;
var cubeTreeVertexIndexBuffer; 

var trianglesVerticeBuffer;
var triangleVerticesIndexBuffer;
var triangleTexCoords;
var trianglesTexCoordBuffer;
var trianglesColorBuffer;
var coordinateArray = [];
var verticesIndexArray;

var squareVertexPositionBuffer;
var squareVertexTextureBuffer;

var doorVertexPositionBuffer;
var doorVertexTextureBuffer; 

var doorLeftPositionBuffer;
var doorLeftTextureBuffer;
var doorRightPositionBuffer;
var doorRightTextureBuffer;

var treeVertexPositionBuffer;
var treeVertexNormalBuffer;
var treeVertexTextureCoordBuffer;
var treeVertexIndexBuffer;

var sunVertexPositionBuffer;
var sunVertexNormalBuffer;
var sunVertexTextureCoordBuffer;
var sunVertexIndexBuffer;


var sandVertexPositionBuffer;
var sandVertexNormalBuffer;
var sandVertexTextureCoordBuffer;
var sandVertexIndexBuffer;

function initBuffers() {
  
    cubeVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
    vertices = [
        // Front face
        -1.0, -1.0,  1.0,
         1.0, -1.0,  1.0,
         1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,

        // Back face
        -1.0, -1.0, -1.0,
        -1.0,  1.0, -1.0,
         1.0,  1.0, -1.0,
         1.0, -1.0, -1.0,

        // Top face
        -1.0,  1.0, -1.0,
        -1.0,  1.0,  1.0,
         1.0,  1.0,  1.0,
         1.0,  1.0, -1.0,

        // Bottom face
        -1.0, -1.0, -1.0,
         1.0, -1.0, -1.0,
         1.0, -1.0,  1.0,
        -1.0, -1.0,  1.0,

        // Right face
         1.0, -1.0,  -1.0,
         1.0,  1.0,  -1.0,
         1.0,  1.0,  -1.0,
         1.0, -1.0,  -1.0,

        // Left face
        -1.0, -1.0, -1.0,
        -1.0, -1.0,  1.0,
        -1.0,  1.0,  1.0,
        -1.0,  1.0, -1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    cubeVertexPositionBuffer.itemSize = 3;
    cubeVertexPositionBuffer.numItems = 24;

    cubeVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexNormalBuffer);
    var vertexNormals = [
        // Front face
         0.0,  0.0,  1.0,
         0.0,  0.0,  1.0,
         0.0,  0.0,  1.0,
         0.0,  0.0,  1.0,

        // Back face
         0.0,  0.0, -1.0,
         0.0,  0.0, -1.0,
         0.0,  0.0, -1.0,
         0.0,  0.0, -1.0,

        // Top face
         0.0,  1.0,  0.0,
         0.0,  1.0,  0.0,
         0.0,  1.0,  0.0,
         0.0,  1.0,  0.0,

        // Bottom face
         0.0, -1.0,  0.0,
         0.0, -1.0,  0.0,
         0.0, -1.0,  0.0,
         0.0, -1.0,  0.0,

        // Right face
         1.0,  0.0,  0.0,
         1.0,  0.0,  0.0,
         1.0,  0.0,  0.0,
         1.0,  0.0,  0.0,

        // Left face
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW);
    cubeVertexNormalBuffer.itemSize = 3;
    cubeVertexNormalBuffer.numItems = 24;

    cubeVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexTextureCoordBuffer);
    var textureCoords = [
        // Front face
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,

        // Back face
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,

        // Top face
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,

        // Bottom face
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,

        // Right face
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,

        // Left face
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    cubeVertexTextureCoordBuffer.itemSize = 2;
    cubeVertexTextureCoordBuffer.numItems = 24;

    cubeVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
    var cubeVertexIndices = [
        0, 1, 2,      0, 2, 3,    // Front face
        4, 5, 6,      4, 6, 7,    // Back face
        8, 9, 10,     8, 10, 11,  // Top face
        12, 13, 14,   12, 14, 15, // Bottom face
        16, 17, 18,   16, 18, 19, // Right face
        20, 21, 22,   20, 22, 23  // Left face
    ];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
    cubeVertexIndexBuffer.itemSize = 1;
    cubeVertexIndexBuffer.numItems = 36;
    //starts pyramid
    trianglesVerticeBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesVerticeBuffer);
        var vertices = [
    // Front face

       // Front face
         0.0,  1.0,  0.0,
        -1.0, -1.0,  1.0,
         1.0, -1.0,  1.0,
        // Right face
         0.0,  1.0,  0.0,
         1.0, -1.0,  1.0,
         1.0, -1.0, -1.0,
        // Back face
         0.0,  1.0,  0.0,
         1.0, -1.0, -1.0,
        -1.0, -1.0, -1.0,
        // Left face
         0.0,  1.0,  0.0,
        -1.0, -1.0, -1.0,
        -1.0, -1.0,  1.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    trianglesVerticeBuffer.itemSize = 3;
    trianglesVerticeBuffer.numItems = 12;


    var verticesIndexArray = [
            0, 1, 2,
            3, 4, 5,
            6, 7, 8,
            9, 10, 11,
            12, 13, 14,
            15, 16, 17,
        ];
    triangleVerticesIndexBuffer = gl.createBuffer();
    triangleVerticesIndexBuffer.number_vertext_points = verticesIndexArray.length;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleVerticesIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(verticesIndexArray), gl.STATIC_DRAW); 

    triangleTexCoords = [
        0.5000, 0.1910,
        0.1910, 0.5000,
        0.5000, 0.8090,
        0.5000, 0.1910,
        0.5000, 0.8090,
        0.8090, 0.5000,

        0.5000, 0.1910,
        0.8090, 0.5000,
        1.0000, 0.0000,

        0.8090, 0.5000,
        0.5000, 0.8090,
        1.0000, 1.0000,

        0.5000, 0.8090,
        0.1910, 0.5000,
        0.0000, 1.0000,

        0.1910, 0.5000,
        0.5000, 0.1910,
        0.0000, 0.0000,
    ];

    trianglesTexCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesTexCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleTexCoords), gl.STATIC_DRAW);
    //starts cube tree
    cubeTreeVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeTreeVertexPositionBuffer);
    vertices = [
        // Front face
        -1.0, -1.0,  1.0,
         1.0, -1.0,  1.0,
         1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,

        // Back face
        -1.0, -1.0, -1.0,
        -1.0,  1.0, -1.0,
         1.0,  1.0, -1.0,
         1.0, -1.0, -1.0,

        // Top face
        -1.0,  1.0, -1.0,
        -1.0,  1.0,  1.0,
         1.0,  1.0,  1.0,
         1.0,  1.0, -1.0,

        // Bottom face
        -1.0, -1.0, -1.0,
         1.0, -1.0, -1.0,
         1.0, -1.0,  1.0,
        -1.0, -1.0,  1.0,

        // Right face
         1.0, -1.0, -1.0,
         1.0,  1.0, -1.0,
         1.0,  1.0,  1.0,
         1.0, -1.0,  1.0,

        // Left face
        -1.0, -1.0, -1.0,
        -1.0, -1.0,  1.0,
        -1.0,  1.0,  1.0,
        -1.0,  1.0, -1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    cubeTreeVertexPositionBuffer.itemSize = 3;
    cubeTreeVertexPositionBuffer.numItems = 24;

    cubeTreeVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeTreeVertexNormalBuffer);
    var vertexNormals = [
        // Front face
         0.0,  0.0,  1.0,
         0.0,  0.0,  1.0,
         0.0,  0.0,  1.0,
         0.0,  0.0,  1.0,

        // Back face
         0.0,  0.0, -1.0,
         0.0,  0.0, -1.0,
         0.0,  0.0, -1.0,
         0.0,  0.0, -1.0,

        // Top face
         0.0,  1.0,  0.0,
         0.0,  1.0,  0.0,
         0.0,  1.0,  0.0,
         0.0,  1.0,  0.0,

        // Bottom face
         0.0, -1.0,  0.0,
         0.0, -1.0,  0.0,
         0.0, -1.0,  0.0,
         0.0, -1.0,  0.0,

        // Right face
         1.0,  0.0,  0.0,
         1.0,  0.0,  0.0,
         1.0,  0.0,  0.0,
         1.0,  0.0,  0.0,

        // Left face
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW);
    cubeTreeVertexNormalBuffer.itemSize = 3;
    cubeTreeVertexNormalBuffer.numItems = 24;

    cubeTreeVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeTreeVertexTextureCoordBuffer);
    var textureCoords = [
        // Front face
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,

        // Back face
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,

        // Top face
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,

        // Bottom face
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,

        // Right face
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,

        // Left face
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    cubeTreeVertexTextureCoordBuffer.itemSize = 2;
    cubeTreeVertexTextureCoordBuffer.numItems = 24;

    cubeTreeVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeTreeVertexIndexBuffer);
    var cubeTreeVertexIndices = [
        0, 1, 2,      0, 2, 3,    // Front face
        4, 5, 6,      4, 6, 7,    // Back face
        8, 9, 10,     8, 10, 11,  // Top face
        12, 13, 14,   12, 14, 15, // Bottom face
        16, 17, 18,   16, 18, 19, // Right face
        20, 21, 22,   20, 22, 23  // Left face
    ];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeTreeVertexIndices), gl.STATIC_DRAW);
    cubeTreeVertexIndexBuffer.itemSize = 1;
    cubeTreeVertexIndexBuffer.numItems = 36;

    //window
    squareVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
    vertices = [
         1.0,  1.0,  0.0,
        -1.0,  1.0,  0.0,
         1.0, -1.0,  0.0,
        -1.0, -1.0,  0.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    squareVertexPositionBuffer.itemSize = 3;
    squareVertexPositionBuffer.numItems = 4;
    squareVertexTextureBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexTextureBuffer);
    colors = [
         1.0,  1.0,  
        -1.0,  1.0, 
         1.0, -1.0, 
        -1.0, -1.0, 
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    squareVertexTextureBuffer.itemSize = 2;
    squareVertexTextureBuffer.numItems = 4;
    //door
    doorVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, doorVertexPositionBuffer);
    vertices = [
         1.0,  1.0,  0.0,
        -1.0,  1.0,  0.0,
         1.0, -1.0,  0.0,
        -1.0, -1.0,  0.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    doorVertexPositionBuffer.itemSize = 3;
    doorVertexPositionBuffer.numItems = 4;
    doorVertexTextureBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, doorVertexTextureBuffer);
    colors = [
         1.0,  1.0,  
        -1.0,  1.0, 
         1.0, -1.0, 
        -1.0, -1.0, 
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    doorVertexTextureBuffer.itemSize = 2;
    doorVertexTextureBuffer.numItems = 4;
    //door left
    doorLeftPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, doorLeftPositionBuffer);
    vertices = [
         1.0,  1.0,  0.0,
        -1.0,  1.0,  0.0,
         1.0, -1.0,  0.0,
        -1.0, -1.0,  0.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    doorLeftPositionBuffer.itemSize = 3;
    doorLeftPositionBuffer.numItems = 4;
    doorLeftTextureBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, doorLeftTextureBuffer);
    colors = [
         1.0,  1.0,  
        -1.0,  1.0, 
         1.0, -1.0, 
        -1.0, -1.0, 
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    doorLeftTextureBuffer.itemSize = 2;
    doorLeftTextureBuffer.numItems = 4;
    //door rigth
    doorRightPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, doorRightPositionBuffer);
    vertices = [
         1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,
         1.0, -1.0,  1.0,
        -1.0, -1.0,  1.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    doorRightPositionBuffer.itemSize = 3;
    doorRightPositionBuffer.numItems = 4;
    doorRightTextureBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, doorRightTextureBuffer);
    colors = [
         1.0,  1.0,  
        -1.0,  1.0, 
         1.0, -1.0, 
        -1.0, -1.0, 
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    doorRightTextureBuffer.itemSize = 2;
    doorRightTextureBuffer.numItems = 4;

    //top tree
    var latitudeBands = 30;
    var longitudeBands = 30;
    var radius = 2;
    var vertexPositionData = [];
    var normalData = [];
    var textureCoordData = [];
    for (var latNumber=0; latNumber <= latitudeBands; latNumber++) {
        var theta = latNumber * Math.PI / latitudeBands;
        var sinTheta = Math.sin(theta);
        var cosTheta = Math.cos(theta);
        for (var longNumber=0; longNumber <= longitudeBands; longNumber++) {
            var phi = longNumber * 2 * Math.PI / longitudeBands;
            var sinPhi = Math.sin(phi);
            var cosPhi = Math.cos(phi);
            var x = cosPhi * sinTheta;
            var y = cosTheta;
            var z = sinPhi * sinTheta;
            var u = 1 - (longNumber / longitudeBands);
            var v = 1 - (latNumber / latitudeBands);
            normalData.push(x);
            normalData.push(y);
            normalData.push(z);
            textureCoordData.push(u);
            textureCoordData.push(v);
            vertexPositionData.push(radius * x);
            vertexPositionData.push(radius * y);
            vertexPositionData.push(radius * z);
        }
    }
    var indexData = [];
    for (var latNumber=0; latNumber < latitudeBands; latNumber++) {
        for (var longNumber=0; longNumber < longitudeBands; longNumber++) {
            var first = (latNumber * (longitudeBands + 1)) + longNumber;
            var second = first + longitudeBands + 1;
            indexData.push(first);
            indexData.push(second);
            indexData.push(first + 1);
            indexData.push(second);
            indexData.push(second + 1);
            indexData.push(first + 1);
        }
    }
    treeVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, treeVertexNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalData), gl.STATIC_DRAW);
    treeVertexNormalBuffer.itemSize = 3;
    treeVertexNormalBuffer.numItems = normalData.length / 3;
    treeVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, treeVertexTextureCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordData), gl.STATIC_DRAW);
    treeVertexTextureCoordBuffer.itemSize = 2;
    treeVertexTextureCoordBuffer.numItems = textureCoordData.length / 2;
    treeVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, treeVertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositionData), gl.STATIC_DRAW);
    treeVertexPositionBuffer.itemSize = 3;
    treeVertexPositionBuffer.numItems = vertexPositionData.length / 3;
    treeVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, treeVertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STATIC_DRAW);
    treeVertexIndexBuffer.itemSize = 1;
    treeVertexIndexBuffer.numItems = indexData.length;


    //sun sphere

    sunVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sunVertexNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalData), gl.STATIC_DRAW);
    sunVertexNormalBuffer.itemSize = 3;
    sunVertexNormalBuffer.numItems = normalData.length / 3;
    sunVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sunVertexTextureCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordData), gl.STATIC_DRAW);
    sunVertexTextureCoordBuffer.itemSize = 2;
    sunVertexTextureCoordBuffer.numItems = textureCoordData.length / 2;
    sunVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sunVertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositionData), gl.STATIC_DRAW);
    sunVertexPositionBuffer.itemSize = 3;
    sunVertexPositionBuffer.numItems = vertexPositionData.length / 3;
    sunVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sunVertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STATIC_DRAW);
    sunVertexIndexBuffer.itemSize = 1;
    sunVertexIndexBuffer.numItems = indexData.length;

    //starts sand
    sandVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sandVertexPositionBuffer);
    vertices = [
        // Front face
        -1.0, -1.0,  1.0,
         1.0, -1.0,  1.0,
         1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,

        // Back face
        -1.0, -1.0, -1.0,
        -1.0,  1.0, -1.0,
         1.0,  1.0, -1.0,
         1.0, -1.0, -1.0,

        // Top face
        -1.0,  1.0, -1.0,
        -1.0,  1.0,  1.0,
         1.0,  1.0,  1.0,
         1.0,  1.0, -1.0,

        // Bottom face
        -1.0, -1.0, -1.0,
         1.0, -1.0, -1.0,
         1.0, -1.0,  1.0,
        -1.0, -1.0,  1.0,

        // Right face
         1.0, -1.0,  -1.0,
         1.0,  1.0,  -1.0,
         1.0,  1.0,  -1.0,
         1.0, -1.0,  -1.0,

        // Left face
        -1.0, -1.0, -1.0,
        -1.0, -1.0,  1.0,
        -1.0,  1.0,  1.0,
        -1.0,  1.0, -1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    sandVertexPositionBuffer.itemSize = 3;
    sandVertexPositionBuffer.numItems = 24;

    sandVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sandVertexNormalBuffer);
    var vertexNormals = [
        // Front face
         0.0,  0.0,  1.0,
         0.0,  0.0,  1.0,
         0.0,  0.0,  1.0,
         0.0,  0.0,  1.0,

        // Back face
         0.0,  0.0, -1.0,
         0.0,  0.0, -1.0,
         0.0,  0.0, -1.0,
         0.0,  0.0, -1.0,

        // Top face
         0.0,  1.0,  0.0,
         0.0,  1.0,  0.0,
         0.0,  1.0,  0.0,
         0.0,  1.0,  0.0,

        // Bottom face
         0.0, -1.0,  0.0,
         0.0, -1.0,  0.0,
         0.0, -1.0,  0.0,
         0.0, -1.0,  0.0,

        // Right face
         1.0,  0.0,  0.0,
         1.0,  0.0,  0.0,
         1.0,  0.0,  0.0,
         1.0,  0.0,  0.0,

        // Left face
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW);
    sandVertexNormalBuffer.itemSize = 3;
    sandVertexNormalBuffer.numItems = 24;

    sandVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sandVertexTextureCoordBuffer);
    var textureCoords = [
        // Front face
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,

        // Back face
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,

        // Top face
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,

        // Bottom face
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,

        // Right face
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,

        // Left face
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    sandVertexTextureCoordBuffer.itemSize = 2;
    sandVertexTextureCoordBuffer.numItems = 24;

    sandVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sandVertexIndexBuffer);
    var sandVertexIndices = [
        0, 1, 2,      0, 2, 3,    // Front face
        4, 5, 6,      4, 6, 7,    // Back face
        8, 9, 10,     8, 10, 11,  // Top face
        12, 13, 14,   12, 14, 15, // Bottom face
        16, 17, 18,   16, 18, 19, // Right face
        20, 21, 22,   20, 22, 23  // Left face
    ];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(sandVertexIndices), gl.STATIC_DRAW);
    sandVertexIndexBuffer.itemSize = 1;
    sandVertexIndexBuffer.numItems = 36;
}


function drawScene() {
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);

    mat4.identity(mvMatrix);
    mvPushMatrix();
    mat4.translate(mvMatrix, [0.0, 0.0, z]);

    //rotate house
    if (xHouseTranslate < 0) {
        mat4.translate(mvMatrix, [xHouseTranslate <= 0? xHouseTranslate: -xHouseTranslate ,yHouseTranslate <= 0? yHouseTranslate: -yHouseTranslate, -zHouseTranslate <= 0? zHouseTranslate: -zHouseTranslate]);   
        mat4.rotate(mvMatrix, degToRad(xHouseRot), [1, 0, 0]);
        mat4.rotate(mvMatrix, degToRad(yHouseRot), [0, 1, 0]);
        mat4.translate(mvMatrix, [xHouseTranslate >= 0? xHouseTranslate: -xHouseTranslate ,yHouseTranslate >= 0? yHouseTranslate: -yHouseTranslate, -zHouseTranslate >= 0? zHouseTranslate: -zHouseTranslate]);   
    }
    else {
        mat4.translate(mvMatrix, [xHouseTranslate >= 0? xHouseTranslate: -xHouseTranslate ,yHouseTranslate <= 0? yHouseTranslate: -yHouseTranslate, -zHouseTranslate <= 0? zHouseTranslate: -zHouseTranslate]);   
        mat4.rotate(mvMatrix, degToRad(xHouseRot), [1, 0, 0]);
        mat4.rotate(mvMatrix, degToRad(yHouseRot), [0, 1, 0]);
        mat4.translate(mvMatrix, [xHouseTranslate <= 0? xHouseTranslate: -xHouseTranslate ,yHouseTranslate >= 0? yHouseTranslate: -yHouseTranslate, -zHouseTranslate >= 0? zHouseTranslate: -zHouseTranslate]);   
    }
    //scale house
    mat4.scale(mvMatrix, [xHouseScale, yHouseScale, zHouseScale]);
      if (xHouseTranslate < 0) {
        mat4.translate(mvMatrix, [xHouseTranslate <= 0? xHouseTranslate: -xHouseTranslate ,yHouseTranslate <= 0? yHouseTranslate: -yHouseTranslate, -zHouseTranslate <= 0? zHouseTranslate: -zHouseTranslate]);   
        mat4.scale(mvMatrix, [xHouseScale, yHouseScale, zHouseScale]);
        mat4.translate(mvMatrix, [xHouseTranslate >= 0? xHouseTranslate: -xHouseTranslate ,yHouseTranslate >= 0? yHouseTranslate: -yHouseTranslate, -zHouseTranslate >= 0? zHouseTranslate: -zHouseTranslate]);   
    }
    else {
        mat4.translate(mvMatrix, [xHouseTranslate >= 0? xHouseTranslate: -xHouseTranslate ,yHouseTranslate <= 0? yHouseTranslate: -yHouseTranslate, -zHouseTranslate <= 0? zHouseTranslate: -zHouseTranslate]);   
        mat4.scale(mvMatrix, [xHouseScale, yHouseScale, zHouseScale]);
        mat4.translate(mvMatrix, [xHouseTranslate <= 0? xHouseTranslate: -xHouseTranslate ,yHouseTranslate >= 0? yHouseTranslate: -yHouseTranslate, -zHouseTranslate >= 0? zHouseTranslate: -zHouseTranslate]);   
    }
    //translate house
    mat4.translate(mvMatrix, [xHouseTranslate, yHouseTranslate, zHouseTranslate]);   
   
    mvMatrix = shearMatrix(mvMatrix, xHouseShear, yHouseShear, zHouseShear);
   
    mvPushMatrix()
    mat4.scale(mvMatrix, [2.0, 2.0, 2.0]);

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cubeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexNormalBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, cubeVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexTextureCoordBuffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, cubeVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, crateTexture);
    gl.uniform1i(shaderProgram.samplerUniform, 0);
    var lighting = true;
    gl.uniform1i(shaderProgram.useLightingUniform, lighting);
    if (lighting) {
        gl.uniform3f(
            shaderProgram.ambientColorUniform,
            0.2,
            0.2,
            0.2
        );

        var lightingDirection = [
            -0.5,
            -0.5,
            -1.0
        ];
        var adjustedLD = vec3.create();
        vec3.normalize(lightingDirection, adjustedLD);
        vec3.scale(adjustedLD, -1);
        gl.uniform3fv(shaderProgram.lightingDirectionUniform, adjustedLD);

        gl.uniform3f(
            shaderProgram.directionalColorUniform,
            0.9,
            0.9,
            0.9
        );
    }

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
    setMatrixUniforms();

    if (lines) {
        gl.drawElements(gl.LINES, cubeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    } else if (triangles) {
        gl.drawElements(gl.TRIANGLES, cubeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    } else if (points) {
        gl.drawElements(gl.POINTS, cubeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    }

    mvPopMatrix();
    mat4.translate(mvMatrix, [0.0, 2.0, 0.0]);
    //pyramid
    mvPushMatrix();
    mat4.scale(mvMatrix, [2.0, 2.0, 2.0]);
    mat4.translate(mvMatrix, [0.0, 1.0, 0.0]);
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesVerticeBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, trianglesVerticeBuffer.itemSize, gl.FLOAT, false, 0, 0);

   /* gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexNormalBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, cubeVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);*/

    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesTexCoordBuffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, roofTopTexture);
    gl.uniform1i(shaderProgram.samplerUniform, 1);

    
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleVerticesIndexBuffer);
    setMatrixUniforms();
    if (lines) {
        gl.drawArrays(gl.LINES, 0, trianglesVerticeBuffer.numItems);
    } else if (triangles) {
        gl.drawArrays(gl.TRIANGLES, 0, trianglesVerticeBuffer.numItems);
    } else if (points) {
        gl.drawArrays(gl.POINTS, 0, trianglesVerticeBuffer.numItems);    
    }
 
    mvPopMatrix();
    //window
    mvPushMatrix();
    mat4.scale(mvMatrix, [2.0, 2.0, 2.0]);
    mat4.scale(mvMatrix, [0.8, 0.5, 0.8]);
    mat4.translate(mvMatrix, [0.0, -1.5, 1.26]);
     gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexTextureBuffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, squareVertexTextureBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.activeTexture(gl.TEXTURE3);
    gl.bindTexture(gl.TEXTURE_2D, windowTexture);
    gl.uniform1i(shaderProgram.samplerUniform, 3);
    setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, squareVertexPositionBuffer.numItems);
    mvPopMatrix();
    //door draw
    mvPushMatrix();
    mat4.scale(mvMatrix, [2.0, 2.0, 2.0]);
    mat4.scale(mvMatrix, [0.8, 1.0, 0.6]);
    mat4.translate(mvMatrix, [1.26, -1.0, -0.1]);
    if (open === false) {
         mat4.rotate(mvMatrix, degToRad(90), [0, 1, 0]);
    } else {
        mat4.rotate(mvMatrix, degToRad(0), [0, 1, 0]);
        mat4.translate(mvMatrix, [1.0, 0.0, 1.0]);
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, doorVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, doorVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, doorVertexTextureBuffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, doorVertexTextureBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.activeTexture(gl.TEXTURE4);
    gl.bindTexture(gl.TEXTURE_2D, doorTexture);
    gl.uniform1i(shaderProgram.samplerUniform, 4);
    setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, doorVertexPositionBuffer.numItems);
    mvPopMatrix();
    //door left
    mvPushMatrix();

    mat4.scale(mvMatrix, [0.8, 2.0, 0.5]);
    mat4.translate(mvMatrix, [2.5, -1.0, 3.0]);
    mat4.rotate(mvMatrix, degToRad(90), [0, 1, 0]);
    gl.bindBuffer(gl.ARRAY_BUFFER, doorLeftPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, doorLeftPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, doorLeftTextureBuffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, doorLeftTextureBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, crateTexture);
    gl.uniform1i(shaderProgram.samplerUniform, 0);
    setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, doorLeftPositionBuffer.numItems);
    mvPopMatrix();
    //door rigth
    mvPushMatrix();

    mat4.scale(mvMatrix, [0.8, 2.0, 0.5]);
    mat4.translate(mvMatrix, [1.5, -1.0, -3.0]);
    mat4.rotate(mvMatrix, degToRad(90), [0, 1, 0]);
    gl.bindBuffer(gl.ARRAY_BUFFER, doorRightPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, doorRightPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, doorRightTextureBuffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, doorRightTextureBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.activeTexture(gl.TEXTURE5);
    gl.bindTexture(gl.TEXTURE_2D, wallSmall);
    gl.uniform1i(shaderProgram.samplerUniform, 5);
    setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, doorRightPositionBuffer.numItems);
    mvPopMatrix();
    mvPushMatrix();
    mat4.translate(mvMatrix, [0.0, -3.0, 0.0]);
    mat4.scale(mvMatrix, [0.5, 0.4, 0.5]);
    gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, mesh.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

    // it's possible that the mesh doesn't contain
    // any texture coordinates (e.g. suzanne.obj in the development branch).
    // in this case, the texture vertexAttribArray will need to be disabled
    // before the call to drawElements
    if(!mesh.textures.length){
     gl.disableVertexAttribArray(shaderProgram.textureCoordAttribute);
    }
    else{
      // if the texture vertexAttribArray has been previously
      // disabled, then it needs to be re-enabled
      gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
      gl.bindBuffer(gl.ARRAY_BUFFER, mesh.textureBuffer);
      gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, mesh.textureBuffer.itemSize, gl.FLOAT, false, 0, 0);

    }

    gl.bindBuffer(gl.ARRAY_BUFFER, mesh.normalBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, mesh.normalBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer);
    setMatrixUniforms();
    if (lines) {
        gl.drawElements(gl.LINES, mesh.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    } else if (triangles) {
        gl.drawElements(gl.TRIANGLES, mesh.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    } else if (points) {
        gl.drawElements(gl.POINTS, mesh.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    }
    mvPopMatrix();
    gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
    mvPopMatrix();
    mvPushMatrix();
    mat4.translate(mvMatrix, [0.0, 0.0, zTreeTranslate]);
    //Transformations for tree

    //rotate house

    //mat4.translate(mvMatrix, [xTreeTranslate >= 0? xTreeTranslate: -xTreeTranslate ,yTreeTranslate <= 0? yTreeTranslate: -yTreeTranslate, -zTreeTranslate <= 0? zTreeTranslate: -zTreeTranslate]);   
    mat4.translate(mvMatrix, [6.0+xTreeTranslate, -1.5+yTreeTranslate, zTreeTranslate]);
    mat4.rotate(mvMatrix, degToRad(xTreeRot), [1, 0, 0]);
    mat4.rotate(mvMatrix, degToRad(yTreeRot), [0, 1, 0]);
    mat4.translate(mvMatrix, [-6.0-xTreeTranslate, 1.5-yTreeTranslate, -zTreeTranslate]);
    //mat4.translate(mvMatrix, [xTreeTranslate <= 0? xTreeTranslate: -xTreeTranslate ,yTreeTranslate >= 0? yTreeTranslate: -yTreeTranslate, -zTreeTranslate >= 0? zTreeTranslate: -zTreeTranslate]);   
        
    
    //scale Tree
    mat4.translate(mvMatrix, [6.0+xTreeTranslate, -1.5+yTreeTranslate, zTreeTranslate]);
    mat4.scale(mvMatrix, [xTreeScale, yTreeScale, zTreeScale]);
    mat4.translate(mvMatrix, [-6.0-xTreeTranslate, 1.5-yTreeTranslate, -zTreeTranslate]);
    //translate Tree
    mat4.translate(mvMatrix, [xTreeTranslate, yTreeTranslate, zTreeTranslate]);   
    mat4.translate(mvMatrix, [6.0+xTreeTranslate, -1.5, 0.0]);
    mvMatrix = shearMatrix(mvMatrix, xTreeShear, yTreeShear, zTreeShear);
    mat4.translate(mvMatrix, [-6.0-xTreeTranslate, 1.5, 0.0]);
    mvPushMatrix();
    
   
    mat4.translate(mvMatrix, [6.0, -1.5, 0.0]);
    mat4.scale(mvMatrix, [0.8, 1.0, 0.8]);
    //cube tree
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeTreeVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cubeTreeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeTreeVertexNormalBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, cubeTreeVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeTreeVertexTextureCoordBuffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, cubeTreeVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, treeStructure);
    gl.uniform1i(shaderProgram.samplerUniform, 2);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeTreeVertexIndexBuffer);
    setMatrixUniforms();
    if (lines) {
        gl.drawElements(gl.LINES, cubeTreeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    } else if (triangles) {
        gl.drawElements(gl.TRIANGLES, cubeTreeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    } else if (points) {
        gl.drawElements(gl.POINTS, cubeTreeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    }
    mvPopMatrix();

    mvPushMatrix();
    //tree sphere
    mat4.translate(mvMatrix, [5.9,1.0, 0.0]);
    gl.activeTexture(gl.TEXTURE6);
    gl.bindTexture(gl.TEXTURE_2D, topTreeTexture);
    gl.uniform1i(shaderProgram.samplerUniform, 6);
    gl.bindBuffer(gl.ARRAY_BUFFER, treeVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, treeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, treeVertexTextureCoordBuffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, treeVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, treeVertexNormalBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, treeVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, treeVertexIndexBuffer);
    setMatrixUniforms();
    if (lines) {
        gl.drawElements(gl.LINES, treeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    }
    else if (triangles) {
        gl.drawElements(gl.TRIANGLES, treeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    } else if (points) {
        gl.drawElements(gl.POINTS, treeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    }

    mvPopMatrix();
    mvPopMatrix();  
    mvPushMatrix();
    mat4.translate(mvMatrix, [20.0, 10.0, -30.0]);
    gl.activeTexture(gl.TEXTURE8);
    gl.bindTexture(gl.TEXTURE_2D, sunTexture);
    gl.uniform1i(shaderProgram.samplerUniform, 8);
    gl.bindBuffer(gl.ARRAY_BUFFER, sunVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, sunVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, sunVertexTextureCoordBuffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, sunVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, sunVertexNormalBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, sunVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sunVertexIndexBuffer);
    setMatrixUniforms();
    if (lines) {
        gl.drawElements(gl.LINES, sunVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    }
    else if (triangles) {
        gl.drawElements(gl.TRIANGLES, sunVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    } else if (points) {
        gl.drawElements(gl.POINTS, sunVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    }
    mvPopMatrix();
    mvPushMatrix();
    mat4.translate(mvMatrix, [0.0, -3.6, -20.0]);
    mat4.scale(mvMatrix, [10.0, 0.5, 10.0]);
    gl.bindBuffer(gl.ARRAY_BUFFER, sandVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, sandVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, sandVertexNormalBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, sandVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, sandVertexTextureCoordBuffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, sandVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.activeTexture(gl.TEXTURE9);
    gl.bindTexture(gl.TEXTURE_2D, sandTexture);
    gl.uniform1i(shaderProgram.samplerUniform, 9);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sandVertexIndexBuffer);
    setMatrixUniforms();
    if (lines) {
        gl.drawElements(gl.LINES, sandVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    }
    else if (triangles) {
        gl.drawElements(gl.TRIANGLES, sandVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);   
    } else if (points) {
        gl.drawElements(gl.POINTS, sandVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);   
    }
    mvPopMatrix();
     
}


var lastTime = 0;

function animate() {
    var timeNow = new Date().getTime();

    if (lastTime != 0) {
        var elapsed = timeNow - lastTime;

        xHouseRot += (xHouseSpeed * elapsed) / 1000.0;
        yHouseRot += (yHouseSpeed * elapsed) / 1000.0;
        xTreeRot += (xTreeSpeed * elapsed) / 1000.0;
        yTreeRot += (yTreeSpeed * elapsed) / 1000.0;
    }
    lastTime = timeNow;
}


function tick() {
    requestAnimFrame(tick);
    handleKeys();
    drawScene();
    animate();
}


function webGLStart() {
    var canvas = document.createElement('canvas');
    canvas.id     = "lesson07-canvas";
    canvas.width = document.body.clientWidth-20;
    canvas.height = document.body.clientHeight-20;
    document.body.appendChild(canvas);
    initGL(canvas);
    initShaders();
    initBuffers();
    initTexture();
    var objStr = document.getElementById('my_cube.obj').innerHTML;
    mesh = new OBJ.Mesh(objStr);

    // use the included helper function to initialize the VBOs
    // if you don't want to use this function, have a look at its
    // source to see how to use the Mesh instance.
    OBJ.initMeshBuffers(gl, mesh);

    //gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
    tick();
}