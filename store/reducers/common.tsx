/* eslint-disable indent */
interface Actions {
	type: string;
	play: boolean;
	sliderPosition: number;
	currentFrame: number;
	moveAnimations: object[];
	fieldDimensions: object;
}

const initialState = {
	play: false,
	sliderPosition:0,
	currentFrame:0,
	moveAnimations:[],
	fieldDimensions:{width:400, height:180},
};

export const common = (state = initialState, action: Actions): object => {
	switch (action.type) {
		case 'SET_PLAY':
			return {
				...state,
				play: action.play,
			};
		case 'SET_SLIDER_POSITION':
			return {
				...state,
				sliderPosition: action.sliderPosition,
			};
		case 'SET_CURRENT_FRAME':
			return {
				...state,
				currentFrame: action.currentFrame,
			};
		case 'SET_MOVE_ANIMATIONS':
			return {
				...state,
				moveAnimations: action.moveAnimations,
			};
		case 'SET_FIELD_DIMENSIONS':
			return {
				...state,
				fieldDimensions: action.fieldDimensions,
			};
		default:
			return state;
	}
};
