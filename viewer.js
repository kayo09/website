// Import necessary libraries

// Create a scene

const scene = new THREE.Scene();
//Rt {x: -0.5803757776765449, y: 1.5341545059054698, z: -0.46987954680549515}
// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-0.5803757776765449,1.5341545059054698,-0.46987954680549515);

// Create a renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.domElement.style.powerPreference = "high-performance";
document.body.appendChild(renderer.domElement);

// Create ambient light
const ambientLight = new THREE.AmbientLight(0xffee88,8); // Adjust intensity as needed
ambientLight.position.set(5,5,5);  
scene.add(ambientLight);

// Create a point light for the filament
const pointLight = new THREE.PointLight(0xff5500,40); // Adjust color and intensity as needed
pointLight.position.set(-0.1, 0.55, 0); // Position the light at the center of the light bulb
scene.add(pointLight);

const pointLightDown = new THREE.PointLight(0xfffff,10); // Adjust color and intensity as needed
pointLightDown.position.set(1, 1, 0); // Position the light at the center of the light bulb
scene.add(pointLightDown);
// Create a sphere to represent the glowing filament (optional)
const filamentGeometry = new THREE.SphereGeometry(0.002, 100, 100); // Adjust size as needed
const filamentMaterial = new THREE.MeshBasicMaterial({ color: 0xffee88 });
const filamentSphere = new THREE.Mesh(filamentGeometry, filamentMaterial);
pointLight.add(filamentSphere); 









// Load GLTF file
const loader = new THREE.GLTFLoader();
loader.load(
    // URL of the GLTF file
    '/models/light_bulb/light_bulb.glb',

    // onLoad callback
    function (gltf) {
        // Add the loaded object to the scene
        scene.add(gltf.scene);
    },

    // onProgress callback
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },

    // onError callback
    function (error) {
        console.error('Error loading GLTF file:', error);
    }
);

// Add OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI/8;

// Function to handle window resizing
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
//light
// const light = new THREE.AmbientLight(0xffffff,100);
// scene.add(light);

// Event listener for window resize
window.addEventListener('resize', onWindowResize);
// Function to handle horizontal scrolling
function onDocumentMouseWheel(event) {
    // Adjust rotation based on horizontal scrolling
    const deltaX = event.deltaX;
    const deltaY = event.deltaY;

    // Rotate the model based on horizontal scrolling
    if (deltaX !== 0) {
        // Adjust rotation speed as needed
        gltf.scene.rotation.y += deltaX * 0.005;
    }
}

// Event listener for horizontal scrolling
document.addEventListener('wheel', onDocumentMouseWheel, false);



// Function to render the scene
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update controls
    // updateSparkPosition(); // Update spark position
    renderer.render(scene, camera);
}

// Call the animate function to start rendering
animate();