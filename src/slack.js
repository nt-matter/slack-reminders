require('dotenv').config()
const axios = require('axios')

// Generate Slack webhook from https://ntmatter.slack.com/apps/A0F7XDUAZ-incoming-webhooks?tab=settings
const generalChannel = process.env.SLACK_GENERAL_WEBHOOK_URL
const testChannel = process.env.SLACK_TEST_WEBHOOK_URL

// Send meesages to a channel on slack
exports.sendMessage = async (text) => {
	console.log('--- Sending message ---')
	console.log(text)

	const config = {
		method: 'post',
		url: process.env.CONTEXT === 'dev' ? testChannel : generalChannel,
		headers: { 'Content-Type': 'application/json' },
		data: JSON.stringify({ text }),
	}

	await axios(config).catch(function (error) {
		console.log(error.message)
	})
}
