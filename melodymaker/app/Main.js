require(['domready', 'style/main.scss', 'grid/Grid', 'interface/Bottom', 'sound/Sequencer', 
	'Tone/core/Transport', 'sound/Player', 'StartAudioContext'],
function(domReady, mainStyle, Grid, Bottom, Sequencer, Transport, Player, StartAudioContext) {
	domReady(function() {

		window.parent.postMessage("loaded", "*");

		var grid = new Grid(document.body);
		var bottom = new Bottom(document.body);

		bottom.onDirection = function(dir) {
			grid.setDirection(dir);
		};

		var player = new Player();

		var seq = new Sequencer(function(time, step) {
			var notes = grid.select(step);
			player.play(notes, time);
		});

		grid.onNote = function(note) {
			player.tap(note);
		};

		Transport.on('stop', function() {
			grid.select(-1);
		});

		//send the ready message to the parent
		var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

		//full screen button on iOS
		if (isIOS){
			//make a full screen element and put it in front
			var iOSTapper = document.createElement("div");
			iOSTapper.id = "iOSTap";
			iOSTapper.addEventListener("touchstart", function(e){
				e.preventDefault();
			});
			document.body.appendChild(iOSTapper);
			StartAudioContext.setContext(Transport.context);
			StartAudioContext.on(iOSTapper);
			StartAudioContext.onStarted(function(){
				iOSTapper.remove();
				window.parent.postMessage('ready','*');
			});
		} else {
			window.parent.postMessage('ready','*');
		}
	});
});
