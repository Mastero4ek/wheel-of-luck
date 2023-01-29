//fullscreen
function toggleFullScreen() {
	if (!document.fullscreenElement &&    // альтернативный стандартный метод
		!document.mozFullScreenElement && !document.webkitFullscreenElement) {  // текущие методы работы
		if (document.documentElement.requestFullscreen) {
			document.documentElement.requestFullscreen();
		} else if (document.documentElement.mozRequestFullScreen) {
			document.documentElement.mozRequestFullScreen();
		} else if (document.documentElement.webkitRequestFullscreen) {
			document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		}
	} else {
		if (document.cancelFullScreen) {
			document.cancelFullScreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen();
		}
	}
}

const fullScreenBtn = document.querySelector('.game__button-full');

fullScreenBtn.addEventListener('click', () => {
	toggleFullScreen();
});

//change language
const en = document.querySelector('.game__button-en'),
	  ru = document.querySelector('.game__button-ru'),
	  allLang = ['ru', 'en'];

ru.addEventListener('click', () => {
	ru.style.display = 'none';
	en.style.display = 'flex';
	//перенаправит на нужный URL языка 
	let lang = en.value;
	location.href = window.location.pathname + '#' +lang;
	//location.reload();

	let hash = window.location.hash;
	hash = hash.substr(1);
	//проверяем наличие языков
	if(!allLang.includes(hash)) {
		location.href = window.location.pathname + '#en';
		location.reload();
	}

	en.value = hash;
	document.querySelector('title').innerHTML = langArr['title'][hash];

	let langDone = document.querySelectorAll('.lang-done');
	langDone.forEach((e) => {
		e.innerHTML = langArr['done'][hash];
	});

	for(let key in langArr) {
		let elem = document.querySelector('.lang-' + key);
		if(elem) {
			elem.innerHTML = langArr[key][hash];
		}
	}
});

en.addEventListener('click', () => {
	en.style.display = 'none';
	ru.style.display = 'flex';
	//перенаправит на нужный URL языка 
	let lang = ru.value;
	location.href = window.location.pathname + '#' +lang;
	//location.reload();

	let hash = window.location.hash;
	hash = hash.substr(1);
	//проверяем наличие языков
	if(!allLang.includes(hash)) {
		location.href = window.location.pathname + '#en';
		location.reload();
	}
	ru.value = hash;
	document.querySelector('title').innerHTML = langArr['title'][hash];

	let langDone = document.querySelectorAll('.lang-done');
	langDone.forEach((e) => {
		e.innerHTML = langArr['done'][hash];
	});

	for(let key in langArr) {
		let elem = document.querySelector('.lang-' + key);
		if(elem) {
			elem.innerHTML = langArr[key][hash];
		}
	}
});

//start-game

const enter = document.querySelector('.game__button-enter'),
	  closeBtn = document.querySelector('.game__button-close'),
	  menu = document.querySelector('.game__menu'),
	  field = document.querySelector('.field');

const langStart = document.querySelector('.lang-start-text'),
	  langSpin = document.querySelector('.lang-spin-text'),
	  langChoose = document.querySelector('.lang-choose-text');

enter.addEventListener('click', () => {
	menu.classList.add('inactive');

	setTimeout(() => {
		closeBtn.classList.toggle('active');
		closeBtn.style.display = 'flex';

		field.classList.toggle('active');

		if(!langStart.classList.contains('active') &&
			!langSpin.classList.contains('active') &&
			!langChoose.classList.contains('active')) {
			langStart.classList.add('active');
			langSpin.classList.remove('active');
			langChoose.classList.remove('active');
		} else
			if(langStart.classList.contains('active') &&
				!langSpin.classList.contains('active') &&
				!langChoose.classList.contains('active')) {
				langStart.style.display = 'flex';
			} else
				if(!langStart.classList.contains('active') &&
					langSpin.classList.contains('active') &&
					!langChoose.classList.contains('active')) {
					langSpin.style.display = 'flex';
				} else
					if(!langStart.classList.contains('active')  &&
						!langSpin.classList.contains('active') &&
						langChoose.classList.contains('active')) {
						langChoose.style.display = 'flex';
					}
	}, 800);
});

