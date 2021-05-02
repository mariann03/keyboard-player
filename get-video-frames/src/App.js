import React, { useRef } from 'react'
import Canvas from './components/Canvas'
import Video from './assets/video2.mp4'
import { KEYBOARD_LAYOUT } from './utils/keyboard'

import './styles.css'

function App() {
	const videoRef = useRef()
	return (
		<>
			<Canvas videoRef={videoRef} />
			<video
				ref={videoRef}
				src={Video}
				controls
				crossOrigin="anonymous"
				style={{ marginLeft: KEYBOARD_LAYOUT.left, marginTop: KEYBOARD_LAYOUT.height }}
				width={KEYBOARD_LAYOUT.width - KEYBOARD_LAYOUT.left}
			/>
		</>
	)
}

export default App
