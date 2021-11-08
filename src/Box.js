import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

function Box(props) {
	// This reference gives us direct access to the THREE.Mesh object
	const curSquare = useRef()
	// Hold state for hovered and clicked events
	const [hover, setHover] = useState(false)
	const [click, setClick] = useState(Math.floor(Math.random() * 5))
	// Subscribe this component to the render-loop, rotate the mesh every frame
	useFrame((state, delta) => {
		curSquare.current.rotation.x += 0.01
		curSquare.current.rotation.y += 0.001
		if (click === 0) {
			curSquare.current.position.z += 0.01
		} else if (click === 1) {
			curSquare.current.position.x += 0.1 * Math.sin(curSquare.current.rotation.x)
			curSquare.current.position.y += 0.1 * Math.sin(curSquare.current.rotation.y)
			curSquare.current.position.z += 0.1 * Math.sin(curSquare.current.rotation.z)
		} else if (click === 2) {
			curSquare.current.position.x += -0.1 * Math.sin(curSquare.current.rotation.x)
			curSquare.current.position.y += -0.1 * Math.sin(curSquare.current.rotation.y)
			curSquare.current.position.z += -0.1 * Math.sin(curSquare.current.rotation.z)
		} else if (click === 3) {
			curSquare.current.position.z += 0.1
		} else if (click === 4) {
			curSquare.current.position.z += 0.05
		}
		curSquare.current.position.z += 0.1
		// bounding
		const boundSize = 100
		if (curSquare.current.position.x > boundSize) {
			curSquare.current.position.x = -1 * boundSize
		}
		if (curSquare.current.position.x < -1 * boundSize) {
			curSquare.current.position.x = boundSize
		}
		if (curSquare.current.position.y > 0.5 * boundSize) {
			curSquare.current.position.y = -0.5 * boundSize
		}
		if (curSquare.current.position.y < -0.5 * boundSize) {
			curSquare.current.position.y = 0.5* boundSize
		}
		if (curSquare.current.position.z > 0) {
			curSquare.current.position.z = -1 * boundSize
		}
		if (curSquare.current.position.z < -1 * boundSize) {
			curSquare.current.position.z = 0
		}
	})
	// Return the view, these are regular Threejs elements expressed in JSX
	return (
		<mesh
			{...props}
			ref={curSquare}
			scale={click ? 0.5 : 0.5}
			onClick={(event) => setClick(click > 5 ? 0 : click + 1)}
			onPointerOver={(event) => setHover(true)}
			onPointerOut={(event) => setHover(false)}>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={hover || click === 0 ? 'grey' : (click === 1 ? 'green' : (click === 2 ? 'teal' : (click === 3 ? 'purple' : 'red')))} />
		</mesh>
	)
}

export default Box