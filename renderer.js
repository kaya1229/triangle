let scene, camera, renderer, balloon;
let isDragging = false;
let velocity = 0;
let rotation = 0;
let chorusInterval = null;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight * 0.7), 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight * 0.7);
  document.getElementById('canvas-container').appendChild(renderer.domElement);

  // 풍선 기하학 및 로고 텍스처
  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const texture = new THREE.TextureLoader().load('logo_only.png');
  const material = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    map: texture,
    transparent: true,
    shininess: 100
  });

  balloon = new THREE.Mesh(geometry, material);
  scene.add(balloon);

  const light = new THREE.PointLight(0xffffff, 1, 100);
  light.position.set(5, 5, 5);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x404040));

  camera.position.z = 5;

  animate();
}

// 흔들기 및 물리 로직
window.addEventListener('mousedown', () => isDragging = true);
window.addEventListener('mouseup', () => isDragging = false);
window.addEventListener('mousemove', (e) => {
  if (isDragging) {
    balloon.position.x = (e.clientX / window.innerWidth - 0.5) * 10;
    velocity = e.movementX * 0.01;
  }
});

// 스크롤로 크기 조절
window.addEventListener('wheel', (e) => {
  const scaleChange = e.deltaY > 0 ? 0.9 : 1.1;
  balloon.scale.multiplyScalar(scaleChange);
});

// 색상 변경 함수
function changeColor(hex) {
  clearInterval(chorusInterval);
  balloon.material.color.setHex(hex);
}

// 떼창 모드 로직
function startChorus() {
  const colors = [0xff0000, 0x00ff00, 0x0000ff];
  let i = 0;
  clearInterval(chorusInterval);
  chorusInterval = setInterval(() => {
    balloon.material.color.setHex(colors[i % 3]);
    i++;
  }, 1000);
}

// 이벤트 리스너 연결
document.getElementById('red-btn').onclick = () => changeColor(0xff0000);
document.getElementById('green-btn').onclick = () => changeColor(0x00ff00);
document.getElementById('blue-btn').onclick = () => changeColor(0x0000ff);
document.getElementById('chorus-btn').onclick = startChorus;

function animate() {
  requestAnimationFrame(animate);
  if (!isDragging) {
    balloon.position.x += velocity;
    velocity *= 0.95; // 마찰력
    balloon.rotation.y += velocity * 0.5;
  }
  renderer.render(scene, camera);
}

init();
