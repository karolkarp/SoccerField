/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { View, Image, StyleSheet, Animated, ImageBackground  } from 'react-native';
import { Button, Icon, Text} from 'native-base';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../store/mapToProps';
import Slider from '@react-native-community/slider';
import PlayerAnnotation from '../Common/PlayerAnnotation';
import data from '../../data';
import style from '../../style';

const ANNOTATION_SIZE = 30;
interface Props {
	play: boolean;
	setPlay: (play: boolean) => {};
	setSliderPosition: (position: number) => {};
	common: {
		play: boolean;
		sliderPosition: number;
	};
}

class Home extends React.PureComponent<Props> {
	private constructor(props: Props){
		super(props);

		this.handlePlay = this.handlePlay.bind(this);
		this.handleSlidingStart = this.handleSlidingStart.bind(this);
		this.handleValueChange = this.handleValueChange.bind(this);
	}

	public handlePlay(): void{
		const { common:{ play }, setPlay} = this.props;
		setPlay(!play);
	}
	
	public handleSlidingStart(value: number): void{
	}
	
	public handleValueChange(position: number): void{
		const { setSliderPosition } = this.props;
		setSliderPosition(position);
	}
	
	public render(): React.ReactNode {
		const { common: { sliderPosition } } = this.props;
		return (
			<View style={styles.mainView}>
				<View style={styles.buttonContainer}>
					<Button style={styles.buttonColor} iconLeft rounded bordered onPress={this.handlePlay}>
						<Icon style={styles.iconColor} name='ios-play-circle' />
						<Text style={styles.buttonTextColor}>Run Session</Text>
					</Button>
				</View>
				<View style={styles.soccerFieldContainer}>
					<ImageBackground 
						style={styles.imageBackground}
						source={require('../../assets/images/soccer.png')}>

						<PlayerAnnotation style={{position:'absolute', bottom:'70%', left: '70%'}} playerId={11} />

					</ImageBackground >
				</View>
				<View style={styles.sliderContainer}>
					<Slider
						style={styles.slider}
						minimumValue={0}
						maximumValue={data.player_positions.length}
						minimumTrackTintColor="#FFFFFF"
						maximumTrackTintColor="#000000"
						onSlidingStart={this.handleSlidingStart}
						onValueChange={this.handleValueChange}
						step={100}
						value={sliderPosition}
					/>
				</View>
			</View>
		);
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
	mainView:{
		flex:1,
		backgroundColor: style.mainColor,
		justifyContent: 'space-around'
	},
	buttonContainer:{
		flex:1,
		justifyContent: 'center',
		alignItems: 'flex-start',
		paddingLeft: 15,
	},
	soccerFieldContainer: {
		backgroundColor: style.mainColor,
		padding: 5
	},
	imageBackground:{
		width: '100%',
		height: undefined,
		aspectRatio: 2.22,
		position: 'relative'
	},
	sliderContainer:{
		flex: 1,
		backgroundColor: style.mainColor,
		alignItems:'center',
		justifyContent:'center',
	},
	slider:{
		width: '100%',
		height: 40
	},
	buttonColor:{
		borderColor:style.fontColor
	},
	iconColor:{
		color:style.fontColor
	},
	buttonTextColor:{
		color:style.fontColor
	}
});