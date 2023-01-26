const { checkForReminders } = require(`${process.env.PWD}/index.js`)

exports.handler = async (event, context) => {
	checkForReminders();

	return {
		statusCode: 200,
		body: 'Reminders sent',
	}
};