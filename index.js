const express = require('express')
const httpsrv = require('httpsrv')
const request = require('request')

const PORT = process.env.PORT || 1234
const app = express()
app.get('/jsonrpc', (req, res) => {
	req.pipe(request('http://localhost:6800/jsonrpc')).pipe(res)
})
app.use(
	httpsrv({
		basedir: __dirname + '/downloads'
	})
)
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
