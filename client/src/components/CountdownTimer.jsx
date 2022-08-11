import React from 'react';
import Countdown from 'react-countdown';
import styled from 'styled-components';

const Timer = ({ deadline, endGame }) => {

  const renderer = ({ minutes, seconds, milliseconds, completed }) => {
    if (completed) {
      // Invoke parent function to stop the game
      console.log('GAME OVER!')
      endGame(true);
      return <CountdownTimer>0:00:000</CountdownTimer>
    } else {
      return <CountdownTimer>{minutes}:{seconds}:{milliseconds}</CountdownTimer>
    }
  }

  return (
    <Countdown
      date={deadline}
      intervalDelay={0}
      precision={3}
      renderer={renderer}
    />
  )
}

const CountdownTimer = styled.span`
  color: red;
  position: absolute:
`;

export default Timer;