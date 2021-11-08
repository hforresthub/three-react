import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'

function Camera(props) {
	const ref = useRef()
	const set = useThree(state => state.set)
	// Make the camera known to the system
	useEffect(() => {
		set({ camera: ref.current })
	}, [set])
	// Update it every frame
	useFrame(() => {
		// ref.current.updateMatrixWorld()
	})

	return <perspectiveCamera ref={ref} {...props} />
}

export default Camera