var months = ['jan','feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

var getTodayDay = function () {
    var days = [
        "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"
    ];
    var date = new Date();
    return days[(date.getDay() - 1 )];
};

var getTodayDate = function () {
    var date = new Date();
    return getTodayDay() + ', ' + months[date.getMonth()] + ' ' +  date.getDate();
};

var getTime = function() {
    var dt = new Date();
    return dt.getHours() + ":" + addZero(dt.getMinutes());
};

var getStyledDate = function (num) {
    var days = [
        "mon", "tue", "wed", "thu", "fri", "sat", "sun"
    ];
    var date = new Date();
    return days[(date.getDay() + num) % 7];
};
var getCuttedTime = function (time) {
    return time.substring(11, 16);
};

var getStyledTime = function (time) {
    var date = new Date(time * 1000);
    return date.getHours() + ":" + date.getMinutes();
};

var countNumber = function (i) {
    return ((i % 4) + 1);
};

var setColor = function (c) {
    color = c;
    jQuery('#main').css('background-color',c);
    jQuery('#details .forecast-item svg path').css('fill',c);
};

var colorPalette = function() {
    var temp = roundTemp(wdata.main.temp);
    var colors = ['#b1695a', '#db9864', '#e3bb88', '#def1c5', '#80bbb2', '#69a5a6'];
      if (temp > 30) {
        setColor(colors[0]);
      } else if (temp > 26) {
          setColor(colors[1]);
      } else if (temp > 20) {
          setColor(colors[2]);
      } else if (temp >14) {
          setColor(colors[4]);
      } else if (temp > 8) {
          setColor(colors[4]);
      } else {
          setColor(colors[5]);
      }
};

var roundTemp = function (temp) {
    return Math.round(temp);
};

var toggleSettings = function() {
    if (jQuery('#settings .content').is(":visible")) {
        jQuery('#main').height('300px');
        jQuery('#main .content').delay(500).fadeIn();
        jQuery('#main .actual-icon').delay(500).fadeIn();
        jQuery('#details').delay(500).fadeIn();
        jQuery('#settings').height('0px');
        jQuery('#settings .content').fadeOut();
    } else {
        jQuery('#main').height('120px');
        jQuery('#main .content').fadeOut();
        jQuery('#main .actual-icon').fadeOut();
        jQuery('#details').fadeOut();
        jQuery('#settings').height('340px');
        jQuery('#settings .content').delay(500).fadeIn();
    }

};

var addZero = function(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
};

var showHourly = function () {
    jQuery('#details .hourly').removeClass('hidden');
    jQuery('#details .forecast').addClass('hidden');
};

var showForecast = function () {
    jQuery('#details .hourly').addClass('hidden');
    jQuery('#details .forecast').removeClass('hidden');
};

var toggleDetails = function() {
    // jQuery('#details .hourly').toggleClass('hidden');
    // jQuery('#details .forecast').toggleClass('hidden');
    if (jQuery('#details .hourly').is(':visible')) {
        jQuery('#details .hourly').fadeOut();
        jQuery('#details .forecast').delay(500).fadeIn();
    } else {
        jQuery('#details .forecast').fadeOut();
        jQuery('#details .hourly').delay(500).fadeIn();
        showHourlyWeatherData();
    }

};

var showDate = function() {
    jQuery('#details .header .date').html(getTodayDate());
    jQuery('#main .clock').html(getTime());
    var clock = setInterval(function()
    {
        jQuery('#details .header .date').html(getTodayDate());
        jQuery('#main .clock').html(getTime());
        console.log('refresh clock');
    }, 60000);
};

var setCity = function(city) {
    store.set('actual-city', city);
    jQuery('#settings input#city').val(city);
};

var setFormat = function(format) {
    store.set('format', format);
    jQuery('input:radio[value=' + format + ']')[0].checked = true;
};

var setApiKey = function(key) {
    store.set('apikey', key);
    jQuery('#settings input#apikey').val(key);
};

var setMbInfo = function(bool) {
    store.set('mb-info', bool);
    jQuery('input[type="checkbox"]').prop('checked', bool);
};

var showErrorMessage = function(message) {
    // ToDo
    setColor('#444444');
    jQuery('#main .content .temp').html('=(');
    jQuery('#main .content .temp-note').html(message);
};

var getMbInfo = function() {
    if (store.get('mb-info') != null) {
        return store.get('mb-info');
    }  else {
        return true;
    }
};

var getApiKey = function () {
    if (store.get('apikey')) {
        return store.get('apikey')
    } else {
        showErrorMessage('No API Key');
    }
};

var getFormat = function() {
    if (store.get('format')) {
        return store.get('format');
    } else {
        return 'metric';
    }
};

var getCity = function () {
    return store.get('actual-city');
};

// number of drops created.
var nbDrop = 300;

var showRain = function() {
    for( i=1;i<nbDrop;i++) {
        var dropLeft = randRange(0,1600);
        var dropTop = randRange(-1000,1400);

        jQuery('#main').append('<div class="drop" id="drop'+i+'"></div>');
        jQuery('#drop'+i).css('left',dropLeft);
        jQuery('#drop'+i).css('top',dropTop);
    }
};

var showThunder = function() {
    jQuery('#main').prepend('<div class="thunder"></div>');
};

var reset = function() {
    jQuery('.drop').remove();
    jQuery('.thunder').remove();
};

// function to generate a random number range.
function randRange( minNum, maxNum) {
    return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
}