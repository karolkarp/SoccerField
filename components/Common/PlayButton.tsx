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
		<Button style={styles.button} iconLeft rounded bordered onPress={handlePlay}>
			{play &&
			   <Icon style={styles.icon} name='pause' />
			}
			{!play &&
            <Icon style={styles.icon} name='ios-play-circle' />
			}
			<Text style={styles.buttonText}>{play ? 'Pause Session' : 'Run Session'}</Text>
		</Button>
	);
}
export default connect(mapStateToProps, mapDispatchToProps)(PlayButton);

const styles = StyleSheet.create({
	button:{
		borderColor:style.fontColor,
		height:30,
	},
	icon:{
		color:style.fontColor
	},
	buttonText:{
		color:style.fontColor
	}
});