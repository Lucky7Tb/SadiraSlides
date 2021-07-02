window.addEventListener('load', () => {
	const openingTimerContainer = document.getElementById('opening-timer-container');
	const closingTimerContainer = document.getElementById('closing-timer-container');
	const btnOpenGate = document.getElementById('btn-open-gate');
	const btnCloseGate = document.getElementById('btn-close-gate');

	const openingMusic = new Howl({
	  src: ['static/music/opening_music.mp3'],
	  html5: true
	});

	let openGateTimer = 14; // menit
	let secondOpenGateTimer = 60; // detik
	// 14 menit + 60 detik = 15 menit

	let openGateTimerText = '';
	let secondOpeningText = '';

	let openGateInterval;

	btnOpenGate.onclick = () => {
		btnOpenGate.setAttribute('disabled', true);
		openingMusic.play();
		openGateInterval = setInterval(() => {

			if (secondOpenGateTimer === 60) {
				secondOpeningText = '59';
			} else if (secondOpenGateTimer < 10) {
				secondOpeningText = '0' + secondOpenGateTimer;
			} else {
				secondOpeningText = secondOpenGateTimer;
			}

			if (openGateTimer < 10) {
				openGateTimerText = '0' + openGateTimer;
			} else {
				openGateTimerText = openGateTimer;
			}

			if (openGateTimer === 0 && secondOpenGateTimer === 0) {
				openingTimerContainer.innerHTML = `${openGateTimerText}:00`;
				stopInterval();
			}

			if (secondOpenGateTimer === 0) {
				openGateTimer--;
				secondOpenGateTimer = 60;
			}

			openingTimerContainer.innerHTML = `${openGateTimerText}:${secondOpeningText}`;

			secondOpenGateTimer--;
		}, 1000);
	}

	const closingMusic = new Howl({
	  src: ['static/music/close_music.mp3'],
	  html5: true
	});

	let closeGateTimer = 9;
	let secondCloseGateTimer = 60;

	let closeGateTimerText = '';
	let secondClosingText = '';

	let closeGateInterval;

	btnCloseGate.onclick = () => {
		btnCloseGate.setAttribute('disabled', true);
		closingMusic.play();

		closeGateInterval = setInterval(() => {

			if (secondCloseGateTimer === 60) {
				secondClosingText = '59';
			} else if (secondCloseGateTimer < 10) {
				secondClosingText = '0' + secondCloseGateTimer;
			} else {
				secondClosingText = secondCloseGateTimer;
			}

			if (closeGateTimer < 10) {
				closeGateTimerText = '0' + closeGateTimer;
			} else {
				closeGateTimerText = closeGateTimer;
			}

			if (closeGateTimer === 0 && secondCloseGateTimer === 0) {
				closingTimerContainer.innerHTML = `${secondClosingText}:00`;
				stopClosingInterval();
			}

			if (secondCloseGateTimer === 0) {
				closeGateTimer--;
				secondCloseGateTimer = 60;
			}

			closingTimerContainer.innerHTML = `${closeGateTimerText}:${secondClosingText}`;

			secondCloseGateTimer--;

		}, 1000);
	}

	function stopInterval() {
		clearInterval(openGateInterval);
		openingMusic.stop();
		let newUrl = window.location.href.split('#slide=1');
		window.location.href = newUrl[0] + '#slide=2';
	}

	function stopClosingInterval() {
		clearInterval(closeGateInterval);
		closingMusic.stop();
	}
});