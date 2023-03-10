import React from 'react';
import PropTypes from 'prop-types';

import {View, Text, StyleSheet} from 'react-native';

class Game extends React.Component {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
    initialSeconds: PropTypes.number.isRequired,
    onPlayAgain: PropTypes.func.isRequired,
  };
  randomNumbers = Array.from({lenght: this.props.randomNumberCount}).map(
    () => 1 + Math.floor(10 * Math.random()),
  );
  target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);

    componentWillUpdate(nextProps, nextState) {
      if (
        nextState.selectedIds !== this.state.selectedIds ||
        nextState.remainingSeconds === 0
      ) {
        this.gameStatus = this.calcGameStatus(nextState);
        if (this.gameStatus !== 'PLAYING') {
          clearInterval(this.intervalId);
        }
      }
    }

    calcGameStatus = nextState => {
      const sumSelected = nextState.selectedIds.reduce((acc, curr) => {
        return acc + this.shuffledRandomNumbers[curr];
      }, 0);
      if (nextState.remainingSeconds === 0) {
        return 'LOST';
      }
      if (sumSelected < this.target) {
        return 'PLAYING';
      }
      if (sumSelected === this.target) {
        return 'WON';
      }
      if (sumSelected > this.target) {
        return 'LOST';
      }
    };

  // todo: shuffle random numbers
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.target}>{this.target}</Text>
        <View style={styles.randomContainer}>
          {this.shuffledRandomNumbers.map((randomNumber, index) => (
            <RandomNumber
              key={index}
              id={index}
              number={randomNumber}
              isDisabled={
                this.isNumberSelected(index) || gameStatus !== 'PLAYING'
              }
              onPress={this.selectNumber}
            />
          ))}
        </View>
      </View>
    ),
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

  randomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },

  random: {
    bacckgroundColor: '#999',
    width: 100,
    morginHorizontal: 15,
    marginVertical: 25,
    fontSize: 35,
    textAlign: 'center',
  },
  STATUS_PLAYING: {
    backgroundColor: '#bbb',
  },
  STATUS_WON: {
    backgroundColor: 'green',
  },
  STATUS_LOST: {
    backgroundColor: 'red',
  },
});

export default Game;
