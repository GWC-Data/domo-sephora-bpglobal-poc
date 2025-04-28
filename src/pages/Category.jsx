import { useContext, useEffect, useMemo } from "react";
import { GlobalContext } from "../globalContext/context";
import { useLocation, useNavigate } from "react-router-dom";

// Import all images
import shampooConditionerImage from "../assets/Shampoo&Conditioner.webp";
import hairStylingImage from "../assets/HairStyle.webp";
import miniSizeImage from "../assets/MiniSize.webp";
import valueGiftSetsImage from "../assets/Value&GiftSets.jpg";
import skincare from "../assets/Skincare.webp";
import Makeup from "../assets/face.webp";

const brandColors = {
  "L'Oréal Professionnel": {
    bg: "bg-white",
    text: "text-pink-700",
    button: "#de0f3f",
  },
  "Freck Beauty": {
    bg: "bg-white",
    text: "text-yellow-600",
    button: "#de0f3f",
  },
};

const categoryImages = {
  "Shampoo & Conditioner": shampooConditionerImage,
  "Hair Styling & Treatments": hairStylingImage,
  "Mini Size": miniSizeImage,
  "Value & Gift Sets": valueGiftSetsImage,
  "Skincare": skincare,
  "Makeup": Makeup,
};

const getImageForCategory = (categoryName) => {
  return categoryImages[categoryName];
};

// Month mapping to number
const monthMap = {
  January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
  July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
};

const getLast6Months = () => {
  const now = new Date();
  const months = [];
  for (let i = 0; i < 6; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(d.toLocaleString("default", { month: "long" }));
  }
  return months;
};

const Category = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const {
    state: { data, brand },
    setState: { setCategory, setBrand },
  } = useContext(GlobalContext);

  const handleBack = () => {
    setBrand("");
    navigate(-1);
  };

  const handleClick = (category) => {
    setCategory(category);
    navigate("/product");
  };



  const last6Months = useMemo(() => getLast6Months(), []);
  const subCategories = data[brand] || [];
  const colors = brandColors[brand] || {};


  return (
    <div className={`min-h-screen w-full p-6 ${colors.bg}`}>
      <button
        onClick={handleBack}
        className="mb-4 text-sm px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition cursor-pointer"
      >
        ← Back
      </button>

      <div className="flex flex-col items-center gap-8 w-full">
        <h2 className={`text-3xl font-bold ${colors.text}`}>{brand} Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-6xl">
          {subCategories.map((category) => {
            // { (console.log("ddddddddddddddddddddd", category)) }
            const totalSales = category.subCategories?.reduce((sum, subCategory) => {
              return sum + subCategory.products?.reduce((productSum, product) => {
                return productSum + (product.sales || 0);
              }, 0) || 0;
            }, 0) || 0; // 
            const totalVariants = category.subCategories?.reduce((sum, subCategory) => {
              return sum + (subCategory.products?.length || 0); // Count the number of products in subcategories
            }, 0) || 0;
            // {(console.log("ddddddddddddddddddddd", totalSales))}
            return (
              <div
                key={category.name}
                className="card cursor-pointer"
                onClick={() => handleClick(category.name)}
              >
                <div
                  className="content"
                  style={{ backgroundColor: colors.button, borderRadius: "22px" }}
                >
                  <div className="flex items-center w-full">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">{category.name}</h3>
                      <span className="para">
                        {category.products ? `${category.products.length} products` : "Explore products"}
                      </span>
                      <div className="mt-1 text-sm text-white">
                        Current Year Sale: ₹{totalSales.toFixed(2)} <br />
                        Current Year Variants: {totalVariants}
                      </div>
                      <div className="bg-black text-white rounded-lg py-0.5 w-28 h-8 px-3">
                        <span className="link">View All →</span>
                      </div>
                    </div>
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-white ml-4">
                      <img
                        src={getImageForCategory(category.name)}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Category;
