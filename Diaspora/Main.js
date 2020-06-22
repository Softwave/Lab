/* 
 * DIASPORA
 * -------------------
 * A cool sketch inspired by the cover of the
 * Greg Egan novel Diaspora
 *
 * License: MIT 
*/

var camera, scene, renderer, container, mesh, composer;
var clock;
var stars = [];

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
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    // Scene 
    scene = new THREE.Scene();
    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 80;

    // Geometry and Material
    var geometry = new THREE.OctahedronGeometry(30, 0);
    var material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true
    })
    //new THREE.MeshNormalMaterial();
    // Add the mesh
    mesh = new THREE.Mesh(geometry, material);
    // Add to scene 
    scene.add(mesh);

    // Add stars
    for (var i = -1000; i < 1000; i+=20)
    {
        var geometry = new THREE.SphereGeometry(0.5, 32, 32);
        var material = new THREE.MeshBasicMaterial({color: 0xffffff});
        var sphere = new THREE.Mesh(geometry, material);

        sphere.position.x = Math.random() * 1000 - 500;
        sphere.position.y = Math.random() * 1000 - 500;

        sphere.position.z = i;

        sphere.scale.x = sphere.scale.y = 2;

        scene.add(sphere);
        stars.push(sphere);
    }

    //Window resize
    window.addEventListener('resize', onWindowResize, false);
}

function animate()
{
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    animateStars();

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
}

function animateStars() 
{
    for (var i = 0; i < stars.length; i++) {
        star = stars[i];
        star.position.z += i / 10;
        if (star.position.z > 1000) {
            star.position.z -= 2000;
        }
    }
}

function onWindowResize() 
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}