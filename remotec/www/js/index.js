/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

console.log('1111111111111');
var app = {
    // Application Constructor
    initialize: function() {
        console.log('- initialize');
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        console.log('- bindEvents');
        document.addEventListener('deviceready', this.onDeviceReady, false);

        // setTimeout(this.onDeviceReady, 1000);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log('- onDeviceReady');

        // console.log('- StatusBar', StatusBar);
        // alert('onDeviceReady');

        // StatusBar.hide();
        // alert('StatusBar.hide');

        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('- receivedEvent', id);

        // var gyroscope = navigator.gyroscope;
        // console.log('- gyroscope', gyroscope);

        // alert('gyroscope');
        // alert(gyroscope);

        // alert(navigator.geolocation)

        navigator.vibrate(1000);

        // var updateGeo = function () {
        //     document.getElementById('geolocation').innerHTML = '';

        //     navigator.geolocation.getCurrentPosition(function (position) {
        //         var val = 'Latitude: '          + position.coords.latitude          + '<br>' +
        //           'Longitude: '         + position.coords.longitude         + '<br>' +
        //           'Altitude: '          + position.coords.altitude          + '<br>' +
        //           'Accuracy: '          + position.coords.accuracy          + '<br>' +
        //           'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '<br>' +
        //           'Heading: '           + position.coords.heading           + '<br>' +
        //           'Speed: '             + position.coords.speed             + '<br>' +
        //           'Timestamp: '         + position.timestamp                + '<br>';

        //         document.getElementById('geolocation').innerHTML = val;

        //         setTimeout(updateGeo, 1000);
        //     }, function (error) {
        //         document.getElementById('geolocation').innerHTML = 'code: '    + error.code    + '\n' +
        //           'message: ' + error.message + '\n';
        //         setTimeout(updateGeo, 1000);
        //     }, {
        //         timeout : 60*60*1000,
        //         maxAge: 0,
        //         enableHighAccuracy: true
        //     });   
        // }
        // updateGeo();

        navigator.compass.watchHeading(function (heading) {
            var element = document.getElementById('compass');
            element.innerHTML = 'magneticHeading: ' + heading.magneticHeading;
        }, function (compassError) {
            document.getElementById('compass').innerHTML = 'Compass error: ' + compassError.code;
        }, {
            frequency: 1000
        });

        // var options = { frequency: 2000 };
        // var watchID = navigator.accelerometer.watchAcceleration(function (acceleration) {
        //     var val = 'X: ' + acceleration.x + '<br>' +
        //           'Y: ' + acceleration.y + '<br>' +
        //           'Z: ' + acceleration.z + '<br>' +
        //           'Timestamp: '      + acceleration.timestamp + '<br>';

        //     document.getElementById('accelerometer').innerHTML = val;

        //     var x = acceleration.x;
        //     var y = acceleration.y;
        //     // if (y >= -1 && y <= 1 && x >= -3 && x <= 3) {
        //     //     document.body.classList.add('yes');
        //     // }
        //     // else {
        //     //     document.body.classList.remove('yes');
        //     // }
        // }, function () {
        //     document.getElementById('accelerometer').innerHTML = 'onError!';
        // }, options);

        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');
        // console.log('Received Event: ' + id);
    }
};

app.initialize();

document.getElementById('button-socket').onclick = function () {
    var ws = new WebSocket('ws://10.10.11.111:8080');

    ws.onopen = function(){
        navigator.vibrate(1000);

        navigator.compass.watchHeading(function (heading) {
            var element = document.getElementById('compass');
            element.innerHTML = 'magneticHeading: ' + heading.magneticHeading;

            ws.send(heading.magneticHeading);
        }, function (compassError) {
            document.getElementById('compass').innerHTML = 'Compass error: ' + compassError.code;
        }, {
            frequency: 1000
        });
    };
}

// setTimeout(function () {
//     navigator.vibrate(1000);
// }, 1000);

// document.getElementById('button-state1').onclick = function () {
//     document.getElementById('app').classList.add('hidden');
//     document.getElementById('state1').classList.remove('hidden');
//     navigator.vibrate(1000);
// }

// document.getElementById('state1').onclick = function () {
//     document.getElementById('state1').classList.add('hidden');
//     document.getElementById('state2').classList.remove('hidden');
//     navigator.vibrate(2000);
// }

// document.getElementById('state2').onclick = function () {
//     document.getElementById('state2').classList.add('hidden');
//     document.getElementById('app').classList.remove('hidden');
//     navigator.vibrate(3000);
// }