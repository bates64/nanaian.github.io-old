import {
	Scene, PerspectiveCamera, WebGLRenderer,
	Fog, Color,
	BufferGeometry, Float32BufferAttribute,
	LineSegments, LineDashedMaterial,
} from 'https://cdn.pika.dev/three/^0.109.0'

const renderer = new WebGLRenderer({
	canvas: document.getElementById('wall'),
	antialias: true,
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setClearColor(0x222831, 1.0)
renderer.setSize(window.innerWidth, window.innerHeight)

window.addEventListener('resize', () => {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
	renderer.setSize(window.innerWidth, window.innerHeight)
})

let mouseX = 2
window.addEventListener('mousemove', evt => {
	mouseX = (evt.clientX - window.innerWidth / 2) / window.innerWidth * 4
})

const scene = new Scene()

const camera = new PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000)
camera.position.z = 160

const bigBox = new LineSegments(generateBox(50, 50, 50), new LineDashedMaterial({
	color: randomPrettyColor(),
	dashSize: 1,
	gapSize: 1,
}))
bigBox.computeLineDistances()
scene.add(bigBox)

const smallBox = new LineSegments(generateBox(25, 25, 25), new LineDashedMaterial({
	color: randomPrettyColor(),
	dashSize: 1,
	gapSize: 0,
}))
smallBox.computeLineDistances()
scene.add(smallBox)

const tinyBox = new LineSegments(generateBox(10, 10, 10), new LineDashedMaterial({
	color: randomPrettyColor(),
	dashSize: 1,
	gapSize: 0,
}))
tinyBox.computeLineDistances()
scene.add(tinyBox)

let t = -100
function draw() {
	requestAnimationFrame(draw)

	tinyBox.rotation.x = (smallBox.rotation.x = (bigBox.rotation.x = Math.sin(t * 0.004)) * 0.5) * 0.5
	bigBox.rotation.y += 0.005 * mouseX
	smallBox.rotation.y += 0.003 * mouseX
	tinyBox.rotation.y += 0.001 * mouseX

	//camera.position.y = Math.sin(t * 0.01) * 5

	renderer.setViewport(0, 0, window.innerWidth, window.innerHeight)
	renderer.render(scene, camera)

	scene.fog = new Fog(0x222831, Math.min(t * 4, 150), 170)

	t++
}
draw()

function randomPrettyColor() {
	const r = 0.3 + Math.random() * 0.7
	const g = 0.3 + Math.random() * 0.7
	const b = 0.3 + Math.random() * 0.7

	if (r + g + b < 2 || r + g + b > 2.5) {
		return randomPrettyColor()
	}

	return new Color(r, g, b)
}

function generateBox(width, height, depth) {
	width = width * 0.5
	height = height * 0.5
	depth = depth * 0.5

	const geometry = new BufferGeometry()
	geometry.setAttribute('position', new Float32BufferAttribute([
		- width, - height, - depth,
		- width, height, - depth,

		- width, height, - depth,
		width, height, - depth,

		width, height, - depth,
		width, - height, - depth,

		width, - height, - depth,
		- width, - height, - depth,

		- width, - height, depth,
		- width, height, depth,

		- width, height, depth,
		width, height, depth,

		width, height, depth,
		width, - height, depth,

		width, - height, depth,
		- width, - height, depth,

		- width, - height, - depth,
		- width, - height, depth,

		- width, height, - depth,
		- width, height, depth,

		width, height, - depth,
		width, height, depth,

		width, - height, - depth,
		width, - height, depth,	
	], 3))

	return geometry
}
