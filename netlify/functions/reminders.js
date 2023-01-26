const { checkForReminders } = require('../../index.js')

console.log(process.env);

exports.handler = async (event, context) => {
	checkForReminders();

	return {
		statusCode: 200,
		body: 'Reminders sent',
	}
};