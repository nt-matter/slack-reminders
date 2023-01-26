const { reminders } = require(`./data/reminders.js`)
const { getAge, isToday } = require(`./dates.js`)
const { sendMessage } = require(`./slack.js`)


// Check for reminders for today

exports.checkForReminders = () => {
	const today = new Date();
	const channel = '#test-channel';
	const todayReminders = reminders.filter((reminder) => isToday(reminder.date));

	for (const reminder of todayReminders) {

		const options = { month: 'long', day: 'numeric' };
		const age = getAge(reminder.date);
		const yearText = age > 1 ? 'años' : 'año';
		const messages = {
			birthday: `📆 <!everyone>: Hoy *${today.toLocaleDateString('ES', options)}* <${reminder.handler}> cumple ${age} ${yearText}!! 🥳🎉🎂`,
			ntm: `📆 <!everyone>: Hoy *${today.toLocaleDateString('ES', options)}* <${reminder.handler}> cumple ${age} ${yearText} trabajando en *NTM*!! 🥳🎉`,
		}
		const reminderMessage = messages[reminder.type];

		sendMessage({ channel, text: reminderMessage })
	}
}