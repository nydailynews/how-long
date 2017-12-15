const second = 1000,
	minute = second * 60,
	hour = minute * 60,
	day = hour * 24;

let countDown = new Date('May 19, 2018 00:00:00').getTime(),
	x = setInterval (function() {

		let now = new Date().getTime(),
		distance = countDown - now;

		document.getElementById('days').innerHTML = Math.floor(distance / (day)),
		document.getElementById('hours').innerHTML = Math.floor((distance % (day)) / (hour)),
		document.getElementById('minutes').innerHTML = Math.floor((distance % (hour)) / (minute)),
		document.getElementById('seconds').innerHTML = Math.floor((distance % (minute)) / second);

	}, second)