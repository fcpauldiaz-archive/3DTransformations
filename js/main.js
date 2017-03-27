//global vars
var gl;
var shaderProgram;

var mvMatrix = mat4.create();
var mvMatrixStack = [];
var pMatrix = mat4.create();


var xRot = 0;
var xSpeed = 0;

var yRot = 0;
var ySpeed = 0;
var scaleActive = false;
var translateActive = false;
var rotateActive = true;
var open = false;
var xScale = 1.0;
var yScale = 1.0;
var zScale = 1.0;
var xTranslate = 0.0;
var yTranslate = 0.0;
var zTranslate = 0.0;

var z = -30.0;


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
    
}


function drawScene() {
    gl.enable ( gl.BLEND ) ;
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);

    mat4.identity(mvMatrix);

    mat4.translate(mvMatrix, [0.0, 0.0, z]);
 
    mat4.rotate(mvMatrix, degToRad(xRot), [1, 0, 0]);
    mat4.rotate(mvMatrix, degToRad(yRot), [0, 1, 0]);


    mat4.scale(mvMatrix, [xScale, yScale, zScale]);

    mat4.translate(mvMatrix, [xTranslate, yTranslate, zTranslate]);   

    mat4.scale(mvMatrix, [2.0, 2.0, 2.0]);

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
    gl.drawElements(gl.TRIANGLES, cubeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
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
    gl.drawArrays(gl.TRIANGLES, 0, trianglesVerticeBuffer.numItems);

    mvPopMatrix();
    mvPushMatrix();
    mat4.scale(mvMatrix, [2.0, 2.0, 2.0]);
    mat4.translate(mvMatrix, [4.0, -1.5, 0.0]);
    mat4.scale(mvMatrix, [0.8, 0.5, 0.8]);
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
    gl.drawElements(gl.TRIANGLES, cubeTreeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
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

}


var lastTime = 0;

function animate() {
    var timeNow = new Date().getTime();

    if (lastTime != 0) {
        var elapsed = timeNow - lastTime;

        xRot += (xSpeed * elapsed) / 1000.0;
        yRot += (ySpeed * elapsed) / 1000.0;
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

    //gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
    tick();
}