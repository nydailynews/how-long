const second = 1000,
	minute = second * 60,
	hour = minute * 60,
	day = hour * 24;

counts = {
    config: {
		direction: 0, 	// 0 to count down, 1 to count up
    },
	update_config: function(config) {
        // Take an external config object and update this config object.
        for ( var key in config )
        {
            if ( config.hasOwnProperty(key) )
            {
                this.config[key] = config[key];
            }
        }
	},
    init: {
        // Config handling. External config objects must be named c_config
        if ( typeof c_config !== 'undefined' ) this.update_config(c_config);
    }
};

let countDown = new Date('May 19, 2018 00:00:00').getTime(),
	x = setInterval (function() {

		let now = new Date().getTime(),
		distance = countDown - now;

		document.getElementById('days').innerHTML = Math.floor(distance / (day)),
		document.getElementById('hours').innerHTML = Math.floor((distance % (day)) / (hour)),
		document.getElementById('minutes').innerHTML = Math.floor((distance % (hour)) / (minute)),
		document.getElementById('seconds').innerHTML = Math.floor((distance % (minute)) / second);

	}, second)