closeBtn.addEventListener('click', () => {
	setTimeout(() => {
		menu.classList.remove('inactive');
	}, 800);

	closeBtn.classList.toggle('active');
	closeBtn.style.display = 'none';

	field.classList.toggle('active');

	langStart.style.display = 'none';
	langSpin.style.display = 'none';
	langChoose.style.display = 'none';
});

//rules

const rulesOpenBtn = document.querySelector('.game__button-rules'),
	  rulesCloseBtn = document.querySelector('.rules__button-close'),
	  rulesModal = document.querySelector('.rules');

	  rulesOpenBtn.addEventListener('click', () => {
	  	setTimeout(() => {
			overlay.classList.add('active');
		}, 500);

		setTimeout(() => {
			rulesModal.style.display = 'flex';
		}, 500);
	  });

	  rulesCloseBtn.addEventListener('click', () => {
	  	setTimeout(() => {
			overlay.classList.remove('active');
		}, 500);

		setTimeout(() => {
			rulesModal.style.display = 'none';
		}, 500);
	  });

//sound

const soundBtn = document.querySelector('.game__button-sound'),
	  muteBtn = document.querySelector('.game__button-mute'),
	  wheelMusic = new Audio('audio/roulette10s.mp3'),
	  cardMusic = new Audio('audio/card-flip0.5s.mp3'),
	  backMusic = new Audio('audio/back.mp3');

backMusic.addEventListener("canplaythrough", event => {
  //аудио может быть воспроизведено; проиграть, если позволяют разрешения
  backMusic.play();
  backMusic.setAttribute('loop', '100000');
});

soundBtn.addEventListener('click', () => {
	soundBtn.style.display = 'none';
	muteBtn.style.display = 'flex';
	backMusic.muted = true;
	wheelMusic.muted = true;
	cardMusic.muted = true;
});

muteBtn.addEventListener('click', () => {
	muteBtn.style.display = 'none';
	soundBtn.style.display = 'flex';
	backMusic.muted = false;
	wheelMusic.muted = false;
	cardMusic.muted = false;
});

//spin wheel

const wheel = document.querySelector('#wheel'),
	  startBtn = document.querySelector('#start');

let deg = 0;

startBtn.addEventListener('click', () => {
	wheelMusic.play();

	startBtn.classList.add('field__button-spin--inactive');

	deg = Math.floor(5000 + Math.random() * 5000);

	wheel.style.transition = 'all 10s ease';
	wheel.style.transform = `rotate(${deg}deg)`;
	wheel.classList.add('blur');
});

//shaffle cards

const shuffleBtn = document.querySelector('.field__button-shuffle');

shuffleBtn.addEventListener('click', () => {
	setTimeout(() => {
		cardWrapper.style.opacity = '1';
		cardWrapper.style.pointerEvents = 'auto';
		startBtn.classList.remove('field__button-spin--inactive');

		langStart.classList.remove('active');
		langSpin.style.display = 'flex';
		langSpin.classList.add('active');
		langChoose.classList.remove('active');

	}, 500);

	shuffleBtn.classList.add('inactive');
	shuffleBtn.style.display = 'none';

	for(let i = cardWrapper.children.length; i >= 0; i--) {
		cardWrapper.appendChild(cardWrapper.children[Math.random() * i|0]);
	}
});

//card choice

const cardWrapper = document.querySelector('.cards__wrapper'),
	  card = document.querySelectorAll('.card'),
	  cardFront = document.querySelectorAll('.card__front'),
	  cardBack = document.querySelectorAll('.card__back');

