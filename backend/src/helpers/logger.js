const pino = require('pino')
const dayjs = require('dayjs')

const logger = pino({
	base: {
		pid: false,
	},
	timestamp: () => `,"time":"${dayjs().format()}"`,
})

module.exports = logger
