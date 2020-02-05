const http = require('http')
const httpProxy = require('http-proxy')
const express = require('express')
const httpsrv = require('httpsrv')
const fs = require('fs')
const ENCODED_SECRET = Buffer.from(
	/rpc-secret=(.*)/.exec(fs.readFileSync('aria2c.conf', 'utf-8'))[1]
).toString('base64')

const PORT = process.env.PORT || 1234
const app = express()
const proxy = httpProxy.createProxyServer({
	target: 'ws://localhost:6800',
	ws: true
})
const server = http.createServer(app)

// Proxy websocket
server.on('upgrade', (req, socket, head) => {
	proxy.ws(req, socket, head)
})

// Handle normal http traffic
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
server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
