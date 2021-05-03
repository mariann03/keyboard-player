const io = require('socket.io')(3001)
const sdk = require('cue-sdk')

sdk.CorsairPerformProtocolHandshake()
const errCode = sdk.CorsairGetLastError()
if (!errCode) console.log('succses!')

io.on('connection', (socket) => {
	socket.on('keyboard', (data) => {
		sdk.CorsairSetLedsColors(JSON.parse(data))
	})
})
