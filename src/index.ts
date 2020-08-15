import { BoxGeometry, DirectionalLight, EdgesGeometry, Mesh, MeshPhongMaterial, PerspectiveCamera, Scene, WebGLRenderer, TetrahedronBufferGeometry, Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function main() {
  const canvas = document.querySelector('#c') as HTMLCanvasElement;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const renderer = new WebGLRenderer({canvas});
  const fov = 75;
  const near = 0.1;
  const far = 300;
  const camera = new PerspectiveCamera(fov, canvas.width / canvas.height, near, far);
  camera.position.z = 200;
  
  const scene = new Scene();
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new BoxGeometry(boxWidth, boxHeight, boxDepth);
  const material = new MeshPhongMaterial({color: 0x44aa88});
  const cube = new Mesh(geometry, material);
  scene.add(cube);

  window.addEventListener('resize', (ev: UIEvent) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    camera.aspect = canvas.width / canvas.height;
  });

  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  let solenoid: Group = null;

  function render(time: number) {
    if (solenoid) {
      solenoid.rotation.x = time / 1000;
      solenoid.rotation.y = time / 1000;
    }
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  const loader = new GLTFLoader();
  loader.load('solenoid.glb', (gltf) => {
    solenoid = gltf.scene;
    // scene.add(new EdgesGeometry(gltf.scene));
    scene.add(gltf.scene);
  });

  requestAnimationFrame(render);
}

main();
