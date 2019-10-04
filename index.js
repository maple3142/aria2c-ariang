const httpsrv = require('httpsrv')

const PORT = process.env.PORT || 1234
httpsrv({
	basedir: __dirname + '/downloads'
}).listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
