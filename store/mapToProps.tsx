
import * as commonActions from './actions/common';

export const mapDispatchToProps = (dispatch): object => {
	return {
		setPlay: (play: boolean): void=>dispatch(commonActions.setPlay(play)),
		setSliderPosition: (sliderPosition: number): void=>dispatch(commonActions.setSliderPosition(sliderPosition)),
		setCurrentFrame: (currentFrame: number): void=>dispatch(commonActions.setCurrentFrame(currentFrame)),
		setMoveAnimations: (moveAnimations: object[]): void=>dispatch(commonActions.setMoveAnimations(moveAnimations)),
	};
};

export const mapStateToProps = (state: object): object => {
	return state;
};
