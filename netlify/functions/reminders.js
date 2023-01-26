const { checkForReminders } = require('../../index.js')

exports.handler = async (event, context) => {
	checkForReminders();

	return { statusCode: 200 }
};