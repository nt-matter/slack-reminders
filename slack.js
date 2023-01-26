require('dotenv').config();

const { WebClient, LogLevel } = require("@slack/web-api");
const client = new WebClient(process.env.SLACK_TOKEN);

// Send meesages to a channel on slack
exports.sendMessage = async ({ text, channel }) => {
	try {
		const result = await client.chat.postMessage({
			channel,
			text
		});

		return result;
	}
	catch (error) {
		console.error(error);
	}
}
