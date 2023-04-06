const mongoose = require("mongoose");

async function connectToDb() {
	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log("connected to db");
	} catch (err) {
		console.log(err, "failed to connect to database");
	}
}

module.exports = connectToDb;
