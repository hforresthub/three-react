import './App.css';
import Box from './Box'
import { Canvas } from '@react-three/fiber'

function App() {

	const boxCount = 1000
	const boxArray = []

	for (let i = 0; i < boxCount; i++) {
		boxArray.push({x: (Math.random() - 0.5) * 100, y: (Math.random() - 0.5) * 100, z: (Math.random() - 1) * 100})
	}

	return (
		<div className="App">
			<h1>Flying Cubes</h1>
			<Canvas>
				<ambientLight />
				<pointLight position={[10, 10, 10]} />
				{
					boxArray.map((element) => {
						// console.log(element);
						return (
							<Box position={[element.x, element.y, element.z]} />
						)
					})
				}
			</Canvas>
		</div>
	);
}

export default App;