function cardChoice() {
	startBtn.classList.add('field__button-spin--inactive');

	cardWrapper.addEventListener('click', ({ target }) => {
		const cardClick = target.closest('.card');
		if (!cardClick) return;

		cardMusic.play();

		card.forEach((e) => {
			const cardOpen = e.classList.contains('card--open');
			if(cardOpen) return;

			e.classList.remove('card--close');
		});

		langStart.classList.remove('active');
		langSpin.style.display = 'flex';
		langSpin.classList.add('active');
		langChoose.classList.remove('active');

		const click = cardClick.dataset.card;
		const modalChoice = document.querySelector('.modal-card[data-modal="'+click+'"]');
		setTimeout(() => {
			overlay.classList.add('active');
		}, 500);
		setTimeout(() => {
			modalChoice.style.display = 'flex';
		}, 1000);

		cardClick.classList.remove('card--close');
		cardClick.classList.add('card--open');
		cardClick.lastElementChild.classList.add('card--show');
		cardClick.firstElementChild.classList.add('card--hide');
	});

	card.forEach((e) => {
		const cardOpen = e.classList.contains('card--open');
		if(cardOpen) return;

		e.classList.add('card--close');
	});
}

//description

function descLang() {
	langStart.classList.remove('active');
	langSpin.classList.remove('active');
	langChoose.style.display = 'flex';
	langChoose.classList.add('active');
}

//wheel rotation

