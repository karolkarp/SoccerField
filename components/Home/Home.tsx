/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { View, StyleSheet, Animated, ImageBackground, Dimensions  } from 'react-native';
import { Text, Spinner} from 'native-base';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../store/mapToProps';
import Slider from '@react-native-community/slider';
import PlayButton from '../Common/PlayButton';
import data from '../../data';
import style from '../../style';

const fieldMinHeight = 180;
var { width} = Dimensions.get('window');

const ANNOTATION_SIZE = 30;
interface Props {
	play: boolean;
	setPlay: (play: boolean) => {};
	setInterval: (animationFrame: number) => {};
	setSliderPosition: (position: number) => {};
	setCurrentFrame: (currentFrame: number) => {};
	setMoveAnimations: (moveAnimations: object[]) => {};
	common: {
		play: boolean;
		sliderPosition: number;
		currentFrame: number;
		moveAnimations: [{playerId: number; position: {x: number; y: number}}];
	};
}


class Home extends React.Component<Props> {
	_interval: any;

	private constructor(props: Props){
		super(props);
		
		this._interval = undefined;

		this.handleSlidingStart = this.handleSlidingStart.bind(this);
		this.handleSlidingComplete = this.handleSlidingComplete.bind(this);
		this.handleValueChange = this.handleValueChange.bind(this);
	}

	public componentDidMount(): void{
		this.setPositions();
	}

	public componentDidUpdate(prevProps: Props): void{
		const { common:{ play:prevPlay, currentFrame: prevFrame }} = prevProps;
		const { common:{ play, currentFrame, sliderPosition }, setPlay, setCurrentFrame, setSliderPosition} = this.props;

		if(play && prevPlay !== play){
			this.movePlayers();
		}
		
		if(!play && prevPlay !== play){
			clearInterval(this._interval);
		}

		if(prevFrame !== currentFrame){
			// this.animate(); // TODO:
			this.setPositions();
		}
		
		if(data.player_positions[currentFrame] === undefined){
			clearInterval(this._interval);
			setPlay(false);
			setCurrentFrame(0);
			setSliderPosition(0);
		}
	}

	
	private setPositions(): void{
		const {setMoveAnimations, common:{ currentFrame, sliderPosition }, setCurrentFrame, setSliderPosition, setPlay } = this.props;
		let moveAnimations: object[] = [];
		if(data.player_positions[currentFrame]){
			data.player_positions[currentFrame].forEach((item): void => {
				moveAnimations.push({
					playerId:item[0],
					position:new Animated.ValueXY({ x: this.setPlayerPosition(item[1], 'width'), y: this.setPlayerPosition(item[2]) })
				});
			});

			setMoveAnimations(moveAnimations);
		}
	}

	private setPlayerPosition(size: number, aspect: string = 'height'): number{
		return aspect === 'width' ? width*size : fieldMinHeight*size;
	}

	private movePlayers(): void{
		const { common:{ currentFrame }, setCurrentFrame, setSliderPosition} = this.props;
		let i = 0;
		this._interval = setInterval((): void => {
			if(i <= data.player_positions.length){
				setCurrentFrame(i+currentFrame);
				if(data.player_positions[currentFrame] !== undefined){
					setSliderPosition(i+currentFrame);
				}
				i++;
			}
		}, 100);
	}
	
	private animate (): any  {
		const { common: { currentFrame, moveAnimations } } = this.props;
		let animations: any[] = [];
		data.player_positions[currentFrame].forEach((position): void=>{
			const result = moveAnimations.find((item)=>{return item.playerId === position[0]; });
			if(result){
				animations.push(Animated.timing(result.position, {
					toValue: {x: this.setPlayerPosition(position[1], 'width'), y: this.setPlayerPosition(position[2])},
					duration: 80
				}));
			}
		});
		Animated.parallel(
			animations
		).start();
	}
	
	public handleSlidingStart(): void{
		const {setPlay} = this.props;
		setPlay(false);
	}

	public handleSlidingComplete(position: number): void{
		const { setSliderPosition } = this.props;
		if( data.player_positions.length !== position ){
			setSliderPosition(position);
		}
	}
	
	public handleValueChange(currentFrame: number): void{
		const { setCurrentFrame } = this.props;
		setCurrentFrame(currentFrame);
	}
	
	
	public render(): React.ReactNode {
		const { common: { sliderPosition, moveAnimations } } = this.props;
		if( moveAnimations.length < 1){
			return <Spinner/>;
		}

		const animations = moveAnimations.map((player, i): React.ReactNode => {
			return(
				<Animated.View key={i} style={[styles.playerContainer, {left:moveAnimations[i].position.x, bottom:moveAnimations[i].position.y}]} >
					<View style={styles.playerContainerFill} >
						<Text style={styles.playerId}>{player.playerId}</Text>
					</View>
				</Animated.View >
			);
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
						{moveAnimations && moveAnimations.length > 0 
							&& animations
						}
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
						onSlidingComplete={this.handleSlidingComplete}
						onValueChange={this.handleValueChange}
						step={10}
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
		minHeight:fieldMinHeight,
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
		position:'absolute',
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