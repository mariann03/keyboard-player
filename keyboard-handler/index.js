const io = require('socket.io')(3001)
const sdk = require('cue-sdk')

sdk.CorsairPerformProtocolHandshake()
const errCode = sdk.CorsairGetLastError()
if (errCode === 0) {
	console.log('succsex!')
}

io.on('connection', (socket) => {
	socket.on('keyboard', (data) => {
		sdk.CorsairSetLedsColors(JSON.parse(data))
	})
})
