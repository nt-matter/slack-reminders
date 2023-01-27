const { checkForReminders } = require('../../src/reminders')

exports.handler = async (event, context) => {
	checkForReminders();

	return { statusCode: 200 }
};