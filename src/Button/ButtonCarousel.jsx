import React from 'react';
import styles from './style.module.css';
import arrowIcon from './next.svg';

const ButtonCarousel = ({ direction, mouseDownHandler, display }) => {
  const cssDirection = direction;
  const activeButton = display ? styles.active : '';

  // Define a function to handle touch start
  const handleTouchStart = () => {
    mouseDownHandler(direction, true);
  };

  // Define a function to handle touch end
  const handleTouchEnd = () => {
    mouseDownHandler(direction, false);
  };

  return (
    <button
      className={`${styles[cssDirection]} ${activeButton}`}
      onMouseDown={() => mouseDownHandler(direction, true)}
      onMouseUp={() => mouseDownHandler(direction, false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <img src={arrowIcon} alt={direction} />
    </button>
  );
};

export default ButtonCarousel;