require('dotenv').config();
const SlackNotify = require('slack-notify');
const slack = SlackNotify(process.env.SLACK_WEBHOOK_URL);

// Send meesages to a channel on slack
exports.sendMessage = async ({ text, channel }) => {
	console.log('--- Sending message ---')
	console.log({ text, channel })

	slack.send({
		channel,
		text,
		icon_url: 'https://ntmatter.com/wp-content/uploads/2023/01/ntm-logo.jpg',
		username: 'NTM Bot'
	}).catch((err) => {
		console.log('--- API error ---')
		console.error(err);
	});
}
