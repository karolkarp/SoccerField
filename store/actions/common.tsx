export function setPlay(play): object{
	return{
		type:'SET_PLAY',
		play
	};
}

export function setSliderPosition(sliderPosition): object{
	return{
		type:'SET_SLIDER_POSITION',
		sliderPosition
	};
}

export function setCurrentFrame(currentFrame): object{
	return{
		type:'SET_CURRENT_FRAME',
		currentFrame
	};
}

export function setMoveAnimations(moveAnimations): object{
	return{
		type:'SET_MOVE_ANIMATIONS',
		moveAnimations
	};
}
