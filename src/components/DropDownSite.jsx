import React, { useState, useEffect, useRef } from 'react';
import styles from './Components.module.css';

const DropDownSite = ({ Name, srcIcon, datas, handleChangeSite }) => {
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
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

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    const filteredData = Sites.filter((item) => {
      return item.toLowerCase().includes(searchInput.toLowerCase());
    });
    setFilteredResults(filteredData);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  let categorySite = new Set(datas.map((a) => a.sites[0].title));
  const Sites = Array.from(categorySite).sort().filter((el) => el != null);

  return (
    <div className={styles.customSelect} onClick={toggling}>
      <div className={styles.dropDownHeader}>
        <img src={srcIcon} alt={Name} />
        {Name}
      </div>
      {isOpen && (
        <div ref={dropdownRef}>
          <ul>
            <input
              type="search"
              placeholder="Search..."
              onChange={(e) => searchItems(e.target.value)}
              onClick={stopPropagation} // Prevent click event propagation
            />
            {searchInput.length >= 1
              ? filteredResults.map((site, index) => {
                  return (
                    <li key={index}>
                      <button onClick={handleChangeSite} value={site}>
                        {site}
                      </button>
                    </li>
                  );
                })
              : Sites.map((site, index) => (
                  <li key={index}>
                    <button onClick={handleChangeSite} value={site}>
                      {site}
                    </button>
                  </li>
                ))
            }
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDownSite;