import React, { useEffect, useRef, useState } from 'react'
import { KEYS_POSITION, KEYBOARD_LAYOUT } from '../utils/keyboard'
import Keyboard from './Keyboard'
import { io } from 'socket.io-client'
const socket = io('http://localhost:3001', { transports: ['websocket'] })

function computeFrame(canvas, video, setKeys) {
	const context = canvas.getContext('2d')

	const scale = Math.max(canvas.width / video.videoHeight, canvas.height / video.videoHeight)
	const x = KEYBOARD_LAYOUT.left + canvas.width / 2 - (video.videoWidth / 2) * scale
	const y = KEYBOARD_LAYOUT.top + canvas.height / 2 - (video.videoHeight / 2) * scale

	context.drawImage(video, x, y, video.videoWidth * scale, video.videoHeight * scale)

	const { webFormat, keyboardFormat } = KEYS_POSITION.reduce(
		(acc, { ledId, top, left, height, width }) => {
			const colors = { r: 0, g: 0, b: 0 }
			const block = context.getImageData(left, top, width, height).data

			for (let i = 0; i < block.length; i += 4) {
				colors.r += block[i]
				colors.g += block[i + 1]
				colors.b += block[i + 2]
			}

			const blockGroups = block.length / 4
			colors.r = Math.floor(colors.r / blockGroups)
			colors.g = Math.floor(colors.g / blockGroups)
			colors.b = Math.floor(colors.b / blockGroups)

			acc.keyboardFormat.push({ ledId, ...colors })
			acc.webFormat[ledId] = Object.values(colors)

			return acc
		},
		{ webFormat: {}, keyboardFormat: [] }
	)
	setKeys(webFormat)
	socket.emit('keyboard', JSON.stringify(keyboardFormat))
}

function Canvas({ videoRef }) {
	const [keys, setKeys] = useState({})
	const canvasRef = useRef()

	useEffect(() => {
		const canvas = canvasRef.current
		const video = videoRef.current
		if (!canvas || !video) return

		video.onplay = () => {
			if (video.paused || video.ended) {
				return
			}
			computeFrame(canvas, video, setKeys)
			requestAnimationFrame(video.onplay)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<canvas
				ref={canvasRef}
				style={{ background: 'blue', position: 'absolute' }}
				height={KEYBOARD_LAYOUT.height}
				width={KEYBOARD_LAYOUT.width}
			/>
			<Keyboard keys={keys} />
		</>
	)
}

export default Canvas
