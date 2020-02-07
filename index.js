const http = require('http')
const httpProxy = require('http-proxy')
const express = require('express')
const request = require('request')
const httpsrv = require('httpsrv')
const fs = require('fs')
const SECRET = /rpc-secret=(.*)/.exec(
	fs.readFileSync('aria2c.conf', 'utf-8')
)[1]

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
app.use('/jsonrpc', (req, res) => {
	req.pipe(request('http://localhost:6800/jsonrpc')).pipe(res)
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
	res.send(`
<label for="secret">Enter your aria2 secret:</label>
<input id="secret" type="text">
<button id="go">Go to AriaNg Panel</button>
<br>
<a href="/downloads/">Downloaded files</a>
<script>
var urlWithoutSecret='https://${host}/ariang/#!/settings/rpc/set/wss/${host}/443/jsonrpc/'
go.onclick=function(){
	open(urlWithoutSecret+btoa(secret.value),'_blank')
}
</script>
`)
})
server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))

const APP_URL = `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`
const preventIdling = () => {
	request.post(
		'http://localhost:6800/jsonrpc',
		{
			json: {
				jsonrpc: '2.0',
				method: 'aria2.getGlobalStat',
				id: 'preventIdling',
				params: [`token:${SECRET}`]
			}
		},
		(err, resp, body) => {
			console.log('preventIdling: getGlobalStat response', body)
			const { numActive, numWaiting } = body.result
			if (parseInt(numActive) + parseInt(numWaiting) > 0) {
				console.log('preventIdling: make request to prevent idling')
				request(APP_URL)
			}
		}
	)
	setTimeout(preventIdling, 15 * 60 * 1000) // 15 min
}
preventIdling()
