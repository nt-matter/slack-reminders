const { remindersList } = require(`../data/remindersList.js`)
const { getAge, isToday } = require(`./dates.js`)
const { sendMessage } = require(`./slack.js`)

// Check for reminders for today
exports.checkForReminders = async () => {
	const today = new Date()
	const todaysReminders = remindersList.filter((reminder) => isToday(reminder.date))

	console.log(todaysReminders)

	for (const reminder of todaysReminders) {
		const age = getAge(reminder.date)
		const yearText = age == 1 ? 'año' : 'años'
		const todayFormatted = today.toLocaleDateString('ES', {
			month: 'long',
			day: 'numeric',
		})

		const messages = {
			bot: `📆 <!everyone>: Siendo *${todayFormatted}* queda oficialmente inaugurado el *NTM Bot* 🤖!! 🔥🎇`,
			botday: `📆 <!everyone>: Un día como hoy hace ${age} ${yearText} cobraba vida el *NTM Bot* 🤖!! 🍰⌛`,

			birthday: `📆 <!everyone>: Hoy *${todayFormatted}* <${reminder.handler}> cumple ${age} ${yearText}!! 🥳🎉🎂`,
			ntm: `📆 <!everyone>: Hoy *${todayFormatted}* <${reminder.handler}> cumple ${age} ${yearText} trabajando en *NTM*!! 🥳🎉`,
		}

		await sendMessage(messages[reminder.type])
	}
}
