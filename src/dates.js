const today = new Date()

function dateFromString(dateString) {
	const [d, m, y] = dateString.split(/[/-]/)

	return new Date(y, m - 1, d)
}

exports.isToday = (dateString) => {
	const date = dateFromString(dateString)

	if (!isNaN(date.getTime())) return date.getMonth() == today.getMonth() && date.getDate() == today.getDate()
}

exports.getAge = (dateString) => {
	const date = dateFromString(dateString)

	if (!isNaN(date.getTime())) return today.getFullYear() - date.getFullYear()
}
