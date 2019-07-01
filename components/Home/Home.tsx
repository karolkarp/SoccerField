/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { View, Image, StyleSheet, Animated, ImageBackground  } from 'react-native';
import { Button, Icon, Text, Spinner} from 'native-base';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../store/mapToProps';
import Slider from '@react-native-community/slider';
import PlayerAnnotation from '../Common/PlayerAnnotation';
import PlayButton from '../Common/PlayButton';
import data from '../../data';
import style from '../../style';


const ANNOTATION_SIZE = 30;
interface Props {
	play: boolean;
	setPlay: (play: boolean) => {};
	setInterval: (animationFrame: number) => {};
	setSliderPosition: (position: number) => {};
	common: {
		play: boolean;
		sliderPosition: number;
	};
}


class Home extends React.PureComponent<Props> {
	private constructor(props: Props){
		super(props);

		this.handleSlidingStart = this.handleSlidingStart.bind(this);
		this.handleValueChange = this.handleValueChange.bind(this);

		
	}

	public componentDidMount(): void{
		data.player_positions[0].forEach((item) => {
			this.moveAnimation[item[0]] = new Animated.ValueXY({ x: item[1], y: item[2] });
		 });
	}

	public componentDidUpdate(prevProps: Props): void{
		const { common:{ play:prevPlay, sliderPosition: prevSliderPosition }} = prevProps;
		const { common:{ play, sliderPosition }, setSliderPosition} = this.props;

		if(play && prevPlay !== play){
			this.movePlayers();
		}
		
		if(!play && prevPlay !== play){
			clearInterval(this._interval);
		}

		if(play && prevSliderPosition !== sliderPosition){
			this.animate();
		}
	}

	private movePlayers(): void{
		const { common:{ sliderPosition }, setSliderPosition} = this.props;
		let i = 0;
		this._interval = setInterval((): void => {
			if(i <= data.player_positions.length)
				setSliderPosition(i+sliderPosition);
			i++;
		}, 100);
	}
	
	private animate (): any  {
		const { common: { sliderPosition } } = this.props;

		const animations = data.player_positions[sliderPosition].map((item) => {
			return Animated.spring(
				this.moveAnimation[item[0]],
				{
					toValue: {x: item[1], y: item[2]},
				}
			);
		});
		Animated.stagger(100, animations).start();
	 }
	
	public handleSlidingStart(): void{
		const {setPlay} = this.props;
		setPlay(false);
	}
	
	public handleValueChange(position: number): void{
		const { setSliderPosition } = this.props;
		setSliderPosition(position);
	}
	
	
	public render(): React.ReactNode {
		const { common: { sliderPosition } } = this.props;

		if(this.moveAnimation === undefined){
			return <Spinner/>;
		}

		const animations = data.player_positions[sliderPosition].map((a, i) => {
			// return <Animated.View key={i} style={{opacity: this.animatedValue[a], height: 20, width: 20, backgroundColor: 'red', marginLeft: 3, marginTop: 3}} />;
			return <Animated.View key={i} style={[styles.playerContainer, this.moveAnimation.getLayout()]} >
				<View style={styles.playerContainerFill} >
					<Text style={styles.playerId}>{i}</Text>
				</View>
			</Animated.View >;
		});


		return (
			<View style={styles.mainView}>
				<View style={styles.buttonContainer}>
					<PlayButton />
				</View>
				<View style={styles.soccerFieldContainer}>
					<ImageBackground 
						style={styles.imageBackground}
						source={require('../../assets/images/soccer.png')}>
						{this.moveAnimation !== undefined && animations}
						{/* <PlayerAnnotation stylesProp={{position:'absolute', bottom:'70%', left: '70%'}} playerId={11} /> */}

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



	playerContainer: {
		width: ANNOTATION_SIZE,
		height: ANNOTATION_SIZE,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: ANNOTATION_SIZE / 2,
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: style.playerAnnotationColor,
		marginLeft:-15,
		marginBottom:-15,
	 },
	 playerContainerFill: {
		width: ANNOTATION_SIZE - 3,
		height: ANNOTATION_SIZE - 3,
		borderRadius: (ANNOTATION_SIZE - 3) / 2,
		backgroundColor: style.playerAnnotationColor,
		transform: [{scale: 0.8}],
		alignItems: 'center',
		justifyContent: 'center',
	 },
	 playerId:{
		 color: style.fontColor,
	 }
});