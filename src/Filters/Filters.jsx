import { useState, useRef, useEffect } from 'react'
import styles from './Filters.module.css'
import OnOff from '../components/OnOff'
import extractData from './up-down.svg'
import monitor from './monitor.svg'
import plus from './plus.svg'
import close from './close.svg'
import DropDownCat from '../components/DropDownCat'
import DropDownSite from '../components/DropDownSite'
import ButtonCarousel from '../Button/ButtonCarousel'
//interval for click on left or right button
function useInterval(callback, delay) {
  const savedCallback = useRef()
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
const Filters = ({ handleChangeCat, handleChangeSite, data, sites , setSites  }) => {
  const [isInsetInlineStart, setInsetInlineStart] = useState(0)
  const [isMouseDown, setMouseDown] = useState(false)
  const [isDirection, setIsDirection] = useState('left')
  const [leftValue, setleftValue] = useState('left')
  const [showArrows, setshowArrows] = useState(false)
  const refContainer = useRef();
  const parentElementRef = useRef(null);

  const [dimensions, setDimensions] = useState(0);
  useEffect(()=>{
    if (refContainer.current) {
      setDimensions(refContainer.current.offsetWidth);
    }
  },[])
  //calculate width of carousel's children
  useEffect(() => {

    function calculateTotalChildWidth() {
      if (parentElementRef.current) {
        const parentElement = parentElementRef.current
        const children = parentElement.children
        const screenWidth = dimensions - 100
        let totalWidthWithMargin = 0
        for (let i = 0; i < children.length; i++) {
          const child = children[i]
          const computedStyle = window.getComputedStyle(child)
          const childWidthWithMargin = child.offsetWidth +
            parseFloat(computedStyle.marginLeft) +
            parseFloat(computedStyle.marginRight)

          totalWidthWithMargin += childWidthWithMargin
        }
        if (totalWidthWithMargin >= screenWidth) {
          setshowArrows(true)
        }
        else {
          setshowArrows(false)
        }
        const leftValue = screenWidth - totalWidthWithMargin
        setleftValue(leftValue)
      }
    }

    // Call the function when the component mounts
    calculateTotalChildWidth();
  }, [sites, dimensions]);
  //on Mouse Down function
  const onMouseDown = () => {
    if (isDirection === 'left' && isInsetInlineStart >= leftValue) {
      setInsetInlineStart(isInsetInlineStart - 5);

    }
    else if (isDirection === 'right' && isInsetInlineStart !== 0) {

      setInsetInlineStart(isInsetInlineStart + 5);
    }

  };
  useInterval(onMouseDown, isMouseDown ? 50 : null)
  //Mouse Down Handler
  const mouseDownHandler = (buttonType, value) => {
    setMouseDown(value)
    setIsDirection(buttonType)
  }
    // Handle clicking the close button for a site
    const handleSiteClose = (siteToRemove) => {
      const updatedSites = sites.filter((site) => site !== siteToRemove);
      setSites(updatedSites);
    };
  return (
    <div className={styles.carousel} ref={refContainer}>
      <div className={styles.inCarousel}>
        <ul className={styles.mainCarousel} style={{ insetInlineStart: isInsetInlineStart }} ref={parentElementRef}>
          <OnOff Name="Extract Data" srcIcon={extractData} />
          <OnOff Name="Monitoring" srcIcon={monitor} />
          <DropDownCat Name="Filter By Category"
            srcIcon={plus}
            handleChangeCat={handleChangeCat}
            datas={data} />
          <DropDownSite Name="Filter By Site"
            srcIcon={plus}
            handleChangeSite={handleChangeSite}
            datas={data} />

          {sites.map((site) => {
            return (
              <li className={styles.addedSites}>
                {site}
                <button onClick={() => handleSiteClose(site)}>
                  <img src={close} alt="" />
                </button>
                </li>
            )

          })}

        </ul>

      </div>
      <ButtonCarousel direction="left" mouseDownHandler={mouseDownHandler} display={showArrows} />
      <ButtonCarousel direction="right" mouseDownHandler={mouseDownHandler} display={showArrows} />
    </div>
  )
}

export default Filters