const { remindersList } = require(`../data/remindersList`)
const { handlers } = require(`../data/handlers`)
const { getAge, isToday } = require(`./dates`)
const { sendMessage } = require(`./slack`)

// Check for reminders for today
exports.checkForReminders = async () => {
	const today = new Date()
	const todaysReminders = remindersList.filter((reminder) => isToday(reminder.date))

	console.log(todaysReminders)

	for (const { date, name, type } of todaysReminders) {
		const age = getAge(date)
		const yearText = age == 1 ? 'aÃ±o' : 'aÃ±os'
		const todayFormatted = today.toLocaleDateString('ES', {
			month: 'long',
			day: 'numeric',
		})

		const messages = {
			bot: `ð <!everyone>: Un dÃ­a como hoy hace ${age} ${yearText} cobraba vida el *NTM Bot* ð¤!! ð°â`,
			birthday: `ð <!everyone>: Hoy *${todayFormatted}* <${handlers[name]}> cumple ${age} ${yearText}!! ð¥³ðð`,
			ntm: `ð <!everyone>: Hoy *${todayFormatted}* <${handlers[name]}> cumple ${age} ${yearText} trabajando en *NTM*!! ð¥³ð`,
		}

		// Bail if no age
		if (age <= 0) return

		await sendMessage(messages[type])
	}
}
