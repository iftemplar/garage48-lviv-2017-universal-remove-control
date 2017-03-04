var devices = [
    {id: 'lamp'},
    {id: 'tv'},
    {id: 'fan'},
];

var currentDeviceView = null;
var showDeviceView = function (deviceId) {
  var dfd = jQuery.Deferred();

  if (currentDeviceView == deviceId) {
    dfd.resolve();
    return dfd.promise();
  }

  var template = document.getElementById('device-' + deviceId);

  if (template) {
    var view = document.getElementById('view');
    view.innerHTML = template.innerHTML;
    view.classList.add('visible');
    view.setAttribute('data-device', deviceId);

    currentDeviceView = deviceId;
  }

  setTimeout(function () {
    dfd.resolve();
  }, 500);

  return dfd.promise();
}

var hideAllDevicesView = function () {
  var dfd = jQuery.Deferred();
  var view = document.getElementById('view');

  view.classList.remove('visible');
  view.removeAttribute('data-device');

  setTimeout(function () {
    dfd.resolve();
  }, 500);

  return dfd.promise();
}

var app = {
  initialize: function() {
    this.bindEvents();
  },
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  onDeviceReady: function() {
    var wsURL = 'ws://10.10.11.111:8080';
    var ws;

    navigator.compass.watchHeading(function (heading) {
      var heading = heading.magneticHeading;

      // document.getElementById('view').setAttribute('data-compass', heading);

      if (heading >= 10 && heading <= 60) {
        showDeviceView('lamp');
      }
      else if (heading >= 90 && heading <= 180) {
        showDeviceView('tv');
      }
      else if (heading >= 300 && heading <= 360) {
        showDeviceView('fan');
      }
      else {
        hideAllDevicesView();
      }
    }, function (compassError) {
        document.getElementById('compass').innerHTML = 'Compass error: ' + compassError.code;
    });

    var s = 0;
    document.getElementById('app').onclick = function () {
      s++;
      if (s == 1) {
        document.getElementById('lamp').classList.remove('hidden');
        document.getElementById('tv').classList.add('hidden');
        document.getElementById('fan').classList.add('hidden');
      }
      else if (s == 2) {
        document.getElementById('lamp').classList.add('hidden');
        document.getElementById('tv').classList.remove('hidden');
        document.getElementById('fan').classList.add('hidden');
      }
      else if (s == 3) {
        document.getElementById('lamp').classList.add('hidden');
        document.getElementById('tv').classList.add('hidden');
        document.getElementById('fan').classList.remove('hidden');
        s = 0;
      }
    }

    console.log(wsURL);

    try {
      ws = new WebSocket(wsURL);
      ws.onopen = function(){
        console.log('connected');
        ws.send('WEEEEELCOME!');

        // try {
        //     // document.getElementById('compass').innerHTML = 'wow!';

        //     // navigator.compass.watchHeading(function (heading) {
        //     //     var element = document.getElementById('compass');
        //     //     element.innerHTML = 'magneticHeading: ' + heading.magneticHeading;

        //     //     ws.send(heading.magneticHeading);
        //     // }, function (compassError) {
        //     //     document.getElementById('compass').innerHTML = 'Compass error: ' + compassError.code;
        //     // });
        // }
        // catch (e) {
        //     console.log('error');
        //     console.log(e);
        // }
        
        // ws.close();
      }
    }
    catch (e) {
      console.log('error');
      console.log(e);
    }
  }
};

app.initialize();