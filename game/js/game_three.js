var scene,camera, renderer, clock, deltaTime, totalTime;

var arToolkitSource, arToolkitContext;

var markerRoot, ammoMarker, hpMarker, respawnMarker, markerRoot2;

var markerControls1;
var markerControls2;
var markerControls3;
var markerControls4;
var markerControls5;






// grupa dla apteczki i ammo
var resourceGroup;
//grupa dla graczy
var markerGroup;
//grupa dla respawna
var respawnGroup;


var mesh1;

//szescian z amunicja 
var mesh2;

//szescian z apteczka
var mesh3;

//6scian z napisem respawn
var mesh4;
var mesh5;


initialize();
animate();


function initialize() {

      scene = new THREE.Scene();
      camera = new THREE.Camera();
      camera.fov = window.innerHeight / window.screen.height;
      camera.aspect = window.innerWidth / window.innerHeight;
      scene.add(camera);
      camera.position.z = 5;



      renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas: myCanvas,
      
      });
      
      
      renderer.setSize(window.innerWidth, window.innerHeight);
     // renderer.setViewport(0, 0, myCanvas.width, myCanvas.height); 
      renderer.domElement.style.position = "absolute";
      renderer.domElement.style.top = "0px";
      renderer.domElement.style.left = "0px";
      document.body.appendChild(renderer.domElement);



     
     
          

      clock = new THREE.Clock();
      deltaTime = 0;
      totalTime = 0;

      arToolkitSource = new THREEx.ArToolkitSource({
        sourceType: "webcam",
      });

  //naprawia bĹÄd z renderowaniem strony, gdy zmienimy rozmiar okienka
  function onResize() {

      arToolkitSource.onResize();
      arToolkitSource.copySizeTo(renderer.domElement);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setViewport(0,0, window.innerWidth, window.innerHeight); 
      //b = renderer.getSize();
      //pobieranie szerokosc i wysokosci dynamicznie zmieniajacego sie canvasa
      resolutionX = window.innerWidth;
      resolutionY = window.innerHeight;
     
      
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

  // create atToolkitContext
    arToolkitContext = new THREEx.ArToolkitContext({
    cameraParametersUrl: "/data/camera_para.dat",
    detectionMode: "mono",
  });

  // copy projection matrix to camera when initialization complete
    arToolkitContext.init(function onCompleted() {
    camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
  });


    markerRoot = new THREE.Group();
    scene.add(markerRoot);
    markerControls1 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot, {
      type: "pattern",
      patternUrl: "/data/letterC.patt",
    });
    markerGroup = new THREE.Group();
    markerRoot.add(markerGroup);



    markerRoot2 = new THREE.Group();
    scene.add(markerRoot2);
    markerControls5 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot2, {
      type: "pattern",
      patternUrl: "/data/letterA.patt",
    });
    markerRoot2.add(markerGroup);


    

    ammoMarker = new THREE.Group();
    scene.add(ammoMarker);

    markerControls2 = new THREEx.ArMarkerControls(arToolkitContext,ammoMarker,{
      type:"pattern",
      patternUrl: "/data/letterB.patt",
    });

    resourceGroup = new THREE.Group();
    ammoMarker.add(resourceGroup);


    hpMarker = new THREE.Group();
    scene.add(hpMarker);
    markerControls3 = new THREEx.ArMarkerControls(arToolkitContext,hpMarker,{
      type:"pattern",
      patternUrl: "/data/hiro.patt",
    });

    hpMarker.add(resourceGroup);

    respawnMarker = new THREE.Group();
    scene.add(respawnMarker);
    markerControls4 = new THREEx.ArMarkerControls(arToolkitContext, respawnMarker, {
      type: "pattern",
      patternUrl: "/data/kanji.patt",
    });
    respawnGroup = new THREE.Group();
    respawnMarker.add(respawnGroup);



    let geometry1 = new THREE.CubeGeometry(1, 1, 1);
    let material1 = new THREE.MeshNormalMaterial({
      transparent: true,
      opacity: 1.0,
      side: THREE.DoubleSide,
    });

      mesh1 = new THREE.Mesh(geometry1, material1);
      mesh1.position.y = 0.5;

      markerRoot.add(mesh1);


      let geometry5 = new THREE.CubeGeometry(1, 1, 1);
      let material5 = new THREE.MeshNormalMaterial({
        transparent: true,
        opacity: 1.0,
        side: THREE.DoubleSide,
      });
  
        mesh5 = new THREE.Mesh(geometry5, material5);
        mesh5.position.y = 0.5;
  
        markerRoot2.add(mesh5);
  

 


    let geometry2 = new THREE.CubeGeometry(2, 2, 2);
    var texture2 = new THREE.TextureLoader().load("/img/ammo.png");
    let material2 = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        opacity: 0.9,
        map: texture2,
        transparent: true,
      });

        mesh2 = new THREE.Mesh(geometry2, material2);
        mesh2.position.y = 0.5;

        ammoMarker.add(mesh2);

  let geometry3 = new THREE.CubeGeometry(2, 2, 2);
  var texture3 = new THREE.TextureLoader().load("/img/healing.png");
  let material3 = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      opacity: 0.9,
      map: texture3,
      transparent: true,
    });

      mesh3 = new THREE.Mesh(geometry3, material3);
      mesh3.position.y = 0.5;

      hpMarker.add(mesh3);


  let geometry4 = new THREE.CubeGeometry(1, 1, 1);
  var texture4 = new THREE.TextureLoader().load("/img/respawn.jpg");
  let material4 = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      opacity: 0.9,
      map: texture4,
      transparent: true,
    });

      mesh4 = new THREE.Mesh(geometry4, material4);
      mesh4.position.y = 0.5;

      respawnMarker.add(mesh4);
}

function update() {
  // update artoolkit on every frame
    mesh1.rotation.y += 0.01;
    mesh2.rotation.x += 0.02;
    mesh3.rotation.x += 0.02;
   

    

  if (arToolkitSource.ready !== false)
    arToolkitContext.update(arToolkitSource.domElement);
    
 
}

function render() {
  
  renderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);
  deltaTime = clock.getDelta();
  totalTime += deltaTime;
  

  update(); 
  render();
  

}
