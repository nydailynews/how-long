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
        id: '', // Set the parent ID for a counts object. Not in operation yet.
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
            var months = ( today.getYear() - target_date.getYear() ) * 12 + ( today.getMonth() - target_date.getMonth() );
            if ( target_date.getDate() == today.getDate() && months !== 0 ) {
                // We have a match. Calculate the months and hide the day / hour / minute / second.
                this.config['has_month_ann'] = 1;
                var month_str = months;
                if ( months <= 10 ) month_str = utils.ap_numerals[months];
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
                var totalDays = Math.floor(Math.abs(distance / (day)));
                var totalHours = Math.floor(Math.abs((distance % (day)) / (hour)));
                var totalMinutes = Math.floor(Math.abs((distance % (hour)) / (minute)));
                var totalSeconds = Math.floor(Math.abs((distance % (minute)) / second));

                document.getElementById('days').innerHTML = totalDays;
                document.getElementById('days-label').innerHTML = totalDays == 1
                    ? "day" : "days";
                document.getElementById('hours').innerHTML = totalHours;
                document.getElementById('hours-label').innerHTML = totalHours == 1
                    ? "hour" : "hours";
                document.getElementById('minutes').innerHTML = totalMinutes
                document.getElementById('minutes-label').innerHTML = totalMinutes == 1
                    ? "minute" : "minutes";
                document.getElementById('seconds').innerHTML = totalSeconds
                document.getElementById('seconds-label').innerHTML = totalSeconds == 1
                    ? "second" : "seconds";
            }

        }, second)
    }
};

// UTILS
var utils = {
    ap_numerals: ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'],
    months: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'],
    ap_months: ['Jan.', 'Feb.', 'March', 'April', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
    ap_date: function(date) {
        // Given a date such as "2018-02-03" return an AP style date.
        var this_year = new Date().getFullYear();
        var parts = date.split('-')
        var day = +parts[2];
        var month = this.ap_months[+parts[1] - 1];
        if ( this_year == +parts[0] ) return month + ' ' + day;
        return month + ' ' + day + ', ' + parts[0];
    },
    rando: function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for ( var i=0; i < 8; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    },
    add_zero: function(i) {
        // For values less than 10, return a zero-prefixed version of that value.
        if ( +i < 10 ) return "0" + i;
        return i;
    },
    parse_date_str: function(date) {
        // date is a datetime-looking string such as "2017-07-25"
        // Returns a date object.
        if ( typeof date !== 'string' ) return Date.now();

        var date_bits = date.split(' ')[0].split('-');

        // We do that "+date_bits[1] - 1" because months are zero-indexed.
        var d = new Date(date_bits[0], +date_bits[1] - 1, date_bits[2], 0, 0, 0);
        return d;
    },
    parse_date: function(date) {
        // date is a datetime-looking string such as "2017-07-25"
        // Returns a unixtime integer.
        var d = this.parse_date_str(date);
        return d.getTime();
    },
    days_between: function(from, to) {
        // Get the number of days between two dates. Returns an integer. If to is left blank, defaults to today.
        // Both from and to should be strings 'YYYY-MM-DD'.
        // Cribbed from https://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
        if ( to == null ) to = new Date();
        else to = this.parse_date_str(to);
        from = this.parse_date_str(from);
        var days_diff = Math.floor((from-to)/(1000*60*60*24));
        return days_diff;
    },
    get_json: function(path, obj, callback) {
        // Downloads local json and returns it.
        // Cribbed from http://youmightnotneedjquery.com/
        var request = new XMLHttpRequest();
        request.open('GET', path, true);

        request.onload = function() {
            if ( request.status >= 200 && request.status < 400 ) {
                obj.data = JSON.parse(request.responseText);
                callback();
            }
            else {
                console.error('DID NOT LOAD ' + path + request);
                return false;
            }
        };
        request.onerror = function() {};
        request.send();
    },
    add_class: function(el, class_name) {
        // From http://youmightnotneedjquery.com/#add_class
        if ( el.classlist ) el.classList.add(class_name);
        else el.className += ' ' + class_name;
        return el;
    },
    add_js: function(src, callback) {
        var s = document.createElement('script');
        if ( typeof callback === 'function' ) s.onload = function() { callback(); }
        //else console.log("Callback function", callback, " is not a function");
        s.setAttribute('src', src);
        document.getElementsByTagName('head')[0].appendChild(s);
    },
}

function latest_news(url) {
    // Add the latest news headline to the latest-news-headline element.
    var s = document.createElement('script');
    s.onload = function() { document.getElementById('latest-news-headline').innerHTML = hed; }
    s.setAttribute('src', url + '?' + utils.rando());
    document.getElementsByTagName('head')[0].appendChild(s);
}
