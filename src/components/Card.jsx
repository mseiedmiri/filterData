import React from 'react'
import styles from './Components.module.css'
const Card = (props) => {
  return (
    <>
          <div className={styles.underImg}>
        <img src={props.img} alt="" />
      </div>
      <h3>{props.title}</h3>
      <p>
        {props.description}
      </p>
    </>
  )
}

export default Card