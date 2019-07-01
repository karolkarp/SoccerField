import data from '../../data';

export function setPlay(play){
	return{
		type:'SET_PLAY',
		play
	};
}

export function setSliderPosition(sliderPosition){
	return{
		type:'SET_SLIDER_POSITION',
		sliderPosition
	};
}

function preparePositions(animationFrame){
	for(let i = animationFrame; i <= data.player_positions.length; i++){

	}
}

export function setInterval(animationFrame = 0){
	return async (dispatch) => {
		try{
			let i = 0;
			this.interval = await setInterval(() => {
				i++;
			}, 100);
		} catch(e) {
			console.error(e);
		}
	};
}