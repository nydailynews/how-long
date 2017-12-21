const second = 1000,
	minute = second * 60,
	hour = minute * 60,
	day = hour * 24;

counts = {
	target_time: null,
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
    init: function(target_time) {
        // Config handling. External config objects must be named c_config
        if ( typeof c_config !== 'undefined' ) this.update_config(c_config);
		if ( typeof target_time !== 'undefined') this.config['target_time'] = target_time;
		this.target_time = new Date(this.config['target_time']).getTime();

		let x = setInterval (function() {

			let now = new Date().getTime();
            // Count down
            var distance = counts.target_time - now;
            // Count up
            if ( counts.config.direction === 1 ) distance = now - counts.target_time;

			document.getElementById('days').innerHTML = Math.abs(Math.floor(distance / (day))),
			document.getElementById('hours').innerHTML = Math.abs(Math.floor((distance % (day)) / (hour))),
			document.getElementById('minutes').innerHTML = Math.abs(Math.floor((distance % (hour)) / (minute))),
			document.getElementById('seconds').innerHTML = Math.abs(Math.floor((distance % (minute)) / second));

		}, second)
    }
};

//let countDown = new Date('May 19, 2018 00:00:00').getTime(),
