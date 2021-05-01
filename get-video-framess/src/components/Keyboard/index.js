import React from 'react'
import styles from './Keyboard.module.css'
import { KEYS_POSITION, KEYBOARD_LAYOUT } from '../../utils/keyboard'

export default function Keybard({ keys }) {
	return (
		<div
			className={styles.keyboardContainer}
			style={{ width: KEYBOARD_LAYOUT.width, height: KEYBOARD_LAYOUT.height, left: KEYBOARD_LAYOUT.width }}
		>
			{KEYS_POSITION.map(({ ledId, ...key }) => (
				<div
					key={ledId}
					style={{
						...key,
						background: `rgb(${keys[ledId]?.join()})`,
					}}
					className={styles.key}
				/>
			))}
		</div>
	)
}
