const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

counts = {
    target_time: null,
    config: {
        direction: 0,   // 0 to count down to something, 1 to count up from something
        show_month_ann: 0,  // Configured by the script on the month anniversaries of the date we're tracking
        has_month_ann: 0,  // Configured by the script on the month anniversaries of the date we're tracking
    },
    ap_numerals: ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'],
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
    month_display: function() {
        // On the exactly-one-month anniversaries, change the display.
        
    },
    init: function(target_time) {
        // Config handling. External config objects must be named c_config
        if ( typeof c_config !== 'undefined' ) this.update_config(c_config);
        if ( typeof target_time !== 'undefined') this.config['target_time'] = target_time;
        this.target_time = new Date(this.config['target_time']).getTime();

        if ( document.getElementById('month-anniversary') !== null ) {
            this.config['show_month_ann'] = 1;
            var target_date = new Date(this.config['target_time']);
            var today = new Date();
            if ( target_date.getDate() == today.getDate() ) {
                // We have a match. Calculate the months and hide the day / hour / minute / second.
                this.config['has_month_ann'] = 1;
                var months = ( today.getYear() - target_date.getYear() ) * 12 + ( today.getMonth() - target_date.getMonth() );
                var month_str = months;
                if ( months <= 10 ) month_str = this.ap_numerals[months];
                document.getElementById('month-anniversary').textContent = month_str + " months";
                document.getElementById('d').parentNode.removeChild(document.getElementById('d'));
                document.getElementById('m').parentNode.removeChild(document.getElementById('m'));
                document.getElementById('s').parentNode.removeChild(document.getElementById('s'));
                document.getElementById('h').parentNode.removeChild(document.getElementById('h'));
                this.months = month_str;
                return true;
            }
        }

        let x = setInterval (function() {

            let now = new Date().getTime();
            // Count down
            var distance = counts.target_time - now;
            // Count up
            if ( counts.config.direction === 1 ) distance = now - counts.target_time;

            // *** Figure out if we're counting down to something and that thing has already happened.
            if ( counts.config.direction === 0 && distance < 0 ) {
                // We're finished counting.
                document.getElementById('days').innerHTML = 0;
                document.getElementById('hours').innerHTML = 0;
                document.getElementById('minutes').innerHTML = 0;
                document.getElementById('seconds').innerHTML = 0;
            }
            else {
                document.getElementById('days').innerHTML = Math.floor(Math.abs(distance / (day))),
                document.getElementById('hours').innerHTML = Math.floor(Math.abs((distance % (day)) / (hour))),
                document.getElementById('minutes').innerHTML = Math.floor(Math.abs((distance % (hour)) / (minute))),
                document.getElementById('seconds').innerHTML = Math.floor(Math.abs((distance % (minute)) / second));
            }

        }, second)
    }
};

//let countDown = new Date('May 19, 2018 00:00:00').getTime(),
