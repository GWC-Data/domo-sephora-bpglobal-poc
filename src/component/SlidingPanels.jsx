import React, { useEffect, useRef, useContext } from 'react';
import SlideContent from './slideContent';
import './SlidingPanels.css';
import { GlobalContext } from '../globalContext/context';

const SlidingPanels = ({ brand, subCategories, subCategoryName }) => {
  const slidesContainerRef = useRef(null);

  const {
    state: { activeIndex, category },
    setState: { setActiveIndex, setProduct },
  } = useContext(GlobalContext);

  // const handlePanelClick = (index) => {
  //   setActiveIndex(index);
  // };

  const checkWidth = () => {
    if (slidesContainerRef.current && window.innerWidth > 480) {
      const activeSlide = slidesContainerRef.current.querySelector('.active');
      if (activeSlide) {
        const slideWidth = activeSlide.offsetWidth;
        const slideContents = slidesContainerRef.current.querySelectorAll('.slide-content');
        slideContents.forEach(content => {
          // content.style.width = `${slideWidth}px`;
        });
      }
    }
  };

  useEffect(() => {
    checkWidth();

    const handleResize = () => {
      checkWidth();
    };

    window.addEventListener('resize', handleResize);

    let resizeTimeout;
    const handleResizeEnd = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkWidth, 500);
    };

    window.addEventListener('resize', handleResizeEnd);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', handleResizeEnd);
    };
  }, []);
  return (
    <div className="container">
      <div className="container-slides">
        <ul className="slides" ref={slidesContainerRef}>
          {subCategories.map((subCategory, index) => (
            <li
              key={index}
              className={`slide bg-black ${index === activeIndex ? 'active' : ''}`}
            >
              {/* {(console.log("subcategory Image", category))}
              {(console.log("subcategory name", subCategoryName))} */}
              <img
                src={`https://raw.githubusercontent.com/GWC-Data/domo-sephora-bpglobal-poc/refs/heads/main/src/assets/products/${encodeURIComponent(category)}/${encodeURIComponent(subCategory.name)}.png`}
                alt={subCategory.name}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 opacity-40 w-40 h-[500px] object-cover"
              />
              <a
                href="#"
                className="action"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveIndex(index);
                  // Optionally set subCategory as active to display it in SlideContent
                  setProduct(subCategory.name);
                }}
              >
                {subCategory.name}
              </a>

              {/* If active index matches, display the slide content */}
              {/* If active index matches, display the slide content */}
              {index === activeIndex && (
                <div className="slide-content h-full">
                  {/* Display the first product of the selected subCategory */}
                  {subCategory.products && subCategory.products.length > 0 && (
                    <SlideContent
                      subCategoryName={subCategory.name}
                      productName={subCategory.products[0].name}  // Pass the first product
                    />
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SlidingPanels;