wheel.addEventListener('transitionend', () => {
	const actualDeg = deg%360;

	wheel.style.transform = `rotate(${actualDeg}deg)`;
	wheel.classList.remove('blur');
	wheel.style.transition = 'none';

	if (actualDeg >= 0 && actualDeg <= 18) {
		cardMusic.play();

		if(cardFront[4].classList.contains('card--show')) {
			descLang();
			cardChoice();
		} else {
			card[4].classList.add('card--open');
			card[4].classList.remove('card--close');

			cardFront[4].classList.add('card--show');
			cardBack[4].classList.add('card--hide');

			setTimeout(() => {
				overlay.classList.add('active');
			}, 500);
			setTimeout(() => {
				modalCard[4].style.display = 'flex';
			}, 1000);
		}
	}

	if (actualDeg >= 19 && actualDeg <= 35) {
		cardMusic.play();

		if(cardFront[3].classList.contains('card--show')) {
			descLang();
			cardChoice();
		} else {
			card[3].classList.add('card--open');
			card[3].classList.remove('card--close');

			cardFront[3].classList.add('card--show');
			cardBack[3].classList.add('card--hide');

			setTimeout(() => {
				overlay.classList.add('active');
			}, 500);
			setTimeout(() => {
				modalCard[3].style.display = 'flex';
			}, 1000);	
		}
	}

	if (actualDeg >= 36 && actualDeg <= 54) {
		cardMusic.play();

		if(cardFront[2].classList.contains('card--show')) {
			descLang();
			cardChoice();
		} else {
			card[2].classList.add('card--open');
			card[2].classList.remove('card--close');

			cardFront[2].classList.add('card--show');
			cardBack[2].classList.add('card--hide');

			setTimeout(() => {
				overlay.classList.add('active');
			}, 500);
			setTimeout(() => {
				modalCard[2].style.display = 'flex';
			}, 1000);
		}
	}

	if (actualDeg >= 55 && actualDeg <= 71) {
		cardMusic.play();
	
		if(cardFront[1].classList.contains('card--show')) {
			descLang();
			cardChoice();
		} else {
			card[1].classList.add('card--open');
			card[1].classList.remove('card--close');

			cardFront[1].classList.add('card--show');
			cardBack[1].classList.add('card--hide');

			setTimeout(() => {
				overlay.classList.add('active');
			}, 500);
			setTimeout(() => {
				modalCard[1].style.display = 'flex';
			}, 1000);
		}
	}

	if (actualDeg >= 72 && actualDeg <= 90) {
		cardMusic.play();
	
		if(cardFront[0].classList.contains('card--show')) {
			descLang();
			cardChoice();
		} else {
			card[0].classList.add('card--open');
			card[0].classList.remove('card--close');

			cardFront[0].classList.add('card--show');
			cardBack[0].classList.add('card--hide');

			setTimeout(() => {
				overlay.classList.add('active');
			}, 500);
			setTimeout(() => {
				modalCard[0].style.display = 'flex';
			}, 1000);
		}
	}

	if (actualDeg >= 91 && actualDeg <= 107) {
		cardMusic.play();
		
		if(cardFront[19].classList.contains('card--show')) {
			descLang();
			cardChoice();
		} else {
			card[19].classList.add('card--open');
			card[19].classList.remove('card--close');

			cardFront[19].classList.add('card--show');
			cardBack[19].classList.add('card--hide');

			setTimeout(() => {
				overlay.classList.add('active');
			}, 500);
			setTimeout(() => {
				modalCard[19].style.display = 'flex';
			}, 1000);
		}
	}

	if (actualDeg >= 108 && actualDeg <= 126) {
		cardMusic.play();
		
		if(cardFront[18].classList.contains('card--show')) {
			descLang();
			cardChoice();
		} else {
			card[18].classList.add('card--open');
			card[18].classList.remove('card--close');

			cardFront[18].classList.add('card--show');
			cardBack[18].classList.add('card--hide');

			setTimeout(() => {
				overlay.classList.add('active');
			}, 500);
			setTimeout(() => {
				modalCard[18].style.display = 'flex';
			}, 1000);
		}
	}

	if (actualDeg >= 127 && actualDeg <= 143) {
		cardMusic.play();

		if(cardFront[17].classList.contains('card--show')) {
			descLang();
			cardChoice();
		} else {
			card[17].classList.add('card--open');
			card[17].classList.remove('card--close');

			cardFront[17].classList.add('card--show');
			cardBack[17].classList.add('card--hide');

			setTimeout(() => {
				overlay.classList.add('active');
			}, 500);
			setTimeout(() => {
				modalCard[17].style.display = 'flex';
			}, 1000);
		}
	}

	if (actualDeg >= 144 && actualDeg <= 162) {
		cardMusic.play();
		
		if(cardFront[16].classList.contains('card--show')) {
			descLang();
			cardChoice();
		} else {
			card[16].classList.add('card--open');
			card[16].classList.remove('card--close');

			cardFront[16].classList.add('card--show');
			cardBack[16].classList.add('card--hide');

			setTimeout(() => {
				overlay.classList.add('active');
			}, 500);
			setTimeout(() => {
				modalCard[16].style.display = 'flex';
			}, 1000);
		}
	}

	if (actualDeg >= 163 && actualDeg <= 179) {
		cardMusic.play();

		if(cardFront[15].classList.contains('card--show')) {
			descLang();
			cardChoice();
		} else {
			card[15].classList.add('card--open');
			card[15].classList.remove('card--close');

			cardFront[15].classList.add('card--show');
			cardBack[15].classList.add('card--hide');

			setTimeout(() => {
				overlay.classList.add('active');
			}, 500);
			setTimeout(() => {
				modalCard[15].style.display = 'flex';
			}, 1000);
		}
	}

	if (actualDeg >= 180 && actualDeg <= 198) {
		cardMusic.play();
		
		if(cardFront[14].classList.contains('card--show')) {
			descLang();
			cardChoice();
		} else {
			card[14].classList.add('card--open');
			card[14].classList.remove('card--close');

			cardFront[14].classList.add('card--show');
			cardBack[14].classList.add('card--hide');

			setTimeout(() => {
				overlay.classList.add('active');
			}, 500);
			setTimeout(() => {
				modalCard[14].style.display = 'flex';
			}, 1000);
		}
	}

	if (actualDeg >= 199 && actualDeg <= 215) {
		cardMusic.play();
		
		if(cardFront[13].classList.contains('card--show')) {
			descLang();
			cardChoice();
		} else {
			card[13].classList.add('card--open');
			card[13].classList.remove('card--close');

			cardFront[13].classList.add('card--show');
			cardBack[13].classList.add('card--hide');

			setTimeout(() => {
				overlay.classList.add('active');
			}, 500);
			setTimeout(() => {
				modalCard[13].style.display = 'flex';
			}, 1000);
		}
	}

	if (actualDeg >= 216 && actualDeg <= 234) {
		cardMusic.play();
		
		if(cardFront[12].classList.contains('card--show')) {
			descLang();
			cardChoice();
		} else {
			card[12].classList.add('card--open');
			card[12].classList.remove('card--close');

			cardFront[12].classList.add('card--show');
			cardBack[12].classList.add('card--hide');

			setTimeout(() => {
				overlay.classList.add('active');
			}, 500);
			setTimeout(() => {
				modalCard[12].style.display = 'flex';
			}, 1000);
		}
	}

	if (actualDeg >= 235 && actualDeg <= 251) {
		cardMusic.play();
		
		if(cardFront[11].classList.contains('card--show')) {
			descLang();
			cardChoice();
		} else {
			card[11].classList.add('card--open');
			card[11].classList.remove('card--close');

			cardFront[11].classList.add('card--show');
			cardBack[11].classList.add('card--hide');

			setTimeout(() => {
				overlay.classList.add('active');
			}, 500);
			setTimeout(() => {
				modalCard[11].style.display = 'flex';
			}, 1000);
		}
	}

	if (actualDeg >= 252 && actualDeg <= 270) {
		cardMusic.play();
		
		if(cardFront[10].classList.contains('card--show')) {
			descLang();
			cardChoice();
		} else {
			card[10].classList.add('card--open');
			card[10].classList.remove('card--close');

			cardFront[10].classList.add('card--show');
			cardBack[10].classList.add('card--hide');

			setTimeout(() => {
				overlay.classList.add('active');
			}, 500);
			setTimeout(() => {
				modalCard[10].style.display = 'flex';
			}, 1000);
		}
	}

	if (actualDeg >= 271 && actualDeg <= 287) {
		cardMusic.play();
	
		if(cardFront[9].classList.contains('card--show')) {
			descLang();
			cardChoice();
		} else {
			card[9].classList.add('card--open');
			card[9].classList.remove('card--close');

			cardFront[9].classList.add('card--show');
			cardBack[9].classList.add('card--hide');

			setTimeout(() => {
				overlay.classList.add('active');
			}, 500);
			setTimeout(() => {
				modalCard[9].style.display = 'flex';
			}, 1000);
		}
	}

	if (actualDeg >= 288 && actualDeg <= 306) {
		cardMusic.play();
	
		if(cardFront[8].classList.contains('card--show')) {
			descLang();
			cardChoice();
		} else {
			card[8].classList.add('card--open');
			card[8].classList.remove('card--close');

			cardFront[8].classList.add('card--show');
			cardBack[8].classList.add('card--hide');

			setTimeout(() => {
				overlay.classList.add('active');
			}, 500);
			setTimeout(() => {
				modalCard[8].style.display = 'flex';
			}, 1000);
		}
	}																	

	if (actualDeg >= 307 && actualDeg <= 323) {
		cardMusic.play();
	
		if(cardFront[7].classList.contains('card--show')) {
			descLang();
			cardChoice();
		} else {
			card[7].classList.add('card--open');
			card[7].classList.remove('card--close');

			cardFront[7].classList.add('card--show');
			cardBack[7].classList.add('card--hide');

			setTimeout(() => {
				overlay.classList.add('active');
			}, 500);
			setTimeout(() => {
				modalCard[7].style.display = 'flex';
			}, 1000);
		}	
	}

	if (actualDeg >= 324 && actualDeg <= 342) {
		cardMusic.play();
	
		if(cardFront[6].classList.contains('card--show')) {
			descLang();
			cardChoice();
		} else {
			card[6].classList.add('card--open');
			card[6].classList.remove('card--close');

			cardFront[6].classList.add('card--show');
			cardBack[6].classList.add('card--hide');

			setTimeout(() => {
				overlay.classList.add('active');
			}, 500);
			setTimeout(() => {
				modalCard[6].style.display = 'flex';
			}, 1000);
		}	
	}

	if (actualDeg >= 343 && actualDeg <= 360) {
		cardMusic.play();
	
		if(cardFront[5].classList.contains('card--show')) {
			descLang();
			cardChoice();			
		} else {
			card[5].classList.add('card--open');
			card[5].classList.remove('card--close');

			cardFront[5].classList.add('card--show');
			cardBack[5].classList.add('card--hide');

			setTimeout(() => {
				overlay.classList.add('active');
			}, 500);
			setTimeout(() => {
				modalCard[5].style.display = 'flex';
			}, 1000);
		}	
	}
});

