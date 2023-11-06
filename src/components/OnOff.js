import React, { useState } from 'react'
import styles from './Components.module.css'
const OnOff = ({Name , srcIcon}) => {
    const [active, setActive] = useState(false);
    const toggleClass = () => {
        setActive(!active);
    }
    return (
        <li className={`${styles.filterOn} ${active ? styles.active : ''}`} onClick={toggleClass}>
            <img src={srcIcon} alt="" />
            {Name}
        </li>
    )
}

export default OnOff