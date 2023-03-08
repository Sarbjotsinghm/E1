import React from 'react';
import PropTypes from 'prop-types';

import { View, Text, StyleSheet } from 'react-native'

class Game extends React.Component {
    static propTypes = {

        randomNumberCount: PropTypes.string.isRequired,
    };

    randomNumbers = Array
        .from({ lenght: this.props.randomNumberCount })
        .map(() => 1 + Math.floor(10 * Math.random()));
    target = this.randomNumbers
        .slice(0, this.props.randomNumberCount - 2)
        .reduce((acc, curr) => acc + curr, 0);
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.target}>{this.target}</Text>
                <View style={styles.randomContainer}>
                {this.randomNumbers.map((randomNumber, index) =>
                    <Text key={index}>{randomNumber}</Text>)}
                     </View>
             
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ddd',
        flex: 1,
        paddingTop: 30,
    },

    target: {
        fontSize: 40,
         backgroundColor: '#aaa',
        margin: 50,
        textAlign: 'center',
    },

    randomContainer:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:'space-around',
    },

    random: {
bacckgroundColor: '#999',
width: 100,
morginHorizontal: 15,
marginVertical: 25,
fontSize: 35,
textAlign: 'center',
    }
});

export default Game;