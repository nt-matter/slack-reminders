require('dotenv').config()
const axios = require('axios')

// Send meesages to a channel on slack
exports.sendMessage = async (text) => {
	console.log('--- Sending message ---')
	console.log(text)

	const config = {
		method: 'post',
		url: process.env.SLACK_WEBHOOK_URL,
		headers: { 'Content-Type': 'application/json' },
		data: JSON.stringify({ text }),
	}

	await axios(config).catch(function (error) {
		console.log(error.message)
	})
}
