import { useState, useEffect } from "react";
import "./App.css";
import Filters from "./Filters/Filters";
import Products from "./Products/Products";
import allDatas from "./db/data.json";

function App() {
  let allresults = Object.values(allDatas.data.oneClickAutomations.items);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedSites, setSelectedSites] = useState([]); // Store selected sites in an array
  const [originalData, setOriginalData] = useState(allresults);
  const [filteredData, setFilteredData] = useState(allresults);

  // ----------- Cat Filter -----------
  const handleChangeCat = (event) => {
    setSelectedCategory(event.target.value);
    filterData(event.target.value, selectedSites);
  };

  // ----------- Site Filter -----------
  const handleChangeSite = (event) => {
    const siteValue = event.target.value;

    // Check if the site is already in the selectedSites array
    if (!selectedSites.includes(siteValue)) {
      setSelectedSites([...selectedSites, siteValue]);
      filterData(selectedCategory, [...selectedSites, siteValue]);
    }
  };

  useEffect(() => {
    filterData(selectedCategory, selectedSites);

  }, [selectedSites, selectedCategory]);

  function filterData(selectedCat, selectedSites) {
    let selectedData = originalData;

    // Applying category filter
    if (selectedCat) {
      selectedData = selectedData.filter((result) =>
        result.categories.some((item) => item.title === selectedCat)
      );
    }

    // Applying site filter
    if (selectedSites.length > 0) {
      selectedData = selectedData.filter((result) =>
        selectedSites.some((selectedSite) =>
          result.sites.some((item) => item.title === selectedSite)
        )
      );
    }

    setFilteredData(selectedData);
  }

  return (
    <div className="container">
      <main>
        <Filters
          handleChangeCat={handleChangeCat}
          handleChangeSite={handleChangeSite}
          data={originalData}
          sites={selectedSites}
          setSites={setSelectedSites}
        />
        <Products result={filteredData} />
      </main>
    </div>
  );
}

export default App;