//congratulations

function cardCheck() {
	const cardOpen = document.querySelectorAll('.card--open'),
	  	  modalFinal = document.querySelector('.modal-congratulation');

	if(card.length === cardOpen.length) {
		setTimeout(() => {
			overlay.classList.add('active');
		}, 500);

		setTimeout(() => {
			modalFinal.style.display = 'flex';
		}, 1000);
	}
};

//count-timer

const modalDone = document.querySelectorAll('.modal__button-done'),
	  modalClose = document.querySelectorAll('.modal__button-close'),
	  modalWrapper = document.querySelectorAll('.modal__description');

modalWrapper.forEach((e) => {
	e.addEventListener('click', ({target}) => {
		const btnClick = target.closest('.modal__button-done');

		if (!btnClick) return;
		btnClick.classList.add('inactive');

		const click = btnClick.dataset.btn,
			  countDownChoice = document.querySelector('.time[data-time="'+click+'"]'),
			  modalCls = document.querySelector('.modal__button-close[data-close="'+click+'"]');

		//четное или нечетное dataset
		if(Math.floor(click / 2) == click / 2) {
			//запускаем счетчик 300s
			let time5 = 1;

			let timerId5 = setInterval(() => {
				const minuts = Math.floor(time5 / 60);
				let seconds = time5 % 60;
				seconds = seconds < 10 ? "0" + seconds : seconds;

				countDownChoice.innerHTML = `${minuts} : ${seconds}`;

				time5--;
			},1000);
			//отключаем счетчик +2s
			setTimeout(() => {
				clearInterval(timerId5);
				countDownChoice.innerHTML = "";
				modalCls.classList.add('active');
			},1200);
		} else {
			//запускаем счетчик 180s
			let time3 = 1;

			let timerId3 = setInterval(() => {
				const minuts = Math.floor(time3 / 60);
				let seconds = time3 % 60;
				seconds = seconds < 10 ? "0" + seconds : seconds;

				countDownChoice.innerHTML = `${minuts} : ${seconds}`;

				time3--;
			},1000);
			//отключаем счетчик +2s
			setTimeout(() => {
				clearInterval(timerId3);
				countDownChoice.innerHTML = "";
				modalCls.classList.add('active');
			},1200);
		}
	});
});

