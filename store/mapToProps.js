
import * as commonActions from './actions/common';

export const mapDispatchToProps = (dispatch) => {
	return {
		setPlay: (play)=>dispatch(commonActions.setPlay(play)),
		setSliderPosition: (position)=>dispatch(commonActions.setSliderPosition(position))
	};
};

export const mapStateToProps = (state) => {
	return state;
};
