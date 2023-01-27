const { remindersList } = require(`../data/remindersList.js`)
const { getAge, isToday } = require(`./dates.js`)
const { sendMessage } = require(`./slack.js`)

// Check for reminders for today
exports.checkForReminders = async () => {
	const today = new Date()
	const todaysReminders = remindersList.filter((reminder) => isToday(reminder.date))

	for (const reminder of todaysReminders) {
		const age = getAge(reminder.date)
		const yearText = age > 1 ? 'años' : 'año'
		const todayFormatted = today.toLocaleDateString('ES', {
			month: 'long',
			day: 'numeric',
		})

		const messages = {
			birthday: `📆 <!everyone>: Hoy *${todayFormatted}* <${reminder.handler}> cumple ${age} ${yearText}!! 🥳🎉🎂`,
			ntm: `📆 <!everyone>: Hoy *${todayFormatted}* <${reminder.handler}> cumple ${age} ${yearText} trabajando en *NTM*!! 🥳🎉`,
		}

		await sendMessage(messages[reminder.type])
	}
}
