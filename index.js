const express = require('express')
const httpsrv = require('httpsrv')
const expressWs = require('express-ws')
const websocket = require('websocket-stream')
const fs = require('fs')
const ENCODED_SECRET = Buffer.from(
	/rpc-secret=(.*)/.exec(fs.readFileSync('aria2c.conf', 'utf-8'))[1]
).toString('base64')

const PORT = process.env.PORT || 1234
const app = express()
expressWs(app)
app.ws('/jsonrpc', (ws, req) => {
	const aria = websocket('ws://localhost:6800/jsonrpc')
	ws.on('message', msg => aria.write(msg))
	aria.on('data', msg => ws.send(msg.toString('utf-8')))
})
app.use(
	'/downloads',
	httpsrv({
		basedir: __dirname + '/downloads'
	})
)
app.use('/ariang', express.static(__dirname + '/ariang'))
app.get('/', (req, res) => {
	const host = req.headers.host
	const url = `https://${host}/ariang/#!/settings/rpc/set/wss/${host}/443/jsonrpc/${ENCODED_SECRET}`
	res.send(`
<a href="${url}" target="_blank">AriaNg Panel</a>
<br>
<a href="/downloads/">Downloaded files</a>
`)
})
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
