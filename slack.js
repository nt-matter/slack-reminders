require('dotenv').config();

const { WebClient, LogLevel } = require("@slack/web-api");
const client = new WebClient(process.env.SLACK_TOKEN, {
	logLevel: LogLevel.DEBUG,
	retryConfig: { retries: 3 }
});

// Send meesages to a channel on slack
exports.sendMessage = async ({ text, channel }) => {
	try {
		const result = await client.chat.postMessage({
			channel,
			text
		});
	}
	catch (error) {
		console.error(error);
	}
}
