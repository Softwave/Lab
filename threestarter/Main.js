/* 
 * PROGRAM NAME
 * -------------------
 * PROGRAM DESCRIPTION
 *
 *
 * PROGRAM LICENSE
*/

var camera, scene, renderer, container, mesh;

document.addEventListener("DOMContentLoaded", startApp, false);

function startApp() 
{
    init();
    animate();
}

function init()
{
    // Container and Renderer
    container = document.getElementById('container');
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setClearColor(0xffffff, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    // Scene 
    scene = new THREE.Scene();
    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 80;

    // Geometry and Material
    var geometry = new THREE.OctahedronGeometry(10, 1);
    var material = new THREE.MeshNormalMaterial({
        wireframe: true
    });
    // Add the mesh
    mesh = new THREE.Mesh(geometry, material);
    // Add to scene 
    scene.add(mesh);

    //Window resize
    window.addEventListener('resize', onWindowResize, false);
}

function animate()
{
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
}

function onWindowResize() 
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}