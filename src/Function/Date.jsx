export function createDate (timeStamps){
	var now = Date.now();

	var originalTimestamp = timeStamps; 

	var diff = now - originalTimestamp;

	var minutes = Math.floor(diff / (60 * 1000));

	var formattedText = "";

	if (minutes < 60) {
		formattedText =   minutes + " minutes ago";
	} else if (minutes < 24 * 60) {
		var hours = Math.floor(minutes / 60);
		formattedText =  hours + " heures ago ";
	} else {
		var days = Math.floor(minutes / (24 * 60));
		formattedText =  days + " jours ago ";
	}

	return formattedText
}