//modal-windows
const overlay = document.querySelector('.overlay'),
	  modalCard = document.querySelectorAll('.modal-card');

modalClose.forEach((e) => {
	e.addEventListener('click', () => {
		cardCheck();
		overlay.classList.remove('active');

		modalDone.forEach((e) => {
			e.classList.add('active');
		});

		modalCard.forEach((e) => {
			e.style.display = 'none';
		});

		startBtn.classList.remove('field__button-spin--inactive');
	});
});

//new game

const exitBtn = document.querySelector('.game__button-exit'),
	  newGameBtn = document.querySelector('.modal__button-new'),
	  modalFinal = document.querySelector('.modal-congratulation');

exitBtn.addEventListener('click', () => {
	location.reload();
});

newGameBtn.addEventListener('click', () => {
	setTimeout(() => {
		overlay.classList.remove('active');
	}, 1000);

	setTimeout(() => {
		modalFinal.style.display = 'none';
	}, 500);

	cardWrapper.style.opacity = '0';
	cardWrapper.style.pointerEvents = 'none';

	startBtn.classList.add('field__button-spin--inactive');

	wheel.style.transform = `rotate(10deg)`;

	setTimeout(() => {
		langStart.classList.add('active');
		langStart.style.display = 'flex';
		langSpin.classList.remove('active');
		langChoose.classList.remove('active');
	}, 500);

	shuffleBtn.classList.remove('inactive');
	shuffleBtn.style.display = 'block';

	card.forEach((e) => {
		e.classList.remove('card--open');
		e.classList.remove('card--close');
	});

	cardFront.forEach((e) => {
		e.classList.remove('card--show');
		e.classList.remove('card--hide');
	});

	cardBack.forEach((e) => {
		e.classList.remove('card--show');
		e.classList.remove('card--hide');
	});

	modalDone.forEach((e) => {
		e.classList.add('active');
	});
});

