const express = require('express')
const httpsrv = require('httpsrv')
const request = require('request')
const fs = require('fs')
const ENCODED_SECRET = Buffer.from(
	/rpc-secret=(.*)/.exec(fs.readFileSync('aria2c.conf', 'utf-8'))[1]
).toString('base64')

const PORT = process.env.PORT || 1234
const app = express()
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
	const url = `https://${host}/ariang/#!/settings/rpc/set/https/${host}/443/jsonrpc/${ENCODED_SECRET}`
	res.send(`
<a href="${url}">AriaNg Panel</a>
<a href="/downloads/">Downloaded files</a>
`)
})
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
