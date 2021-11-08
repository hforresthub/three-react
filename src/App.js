import './App.css';
import Box from './Box'
import Sphere from './Sphere'
import Camera from './Camera'
import { Canvas } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react';
import realtime from './firebase'
import { ref, onValue, set } from 'firebase/database'

function App() {

	const [currentUserName, setCurrentUserName] = useState('')
	const [colorChoice, setColorChoice] = useState('#000')
	const [cameraPosition, setCameraPosition] = useState({x:0, y: 0, z: 10})

	const [boxArray, setBoxArray] = useState([])
	const [sphereArray, setSphereArray] = useState([])

	const handleSubmit = (event) => {
		event.preventDefault()
		// add user if they dont exist in firebase yet
		const checkForName = sphereArray.filter((element) => {
			return (element.userName === currentUserName)
		})
		if (currentUserName && currentUserName !== null && checkForName.length === 0) {
			const databaseRef = ref(realtime, `/users/${currentUserName}`)
			set(databaseRef, { x: 0, y: 0, z: -1, color: colorChoice })
		} else if (currentUserName && currentUserName !== null && checkForName.length !== 0) {
			const databaseRef = ref(realtime, `/users/${currentUserName}`)
			set(databaseRef, { x: checkForName[0].x, y: checkForName[0].y, z: checkForName[0].z, color: colorChoice })
		}
	}

	useEffect(() => {
		const tempArrayB = []
		const boxCount = 200
		const startSpreadModifier = 100

		for (let i = 0; i < boxCount; i++) {
			tempArrayB.push({ x: (Math.random() - 0.5) * startSpreadModifier, y: (Math.random() - 0.5) * startSpreadModifier * 0.5, z: (Math.random() - 2) * startSpreadModifier * 0.5, color: 'red' })
		}
		setBoxArray(tempArrayB)

		const databaseRef = ref(realtime, '/users')
		onValue(databaseRef, (snapshot) => {
			const myData = snapshot.val()
			let tempArray = []
			for (let propertyName in myData) {
				// console.log(myData);
				// console.log(propertyName);
				// console.log(myData[propertyName]);
				const IndexedUser = {
					userName: propertyName,
					x: myData[propertyName].x,
					y: myData[propertyName].y,
					z: myData[propertyName].z,
					color: myData[propertyName].color
				}
				tempArray.push(IndexedUser)
			}
			// console.log("huh ", tempArray);
			setSphereArray(tempArray)
			// console.log("huh ", tempArray);
		})
		// }, [])

		// useEffect(() => {

		// use firebase to initialize saved players
		// tempArray2.push({ x: (Math.random() - 0.5) * 100, y: (Math.random() - 0.5) * 100, z: (Math.random() - 1) * 100, userName: 'Hal' })
		// setSphereArray(tempArray2)
	}, [])

	const handleUserNameChange = (event) => {
		setCurrentUserName(event.target.value)
	}

	const handleColorChange = (event) => {
		setColorChoice(event.target.value)
	}

	return (
		<div className="App">
			<h1>Flying Stuff</h1>
			<p>Enter your name and hit enter to add a sphere of the chosen color, wasd keys to move, space and c to rise or fall</p>
			<form onSubmit={handleSubmit}>
				<label htmlFor="userName">User: </label>
				<input type="text" name="userName" id="userName" value={currentUserName} onChange={handleUserNameChange} />
				<label htmlFor="color">Color: </label>
				<input type="color" name="color" id="color" value={colorChoice} onChange={handleColorChange} />
			</form>
			<Canvas >
				<Camera 
					position={[cameraPosition.x, cameraPosition.y, cameraPosition.z]}
					fov={180}
				/>
				<ambientLight />
				<pointLight position={[10, 10, 10]} />
				{
					boxArray.map((element, index) => {
						// console.log(element);
						return (
							<Box key={index} position={[element.x, element.y, element.z]} />
						)
					})
				}
				{
					sphereArray.length > 0 ?
						sphereArray.map((element, index) => {
							// console.log(element);
							return (
								// <>
								// </>
								<Sphere key={index} position={[element.x, element.y, element.z]} color={element.color} currentUser={currentUserName} currentUserTrue={element.userName === currentUserName} cameraPos={setCameraPosition} />
							)
							// })
						}) : null
				}
			</Canvas>
		</div>
	);
}

export default App;

// Things to add maybe
// - subtle sounds based on motion
// - collision detection
// - camera following sphere
// - setting a motion for a sphere, perhaps a lockstate via click
// 	- lower poly with spin
// - shaders/post processing