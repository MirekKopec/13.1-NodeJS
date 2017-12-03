
function timeFormat(secs) {
	
	var hours = Math.floor(secs / (60 * 60));
    var mins = Math.floor((secs % (60 * 60)) / 60);
    var secs = Math.ceil((secs % (60 * 60)) % 60);
		
		if (hours > 0) {
			var TfOut = (hours + 'godz. ' + mins + 'min. ' + secs + 'sek.');

		} else {

			if (mins > 0) {
			var TfOut = (mins + 'min. ' + secs + 'sek.');

			} else {
				var TfOut = (secs + 'sek.');	
			}
		
		}
		
		return TfOut;
		
}

	exports.print = timeFormat;
