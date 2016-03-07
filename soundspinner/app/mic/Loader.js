/**
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define(["Tone/core/Buffer"], function (Buffer) {

	var soundUrls = [ {
		title:'This is a test',
		url: 'audio/this-is-a-test.wav'
	},{
		title: 'Cool!',
		url: 'audio/kids/150819_kid_cool.wav'
	},{
		title:'Look at this!',
		url: 'audio/kids/150819_kid_look_at_this.wav'
	},{
		title: 'Whoa!',
		url: 'audio/kids/150819_kid_whoa.wav'
	},{
		title: 'Mayah',
		url: 'audio/kids/150824_mayah_voice_spinner.wav'
	},{
		title: 'La La La La',
		url: 'audio/kids/150914_mayah_voice_spinner_sample.mp3'
	}];

	var Loader = function(callback){
		//parse the url for "preset" string
		var str = window.location.search;
		var objURL = {};

		str.replace(
		new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
			function( $0, $1, $2, $3 ){ objURL[ $1 ] = $3; }
		);
		if(objURL === undefined || objURL.preset === undefined) {
			objURL.preset = 5;
		}

		var sound = soundUrls[objURL.preset];
		if (sound){
			var buffer = new Buffer(sound.url, function(){
				callback(buffer.get());
			});
		}
	};

	return Loader;
});