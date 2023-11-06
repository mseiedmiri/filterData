import React, { useState, useEffect, useRef } from 'react';
import styles from './Components.module.css';

const DropDownCat = ({ Name, srcIcon, datas, handleChangeCat }) => {
  let categorySet = new Set(datas.map((a) => a.categories[0]?.title));
  const categories = Array.from(categorySet).sort();
  var filteredCat = categories.filter(function (el) {
    return el != null;
  });

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Add the event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggling = () => setIsOpen(!isOpen);

  return (
    <div className={styles.customSelect} onClick={toggling}>
      <div className={styles.dropDownHeader}>
        <img src={srcIcon} alt="" />
        {Name}
      </div>
      {isOpen && (
        <div ref={dropdownRef}>
          <ul>
            {filteredCat.map((cat) => {
              return (
                <li key={Math.random()}>
                  <button onClick={handleChangeCat} value={cat}>
                    {cat}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDownCat;