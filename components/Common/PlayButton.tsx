/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { StyleSheet, } from 'react-native';
import { Button, Icon, Text} from 'native-base';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../store/mapToProps';
import style from '../../style';

interface Props {
	common: {play: boolean};
	setPlay: (play: boolean) => {};
}

function PlayButton(props: Props): React.ReactNode {

   
	const handlePlay = (): void => {
		const { common:{ play }, setPlay} = props;
		
		setPlay(!play);
		
	};

	const { common:{play} } = props;
	return (
		<Button style={styles.buttonColor} iconLeft rounded bordered onPress={handlePlay}>
			{play &&
			   <Icon style={styles.iconColor} name='pause' />
			}
			{!play &&
            <Icon style={styles.iconColor} name='ios-play-circle' />
			}
			<Text style={styles.buttonTextColor}>{play ? 'Pause Session' : 'Run Session'}</Text>
		</Button>
	);
}
export default connect(mapStateToProps, mapDispatchToProps)(PlayButton);

const styles = StyleSheet.create({
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