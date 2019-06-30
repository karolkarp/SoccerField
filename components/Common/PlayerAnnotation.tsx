/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { View, Image, StyleSheet, Animated, ImageBackground  } from 'react-native';
import { Button, Icon, Text} from 'native-base';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../store/mapToProps';
import Slider from '@react-native-community/slider';
import data from '../../data';
import style from '../../style';

const ANNOTATION_SIZE = 30;
interface Props {
	playerId: number;
}

function PlayerAnnotation(props: Props): React.ReactNode {

	const { playerId } = props;
	return (
		<View style={styles.playerContainer}>
			<View style={styles.playerContainerFill} >
				<Text style={styles.playerId}>{playerId}</Text>
			</View>
		</View>
	);
}
export default connect(mapStateToProps, mapDispatchToProps)(PlayerAnnotation);

const styles = StyleSheet.create({
	playerContainer: {
	  width: ANNOTATION_SIZE,
	  height: ANNOTATION_SIZE,
	  alignItems: 'center',
	  justifyContent: 'center',
	  borderRadius: ANNOTATION_SIZE / 2,
	  borderWidth: StyleSheet.hairlineWidth,
	  borderColor: style.playerAnnotationColor,
	  position:'absolute',
	  bottom:'50%',
	  left:'50%',
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