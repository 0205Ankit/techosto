const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')
const globalRoutes = require('./routes')
const logger = require('./helpers/logger')
const connectToDb = require('./db/connect')

dotenv.config()

const PORT = process.env.PORT || 6001
const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(
	cors({
		origin: '*',
	})
)

app.use('/users', globalRoutes)

app.listen(PORT, async () => {
	await connectToDb()
	logger.info(`App running at http://localhost:${PORT}`)
})
