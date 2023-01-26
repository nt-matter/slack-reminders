const { reminders } = require('./reminders.js');
const { getAge, isTheDateToday } = require('./dates.js');
const { sendMessage } = require('./slack.js');


// Check for reminders for today
exports.handler = async (event, context) => {
	const today = new Date();
	const channel = '#test-channel';
	const todayReminders = reminders.filter((reminder) => isTheDateToday(reminder.date));

	for (const reminder of todayReminders) {

		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		const messages = {
			birthday: `<!everyone>: 📆 Hoy es *${today.toLocaleDateString('ES', options)}* y <${reminder.handler}> cumple ${getAge(reminder.date)} años!! 🥳🎉🎂`,
			ntm: `<!everyone>: 📆 Hoy es *${today.toLocaleDateString('ES', options)}* y <${reminder.handler}> cumple ${getAge(reminder.date)} años trabajando en NTM!! 🥳🎉`,
		}
		const reminderMessage = messages[reminder.type];

		sendMessage({ channel, text: reminderMessage })
	}

	return {
		statusCode: 200,
		body: 'Reminders sent',
	}
};