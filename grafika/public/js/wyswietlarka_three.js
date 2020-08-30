"use strict";
var scene, camera, renderer, clock, deltaTime, totalTime;
var clickscount = 0;

var arToolkitSource, arToolkitContext;
var refractMaterial, reflectMesh;

var markerRoot1 = new THREE.Group();
var markerRoot2 = new THREE.Group();
var markerRoot3 = new THREE.Group();
var markerRoot4 = new THREE.Group();
var markerRoot5 = new THREE.Group();
var markerRoot6 = new THREE.Group();
var markerRoot7 = new THREE.Group();
var markerRoot8 = new THREE.Group();


var markerControls1;
var markerControls2;
var markerControls3;
var markerControls4;
var markerControls5;
var markerControls6;
var markerControls7;
var markerControls8;


var markerGroup;

var geometry5 = new THREE.PlaneBufferGeometry(2.5, 2.5, 4, 4);

let loader5 = new THREE.TextureLoader();
let texture5 = loader5.load("img/color-grid.png", render);

var material5 = new THREE.ShaderMaterial({
  uniforms: {
    time: { value: 1.0 },
    baseTexture: { value: texture5 },
  },
  vertexShader: document.getElementById("vertexShader2").textContent,
  fragmentShader: document.getElementById("fragmentShader2").textContent,
});

var loader8 = new THREE.TextureLoader();
var texture8 = loader8.load("img/water-2.jpg");
texture8.wrapS = THREE.RepeatWrapping;
texture8.wrapT = THREE.RepeatWrapping;
texture8.repeat.set(8, 2);

// shader-based material
var material8 = new THREE.ShaderMaterial({
  uniforms: {
    time: { value: 1.0 },
    baseTexture: { value: texture8 },
  },
  vertexShader: document.getElementById("vertexShader3").textContent,
  fragmentShader: document.getElementById("fragmentShader3").textContent,
  transparent: true,
});

var mesh0;
var mesh1;
var mesh2;
var mesh3;
var mesh4;
var mesh5;
var mesh6;
var pointLight6;
var mesh7;
var mesh8, mesh81, mesh83;


var choice = 5;

initialize();
animate();

function changeModel(x) {
  if (clickscount == 12) {
    location.reload();
  }
  console.log("choice poprzedni: ");
  console.log(choice);
  let markerRoot = "markerRoot" + choice;
  console.log("markerRoot");
  console.log(markerRoot);
  if (markerRoot == "markerRoot1") {
    markerRoot1.remove(mesh1);
    markerRoot1.add(mesh0);
    renderer.dispose(mesh1);
    renderer.dispose(mesh0);
    scene.remove(markerRoot1);
  }
  if (markerRoot == "markerRoot2") {
    markerRoot2.remove(mesh2);
    renderer.dispose(mesh2);
    scene.remove(markerRoot2);
  }
  if (markerRoot == "markerRoot3") {
    markerRoot3.remove(mesh3);
    renderer.dispose(mesh3);
    scene.remove(markerRoot3);
  }
  if (markerRoot == "markerRoot4") {
    markerRoot4.remove(mesh4);
    renderer.dispose(mesh4);
    scene.remove(markerRoot4);
  }
  if (markerRoot == "markerRoot5") {
    markerRoot5.remove(mesh5);
    renderer.dispose(mesh5);
    scene.remove(markerRoot5);
  }
  if (markerRoot == "markerRoot6") {
    markerRoot6.remove(mesh6);
    markerRoot6.remove(pointLight6);
    renderer.dispose(mesh6);
    renderer.dispose(pointLight6);
    scene.remove(markerRoot6);
  }
  if (markerRoot == "markerRoot7") {
    markerRoot7.remove(mesh7);
    markerRoot7.remove(reflectMesh);
    renderer.dispose(mesh7);
    renderer.dispose(reflectMesh);
    scene.remove(markerRoot7);
  }
  if (markerRoot == "markerRoot8") {
    markerRoot8.remove(mesh8);
    markerRoot8.remove(mesh81);
    markerRoot8.remove(mesh83);
    renderer.dispose(mesh8);
    renderer.dispose(mesh81);
    renderer.dispose(mesh83);
    scene.remove(markerRoot8);
  }

  choice = x;
  console.log("Zmiana choica");
  console.log(choice);
  clickscount++;
  initialize();
}

