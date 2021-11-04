import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

function Box(props) {
	// This reference gives us direct access to the THREE.Mesh object
	const ref = useRef()
	// Hold state for hovered and clicked events
	const [hovered, hover] = useState(false)
	const [clicked, click] = useState(Math.floor(Math.random() * 5))
	// Subscribe this component to the render-loop, rotate the mesh every frame
	useFrame((state, delta) => {
		ref.current.rotation.x += 0.01
		ref.current.rotation.y += 0.001
		if (clicked === 0) {
			ref.current.position.z -= 0.01
		} else if (clicked === 1) {
			ref.current.position.x += 0.1 * Math.sin(ref.current.rotation.x)
			ref.current.position.y += 0.1 * Math.sin(ref.current.rotation.y)
			ref.current.position.z += 0.1 * Math.sin(ref.current.rotation.z)
		} else if (clicked === 2) {
			ref.current.position.x += -0.1 * Math.sin(ref.current.rotation.x)
			ref.current.position.y += -0.1 * Math.sin(ref.current.rotation.y)
			ref.current.position.z += -0.1 * Math.sin(ref.current.rotation.z)
		} else if (clicked === 3) {
			ref.current.position.z -= 0.1
		} else if (clicked === 4) {
			ref.current.position.z += 0.1
		}
		if (ref.current.position.x > 100) {
			ref.current.position.x = -100
		}
		if (ref.current.position.x < -100) {
			ref.current.position.x = 100
		}
		if (ref.current.position.y > 100) {
			ref.current.position.y = -100
		}
		if (ref.current.position.y < -100) {
			ref.current.position.y = 100
		}
		if (ref.current.position.z > 0) {
			ref.current.position.z = -100
		}
		if (ref.current.position.z < -100) {
			ref.current.position.z = 0
		}
	})
	// Return the view, these are regular Threejs elements expressed in JSX
	return (
		<mesh
			{...props}
			ref={ref}
			scale={clicked ? 0.5 : 0.5}
			onClick={(event) => click(clicked > 3 ? clicked + 1 : 0)}
			onPointerOver={(event) => hover(true)}
			onPointerOut={(event) => hover(false)}>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={hovered || clicked === 0 ? 'grey' : (clicked === 1 ? 'green' : (clicked === 2 ? 'teal' : (clicked === 3 ? 'purple' : 'red')))} />
		</mesh>
	)
}

export default Box