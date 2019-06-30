/* eslint-disable indent */
const initialState = {
	play: false,
	sliderPosition:0,
};

export const common = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_PLAY':
			return {
				...state,
				play: action.play,
			};
		case 'SET_SLIDER_POSITION':
			return {
				...state,
				position: action.sliderPosition,
			};
		default:
			return state;
	}
};
