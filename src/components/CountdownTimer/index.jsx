import React from 'react';
import { useCountdown } from '../../hooks/useCountdown';
import ShowCounter from '../ShowCounter';

const CountdownTimer = ({ targetDate, handleLogout }) => {
  const [minutes, seconds] = useCountdown(targetDate)

  if (minutes + seconds <= 0) {
    handleLogout();
  } else {
    return (
      <ShowCounter
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;
