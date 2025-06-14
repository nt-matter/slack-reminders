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
		const yearText = age == 1 ? 'año' : 'años'
		const todayFormatted = today.toLocaleDateString('ES', {
			month: 'long',
			day: 'numeric',
		})

		const messages = {
			bot: `📆 <!everyone>: Un día como hoy hace ${age} ${yearText} cobraba vida el *EpicBot* 🤖!! 🍰⌛`,
			epicdevs: `📆 <!everyone>: Hoy se cumplen ${age} ${yearText} desde que arrancó este viaje en *EpicDevs*!! 🎉🍰⌛`,
			birthday: `📆 <!everyone>: Hoy *${todayFormatted}* <${handlers[name]}> cumple ${age} ${yearText}!! 🥳🎉🎂`,
			aniversary: `📆 <!everyone>: Un *${todayFormatted}* como hoy, hace ${age} ${yearText}, comenzaba el viaje de <${handlers[name]}> en *EpicDevs*!! 💼🚀`,
		}

		// Bail if no age
		if (age <= 0) return

		await sendMessage(messages[type])
	}
}