function initialize() {
  scene = new THREE.Scene();
  camera = new THREE.Camera();
  camera.fov = window.innerWidth / window.innerHeight;
  camera.aspect = window.innerWidth / window.innerHeight;
  scene.add(camera);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas: myCanvas,
  });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
 
  renderer.setViewport(0, 0, myCanvas.width, myCanvas.height);
  renderer.setPixelRatio( window.devicePixelRatio );
  //renderer.domElement.style.position = "absolute";
 /* renderer.domElement.style.top = "0px";
  renderer.domElement.style.left = "0px";*/
  document.body.appendChild(renderer.domElement);

  clock = new THREE.Clock();
  deltaTime = 0;
  totalTime = 0;

  arToolkitSource = new THREEx.ArToolkitSource({
    sourceType: "webcam",
  });

  // create atToolkitContext
  arToolkitContext = new THREEx.ArToolkitContext({
    cameraParametersUrl: "/data/camera_para.dat",
    detectionMode: "mono_and_matrix",
    matrixCodeType: "3x3",
    
  });

  markerControls1 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot1, {
    type: "barcode",
    barcodeValue: 5,
 
  });

  markerControls2 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot2, {
    type: "barcode",
    barcodeValue: 5,
   
  });

  markerControls3 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot3, {
    type: "barcode",
    barcodeValue: 5,

  });

  markerControls4 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot4, {
    type: "barcode",
    barcodeValue: 5,
 
  });

  markerControls5 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot5, {
    type: "barcode",
    barcodeValue: 5,
 
  });

  markerControls6 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot6, {
    type: "barcode",
    barcodeValue: 5,
   
  });

  markerControls7 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot7, {
    type: "barcode",
    barcodeValue: 5,
    
  });

  markerControls8 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot8, {
    type: "barcode",
    barcodeValue: 5,
    
  });

  //naprawia bĹÄd z renderowaniem strony, gdy zmienimy rozmiar okienka
  function onResize() {
    arToolkitSource.onResize();
    arToolkitSource.copySizeTo(renderer.domElement);
   // renderer.setSize(window.innerWidth, window.innerHeight);
    //renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);

    if (arToolkitContext.arController !== null) {
      arToolkitSource.copySizeTo(arToolkitContext.arController.canvas);
    }
  }

  arToolkitSource.init(function onReady() {
    onResize();
  });

  // handle resize event
  window.addEventListener("resize", function () {
    onResize();
  });

  // copy projection matrix to camera when initialization complete
  arToolkitContext.init(function onCompleted() {
    camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
  });

  console.log("Switch: ");
  console.log(choice);
  switch (choice) {
    case 1: {
      scene.add(markerRoot1);

      let geometry1 = new THREE.CylinderGeometry(1, 1, 4, 32, 1);
      let loader = new THREE.TextureLoader();
      let texture = loader.load("img/tiles.jpg", render);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(4, 2);
      let material1 = new THREE.MeshBasicMaterial({
        transparent: true,
        map: texture,
        side: THREE.BackSide,
      });
      mesh1 = new THREE.Mesh(geometry1, material1);
      mesh1.position.y = -2;
      markerRoot1.add(mesh1);
      let geometry0 = new THREE.RingGeometry(1, 9, 32);
      let material0 = new THREE.MeshBasicMaterial({
        colorWrite: false,
      });
      mesh0 = new THREE.Mesh(geometry0, material0);
      mesh0.rotation.x = -Math.PI / 2;
      markerRoot1.add(mesh0);

      break;
    }

    case 2: {
      scene.add(markerRoot2);

      let geometry2 = new THREE.CubeGeometry(2, 2, 2);
      var texture2 = new THREE.TextureLoader().load("/img/ammo.png");
      let material2 = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        opacity: 0.9,
        map: texture2,
        transparent: true,
      });

      mesh2 = new THREE.Mesh(geometry2, material2);
      markerRoot2.add(mesh2);

      break;
    }

    case 3: {
      scene.add(markerRoot3);

      let geometry3 = new THREE.CubeGeometry(2, 2, 2);
      var texture3 = new THREE.TextureLoader().load("/img/healing.png");
      let material3 = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        opacity: 0.9,
        map: texture3,
        transparent: true,
      });

      mesh3 = new THREE.Mesh(geometry3, material3);
      markerRoot3.add(mesh3);

      break;
    }

    case 4: {
      scene.add(markerRoot4);
      let geometry4 = new THREE.CubeGeometry(1, 1, 1);
      var texture4 = new THREE.TextureLoader().load("/img/respawn.jpg");
      let material4 = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        opacity: 0.9,
        map: texture4,
        transparent: true,
      });

      mesh4 = new THREE.Mesh(geometry4, material4);
      mesh4.position.y = 0.0;

      markerRoot4.add(mesh4);
      break;
    }

    case 5: {
      scene.add(markerRoot5);

      mesh5 = new THREE.Mesh(geometry5, material5);
      mesh5.rotation.x = -Math.PI / 2;

      markerRoot5.add(mesh5);

      break;
    }

    case 6: {
      scene.add(markerRoot6);

      let geometry6 = new THREE.SphereGeometry(1, 32, 32);

      let loader6 = new THREE.TextureLoader();
      let texture6 = loader6.load("img/earth-sphere.jpg", render);
      let material6 = new THREE.MeshLambertMaterial({
        map: texture6,
        opacity: 1.0,
      });

      mesh6 = new THREE.Mesh(geometry6, material6);
      mesh6.position.y = 0;

      markerRoot6.add(mesh6);

      pointLight6 = new THREE.PointLight(0xffffff, 1, 100);
      pointLight6.position.set(0.5, 3, 2);
      pointLight6.add(
        new THREE.Mesh(
          new THREE.SphereBufferGeometry(0.05, 16, 8),
          new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.5 })
        )
      );
      markerRoot6.add(pointLight6);

      break;
    }
    case 7: {
      scene.add(markerRoot7);


      let videoTexture = new THREE.VideoTexture(arToolkitSource.domElement);
      videoTexture.minFilter = THREE.LinearFilter;

      refractMaterial = new THREE.ShaderMaterial({
        uniforms: {
          texture: { value: videoTexture },
          refractionRatio: { value: 0.75 },
          distance: { value: 1.0 },
          opacity: { value: 1.0 },
          tint: { value: new THREE.Vector3(0.8, 0.8, 1.0) },
        },
        vertexShader: document.getElementById("vertexShader").textContent,
        fragmentShader: document.getElementById("fragmentShader").textContent,
        transparent: true,
      });

      reflectMesh = new THREE.Mesh(
        new THREE.TorusKnotGeometry(1, 0.4, 128, 16), // new THREE.SphereBufferGeometry(1, 32, 32),
        refractMaterial
      );

      reflectMesh.position.y = 0;

      markerRoot7.add(reflectMesh);
      break;
    }
    case 8: {
      scene.add(markerRoot8);

      // water

      let geometry8 = new THREE.TorusGeometry(1, 1, 64, 256); // radius, tube radius

      mesh8 = new THREE.Mesh(geometry8, material8);
      mesh8.rotation.x = -Math.PI / 2;
      mesh8.scale.z = 0.1;

      markerRoot8.add(mesh8);

      // the inside of the hole
      let geometry81 = new THREE.CylinderGeometry(1, 1, 4, 32, 1);
      let texture81 = loader8.load("img/tiles.jpg", render);
      texture81.wrapS = THREE.RepeatWrapping;
      texture81.wrapT = THREE.RepeatWrapping;
      texture81.repeat.set(4, 2);
      let material81 = new THREE.MeshBasicMaterial({
        transparent: true,
        map: texture81,
        side: THREE.BackSide,
      });
      mesh81 = new THREE.Mesh(geometry81, material81);
      mesh81.position.y = -2;
      markerRoot8.add(mesh81);

      let geometry83 = new THREE.RingGeometry(1, 9, 32);
      let material83 = new THREE.MeshBasicMaterial({
       
        colorWrite: false,
      });
      let mesh83 = new THREE.Mesh(geometry83, material83);
      mesh83.rotation.x = -Math.PI / 2;
      markerRoot8.add(mesh83);

      break;
    }
  }
}

function update() {
  // update artoolkit on every frame

  if (arToolkitSource.ready !== false)
    arToolkitContext.update(arToolkitSource.domElement);

  if (markerRoot5.visible) {
    material5.uniforms.time.value += deltaTime;
  }
  if (markerRoot8.visible) {
    material8.uniforms.time.value += deltaTime;
  }
}

function render() {
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);
  deltaTime = clock.getDelta();
  totalTime += deltaTime;

  update();
  render();
}
