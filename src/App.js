import './App.css';
import Box from './Box'
import Sphere from './Sphere'
import { Canvas } from '@react-three/fiber'
import { useEffect, useState } from 'react';
import realtime from './firebase'
import { ref, onValue, set } from 'firebase/database'

function App() {

	const [currentUserName, setCurrentUserName] = useState('')

	const [boxArray, setBoxArray] = useState([])
	const [sphereArray, setSphereArray] = useState([])

	const handleSubmit = (event) => {
		event.preventDefault()
		// add user if they dont exist in firebase yet
		const checkForName = sphereArray.filter((element) => {
			return (element.userName === currentUserName)
		})
		if (currentUserName && currentUserName != null && checkForName.length === 0) {
			const databaseRef = ref(realtime, `/users/${currentUserName}`)
			set(databaseRef, { x: 0, y: 0, z: 0 })
		}
	}

	useEffect(() => {
		const tempArrayB = []
		const boxCount = 1000
		
		for (let i = 0; i < boxCount; i++) {
			tempArrayB.push({ x: (Math.random() - 0.5) * 100, y: (Math.random() - 0.5) * 100, z: (Math.random() - 1) * 100 })
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
					z: myData[propertyName].z
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

	return (
		<div className="App">
			<h1>Flying Stuff</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="userName">User: </label>
				<input type="text" name="userName" id="userName" value={currentUserName} onChange={handleUserNameChange} />
			</form>
			<Canvas>
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
							<Sphere key={index} position={[element.x, element.y, element.z]} currentUser={currentUserName} currentUserTrue={element.userName === currentUserName} />
						)
					// })
					}) : null
				}
			</Canvas>
		</div>
	);
}

export default App;
