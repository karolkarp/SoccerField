
import * as commonActions from './actions/common';

export const mapDispatchToProps = (dispatch) => {
	return {
		setPlay: (play)=>dispatch(commonActions.setPlay(play)),
		setSliderPosition: (sliderPosition)=>dispatch(commonActions.setSliderPosition(sliderPosition)),
		setInterval: (animationFrame)=>dispatch(commonActions.setInterval(animationFrame))
	};
};

export const mapStateToProps = (state) => {
	return state;
};
