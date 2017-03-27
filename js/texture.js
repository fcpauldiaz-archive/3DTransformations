var crateTexture;
var roofTopTexture;
var treeStructure;
var windowTexture;
var doorTexture;
var wallSmall;
var topTreeTexture;
var bootleTexture;

function initTexture() {
  crateTexture = gl.createTexture();
  crateTexture.image = new Image();
  crateTexture.image.onload = function () {
      handleLoadedTexture(crateTexture)
  }

  crateTexture.image.src = "./img/wood-texture.jpg";
  roofTopTexture = gl.createTexture();
  roofTopTexture.image = new Image();
  roofTopTexture.image.onload = function () {
      handleLoadedTexture(roofTopTexture)
  }

  roofTopTexture.image.src = "./img/roof-texture.jpg";
  treeStructure = gl.createTexture();
  treeStructure.image = new Image();
  treeStructure.image.onload = function () {
      handleLoadedTexture(treeStructure)
  }

  treeStructure.image.src = "./img/tree-structure.jpg";
  windowTexture = gl.createTexture();
  windowTexture.image = new Image();
  windowTexture.image.onload = function () {
      handleLoadedTexture(windowTexture)
  }

  windowTexture.image.src = "./img/window-texture.jpg";

  doorTexture = gl.createTexture();
  doorTexture.image = new Image();
  doorTexture.image.onload = function () {
      handleLoadedTexture(doorTexture)
  }
  doorTexture.image.src = "./img/door-texture.jpg";


  wallSmall = gl.createTexture();
  wallSmall.image = new Image();
  wallSmall.image.onload = function () {
      handleLoadedTexture(wallSmall)
  }
  wallSmall.image.src = "./img/wood-texture-small.jpg";


  topTreeTexture = gl.createTexture();
  topTreeTexture.image = new Image();
  topTreeTexture.image.onload = function () {
      handleLoadedTexture(topTreeTexture)
  }
  topTreeTexture.image.src = "./img/leaf-texture.jpeg";

  bootleTexture = gl.createTexture();
  bootleTexture.image = new Image();
  bootleTexture.image.onload = function () {
      handleLoadedTexture(bootleTexture)
  }
  bootleTexture.image.src = "./img/bottle.jpeg";
}


function handleLoadedTexture(texture) {
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
  gl.generateMipmap(gl.TEXTURE_2D);

  gl.bindTexture(gl.TEXTURE_2D, null);
}