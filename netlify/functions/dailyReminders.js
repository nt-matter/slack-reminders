const { checkForReminders } = require('../../src/reminders')

exports.handler = async (event, context) => {
	await checkForReminders()

	return { statusCode: 200 }
}
