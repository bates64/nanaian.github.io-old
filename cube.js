import {
	Scene, PerspectiveCamera, WebGLRenderer,
	Mesh, MeshLambertMaterial, BoxGeometry, Color,
	DirectionalLight,
} from 'https://cdn.pika.dev/three/^0.109.0'

const scene = new Scene()
const camera = new PerspectiveCamera(20, 1, 0.1, 1000)

const renderer = new WebGLRenderer({
	canvas: document.getElementById('cube'),
	antialias: true,
})
renderer.setSize(300, 300)

const material = new MeshLambertMaterial({ color: randomPrettyColor() })
const cube = new Mesh(new BoxGeometry(1, 1, 1), material)
scene.add(cube)

const directionalLight = new DirectionalLight(0xffffff, 1)
scene.add(directionalLight)

camera.position.z = 5

let t = 0
function draw() {
	requestAnimationFrame(draw)
	
	cube.rotation.y += 0.005

	camera.position.y = Math.sin(t * 0.01) * 0.1 + 0.3
	cube.rotation.x = Math.sin(t * 0.004) * 0.3 + 0.5

	renderer.render(scene, camera)

	t++
}
draw()

function randomPrettyColor(seed = Math.random()) {
	const r = 0.3 + Math.random() * 0.7
	const g = 0.3 + Math.random() * 0.7
	const b = 0.3 + Math.random() * 0.7

	return new Color(r, g, b)
}
