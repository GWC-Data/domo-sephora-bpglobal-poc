import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import domo from "ryuu.js";
import { GlobalContext } from "../globalContext/context";

// Import all category images
import shampooConditionerImage from "../assets/Shampoo&Conditioner.webp";
import hairStylingImage from "../assets/HairStyle.webp";
import miniSizeImage from "../assets/MiniSize.webp";
import valueGiftSetsImage from "../assets/Value&GiftSets.jpg";
import skincare from "../assets/Skincare.webp";
import Makeup from "../assets/face.webp";
import Header from "@/component/Header";

const brands = [
  { name: "L'Oréal Professionnel", color: "#F472B6" },
  { name: "Freck Beauty", color: "#FBBF24" },
];

const categoryImages = {
  "Shampoo & Conditioner": shampooConditionerImage,
  "Hair Styling & Treatments": hairStylingImage,
  "Mini Size": miniSizeImage,
  "Value & Gift Sets": valueGiftSetsImage,
  "Skincare": skincare,
  "Makeup": Makeup,
};

const Home = () => {
  const navigate = useNavigate();

  const {
    state: { data, loading },
    setState: { setData, setLoading, setCategory, setBrand },
  } = useContext(GlobalContext);

  const handleCategoryClick = (categoryName, brandName) => {
    setBrand(brandName);
    setCategory(categoryName);
    navigate("/product");
  };

  // useEffect(async () => {
  //   const response = await domo.get("/data/v1/dataset");
  //   console.log("response", response)
  // },[])

  // useEffect(() => {
  //   // Fetch data if not already available in context
  //   if (!data) {
  //     const fetchData = async () => {
  //       try {
  //         // Assuming you have a global data fetch function or API call
  //         const fetchedData = await domo.post(
  //           "/sql/v1/dataset",
  //           `SELECT \`Brand Name\`, \`Category Name\`, \`Product Name\`, \`Monthly Total\`, \`Month\`, \`Sub Category Name\` FROM dataset`,
  //           {
  //             contentType: "text/plain",
  //           }
  //         );
  //         console.log("fechhhhhhhhhhh", fetchedData)
  //         const transformedData = {}; 
  //         fetchedData.rows.forEach(([brand, category, product, sale, subCategory]) => {
  //           if (!transformedData[brand]) {
  //             transformedData[brand] = [];
  //           }

  //           let categoryObj = transformedData[brand].find((c) => c.name === category);
  //           if (!categoryObj) {
  //             categoryObj = { name: category, subCategories: [] };
  //             transformedData[brand].push(categoryObj);
  //           }

  //           let subCategoryObj = categoryObj.subCategories.find((sc) => sc.name === subCategory);
  //           if (!subCategoryObj) {
  //             subCategoryObj = { name: subCategory, products: [] };
  //             categoryObj.subCategories.push(subCategoryObj);
  //           }

  //           if (!subCategoryObj.products.some((p) => p.name === product)) {
  //             subCategoryObj.products.push({ name: product, sales: parseFloat(sale) });
  //           }
  //         });

  //         console.log("Transformed Data:", transformedData);
  //         //   let categoryObj = transformedData[brand].find(c => c.name === category);
  //         //   if (!categoryObj) {
  //         //     categoryObj = { name: category, products: [] };
  //         //     transformedData[brand].push(categoryObj);
  //         //   }
  //         //   if (!categoryObj.products.some(p => p.name === product)) {
  //         //     categoryObj.products.push({ name: product, sales: parseFloat(sale) });
  //         //   }
  //         // });
  //         // console.log(".........", transformedData);

  //         setLoading(false);
  //         setData(transformedData);
  //       } catch (error) {
  //         console.error("Fetch error:", error);
  //       }
  //     };

  //     fetchData();
  //   }
  // }, [data, setData]);


  useEffect(() => {
    if (!data) {
      const fetchData = async () => {
        try {
          const fetchedData = await domo.post(
            "/sql/v1/dataset",
            `SELECT \`Brand Name\`, \`Category Name\`, \`Product Name\`, \`Monthly Total\`, \`Month\`, \`Sub Category Name\` FROM dataset`,
            {
              contentType: "text/plain",
            }
          );
          console.log("Fetched Data:", fetchedData);

          const transformedData = {};

          const today = new Date();
          const currentMonthIndex = today.getMonth(); // 0 = January

          // Define month-to-index map
          const monthMap = {
            January: 0,
            February: 1,
            March: 2,
            April: 3,
            May: 4,
            June: 5,
            July: 6,
            August: 7,
            September: 8,
            October: 9,
            November: 10,
            December: 11,
          };

          fetchedData.rows.forEach(([brand, category, product, sales, month, subCategory]) => {
            const saleAmount = parseFloat(sales);
            const saleMonthIndex = monthMap[month];

            if (saleMonthIndex === undefined) {
              console.warn(`Unknown month: ${month}`);
              return;
            }

            // Initialize brand
            if (!transformedData[brand]) {
              transformedData[brand] = [];
            }

            // Initialize category
            let categoryObj = transformedData[brand].find((c) => c.name === category);
            if (!categoryObj) {
              categoryObj = {
                name: category,
                subCategories: [],
                salesYTD: 0,
                previousSalesYTD: 0,
              };
              transformedData[brand].push(categoryObj);
            }

            // Initialize sub-category
            let subCategoryObj = categoryObj.subCategories.find((sc) => sc.name === subCategory);
            if (!subCategoryObj) {
              subCategoryObj = {
                name: subCategory,
                products: [],
                salesYTD: 0,
                previousSalesYTD: 0,
              };
              categoryObj.subCategories.push(subCategoryObj);
            }

            // Initialize product
            let productObj = subCategoryObj.products.find((p) => p.name === product);
            if (!productObj) {
              productObj = {
                name: product,
                sales: 0,
                previousSales: 0,
                salesYTD: 0,
                previousSalesYTD: 0,
              };
              subCategoryObj.products.push(productObj);
            }

            // Here logic: Assume dataset has latest months separately for previous and current year
            // So we split based on saleMonthIndex
            if (saleMonthIndex <= currentMonthIndex) {
              // Till this month
              productObj.salesYTD += saleAmount;
              subCategoryObj.salesYTD += saleAmount;
              categoryObj.salesYTD += saleAmount;
            } else {
              // Months beyond current month = treat as previous year's months
              productObj.previousSalesYTD += saleAmount;
              subCategoryObj.previousSalesYTD += saleAmount;
              categoryObj.previousSalesYTD += saleAmount;
            }
          });

          // Now calculate variance and %
          for (const brand in transformedData) {
            transformedData[brand].forEach(category => {
              const varianceAmount = category.salesYTD - category.previousSalesYTD;
              category.variancePercent = category.previousSalesYTD > 0
                ? ((varianceAmount / category.previousSalesYTD) * 100).toFixed(1)
                : 0;

              category.subCategories.forEach(subCategory => {
                const subVarianceAmount = subCategory.salesYTD - subCategory.previousSalesYTD;
                subCategory.variancePercent = subCategory.previousSalesYTD > 0
                  ? ((subVarianceAmount / subCategory.previousSalesYTD) * 100).toFixed(1)
                  : 0;

                subCategory.products.forEach(product => {
                  const productVarianceAmount = product.salesYTD - product.previousSalesYTD;
                  product.variancePercent = product.previousSalesYTD > 0
                    ? ((productVarianceAmount / product.previousSalesYTD) * 100).toFixed(1)
                    : 0;
                });
              });
            });
          }


          console.log("Transformed Data:", transformedData);
          setLoading(false);
          setData(transformedData);
        } catch (error) {
          console.error("Fetch error:", error);
        }
      };
      fetchData();
    }
  }, [data, setData]);



  //Get all categories across all brands

  const allCategories = data ?
    Object.keys(data).flatMap(brandName =>
      data[brandName].map(category => ({
        ...category,
        brandName
      }))
    ) : [];

  return (
    <div className="">
      {data && !loading && Object.keys(data).length > 0 ? (
        <>
          <Header />
          <div className="w-full app-bg">
            <div className="flex flex-col justify-center items-center md:items-end">
              {/* Category Cards */}
              <div className="">
                {/* <h2 className="text-2xl font-bold text-white mb-4">Our Categories</h2> */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-5 px-7">
                  {Object.keys(categoryImages).map((categoryName) => {
                    // Find category data from the first brand that has this category
                    const categoryObj = allCategories.find(cat => cat.name === categoryName);
                    const brandName = categoryObj?.brandName || brands[0].name

                    return (
                      <div
                        key={categoryName}
                        className="cursor-pointer rounded-xl overflow-hidden bg-white/80 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full h-[340px] py-2"
                        onClick={() => handleCategoryClick(categoryName, brandName)}
                      >
                        <div className="h-44 overflow-hidden">
                          <img
                            src={categoryImages[categoryName]}
                            alt={categoryName}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-lg font-semibold text-gray-800">{categoryName}</h3>

                          {/* Display sales information */}
                          {/* Display sales information */}
                          <div className="mt-2 mb-3">
                            {/* Sales YTD */}
                            <div className="flex justify-between items-center text-sm">
                              <span>Sales YTD:</span>
                              <span className="font-semibold">
                                {new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(categoryObj.salesYTD)}
                              </span>
                            </div>

                            {/* Previous Sales YTD */}
                            <div className="flex justify-between items-center text-sm">
                              <span>Previous Sales YTD:</span>
                              <span className="font-semibold">
                                {new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(categoryObj.previousSalesYTD)}
                              </span>
                            </div>

                            {/* Variance Percentage */}
                            <div className="flex justify-between items-center text-sm">
                              <span>Variance:</span>
                              <span
                                className={`font-semibold ${parseFloat(categoryObj.variancePercent) >= 0 ? 'text-green-600' : 'text-red-600'
                                  }`}
                              >
                                {categoryObj.variancePercent}%
                              </span>
                            </div>
                          </div>

                          <button
                            className="font-semibold px-3 w-full py-1 bg-[#de0f3f] text-white rounded-md hover:bg-[#c00e38] transition"
                          >
                            See Details →
                          </button>

                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-[#de0f3f] border-t-transparent rounded-full animate-spin mb-4"></div>
              <h1 className="text-2xl text-gray-600">Loading...</h1>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;


// import { useNavigate } from "react-router-dom";
// import domo from "ryuu.js";
// import { GlobalContext } from "../globalContext/context";

// // Import all category images
// import shampooConditionerImage from "../assets/Shampoo&Conditioner.webp";
// import hairStylingImage from "../assets/HairStyle.webp";
// import miniSizeImage from "../assets/MiniSize.webp";
// import valueGiftSetsImage from "../assets/Value&GiftSets.jpg";
// import skincare from "../assets/Skincare.webp";
// import Makeup from "../assets/face.webp";
// import Header from "@/component/Header";

// const brands = [
//   { name: "L'Oréal Professionnel", color: "#F472B6" },
//   { name: "Freck Beauty", color: "#FBBF24" },
// ];

// const categoryImages = {
//   "Shampoo & Conditioner": shampooConditionerImage,
//   "Hair Styling & Treatments": hairStylingImage,
//   "Mini Size": miniSizeImage,
//   "Value & Gift Sets": valueGiftSetsImage,
//   "Skincare": skincare,
//   "Makeup": Makeup,
// };

// const Home = () => {
//   const navigate = useNavigate();
//   const [categoryStats, setCategoryStats] = useState({});

//   const {
//     state: { data, loading },
//     setState: { setData, setLoading, setCategory, setBrand },
//   } = useContext(GlobalContext);

//   const handleCategoryClick = (categoryName, brandName) => {
//     setBrand(brandName);
//     setCategory(categoryName);
//     navigate("/product");
//   };

//   useEffect(() => {
//     // Fetch data if not already available in context
//     if (!data) {
//       const fetchData = async () => {
//         try {
//           // Assuming you have a global data fetch function or API call
//           const fetchedData = await domo.post(
//             "/sql/v1/dataset",
//             `SELECT \`Brand Name\`, \`Category Name\`, \`Product Name\`, \`Monthly Total\`, \`Sub Category Name\`, \`Date\` FROM dataset`,
//             {
//               contentType: "text/plain",
//             }
//           );
//           console.log("fechhhhhhhhhhh", fetchedData)
//           const transformedData = {}; // Transform data structure for original data model
//           const stats = {}; // For category statistics

//           // Initialize stats object with all categories
//           Object.keys(categoryImages).forEach(category => {
//             stats[category] = {
//               currentYearSales: 0,
//               previousYearSales: 0,
//               variance: 0,
//               variantCount: 0
//             };
//           });

//           // Current date for YTD calculations
//           const currentDate = new Date();
//           const currentYear = currentDate.getFullYear();
//           const previousYear = currentYear - 1;

//           // Process each row from the fetched data
//           fetchedData.rows.forEach(([brand, category, product, totalAmount, subCategory, dateStr]) => {
//             // Skip if category isn't in our defined categories
//             if (!Object.keys(categoryImages).includes(category)) {
//               return;
//             }

//             // Parse transaction date and amount
//             const transactionDate = new Date(dateStr);
//             const amount = parseFloat(totalAmount) || 0;

//             // Ensure brand exists in transformed data
//             if (!transformedData[brand]) {
//               transformedData[brand] = [];
//             }

//             // Find or create category object
//             let categoryObj = transformedData[brand].find((c) => c.name === category);
//             if (!categoryObj) {
//               categoryObj = { name: category, subCategories: [] };
//               transformedData[brand].push(categoryObj);
//             }

//             // Find or create subcategory object
//             let subCategoryObj = categoryObj.subCategories.find((sc) => sc.name === subCategory);
//             if (!subCategoryObj) {
//               subCategoryObj = { name: subCategory, products: [] };
//               categoryObj.subCategories.push(subCategoryObj);
//             }

//             // Add product if it doesn't exist
//             const existingProduct = subCategoryObj.products.find(p => p.name === product);
//             if (!existingProduct) {
//               // Add new product
//               subCategoryObj.products.push({
//                 name: product,
//                 sales: amount,
//                 date: transactionDate
//               });

//               // Increment variant count
//               stats[category].variantCount++;

//               // Add to YTD sales based on year
//               const transactionYear = transactionDate.getFullYear();

//               // Check if it's from current year and date is less than or equal to current date
//               if (transactionYear === currentYear &&
//                 transactionDate.getMonth() <= currentDate.getMonth() &&
//                 (transactionDate.getMonth() < currentDate.getMonth() ||
//                   transactionDate.getDate() <= currentDate.getDate())) {
//                 stats[category].currentYearSales += amount;
//               }
//               // Check if it's from previous year and date is less than or equal to current date
//               else if (transactionYear === previousYear &&
//                 transactionDate.getMonth() <= currentDate.getMonth() &&
//                 (transactionDate.getMonth() < currentDate.getMonth() ||
//                   transactionDate.getDate() <= currentDate.getDate())) {
//                 stats[category].previousYearSales += amount;
//               }
//             } else {
//               // Update existing product sales
//               existingProduct.sales += amount;
//             }
//           });

//           // Calculate variance for each category
//           Object.keys(stats).forEach(category => {
//             stats[category].variance = stats[category].currentYearSales - stats[category].previousYearSales;
//           });

//           // Set the category stats and data
//           setCategoryStats(stats);
//           setLoading(false);
//           setData(transformedData);
//         } catch (error) {
//           console.error("Fetch error:", error);
//         }
//       };

//       fetchData();
//     }
//   }, [data, setData]);

//   // Get all categories across all brands
//   const allCategories = data ?
//     Object.keys(data).flatMap(brandName =>
//       data[brandName].map(category => ({
//         ...category,
//         brandName
//       }))
//     ) : [];

//   return (
//     <div className="">
//       {data && !loading && Object.keys(data).length > 0 ? (
//         <>
//           <Header />
//           <div className="w-full app-bg">
//             <div className="flex flex-col justify-center items-center md:items-end">
//               {/* Category Cards */}
//               <div className="">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-5 px-7">
//                   {Object.keys(categoryImages).map((categoryName) => {
//                     // Find category data from the first brand that has this category
//                     const categoryObj = allCategories.find(cat => cat.name === categoryName);
//                     const brandName = categoryObj?.brandName || brands[0].name;

//                     // Get statistics for this category
//                     const stats = categoryStats[categoryName] || {
//                       currentYearSales: 0,
//                       previousYearSales: 0,
//                       variance: 0,
//                       variantCount: 0
//                     };

//                     // Calculate percentage change
//                     const percentChange = stats.previousYearSales > 0
//                       ? ((stats.variance / stats.previousYearSales) * 100).toFixed(1)
//                       : 0;

//                     return (
//                       <div
//                         key={categoryName}
//                         className="cursor-pointer rounded-xl overflow-hidden bg-white/80 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full h-[340px] py-2"
//                         onClick={() => handleCategoryClick(categoryName, brandName)}
//                       >
//                         <div className="h-44 overflow-hidden">
//                           <img
//                             src={categoryImages[categoryName]}
//                             alt={categoryName}
//                             className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//                           />
//                         </div>
//                         <div className="p-6">
//                           <h3 className="text-lg font-semibold text-gray-800">{categoryName}</h3>

//                           {/* Display sales information */}
//                           <div className="mt-2 mb-3">
//                             <div className="flex justify-between items-center text-sm">
//                               <span>Sales YTD:</span>
//                               <span className="font-semibold">${stats.currentYearSales.toLocaleString()}</span>
//                             </div>
//                             <div className="flex justify-between items-center text-sm">
//                               <span>Previous YTD:</span>
//                               <span className="font-semibold">${stats.previousYearSales.toLocaleString()}</span>
//                             </div>
//                             <div className="flex justify-between items-center text-sm">
//                               <span>Variance:</span>
//                               <span className={`font-semibold ${stats.variance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
//                                 ${stats.variance.toLocaleString()}
//                               </span>
//                             </div>

//                             {stats.previousYearSales > 0 && (
//                               <div className="flex justify-between items-center text-xs text-gray-600 mt-1">
//                                 <span>% Change:</span>
//                                 <div className="flex items-center">
//                                   <span className={`px-1.5 py-0.5 rounded ${stats.variance >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//                                     {stats.variance >= 0 ? '+' : ''}{percentChange}%
//                                   </span>
//                                 </div>
//                               </div>
//                             )}
//                           </div>

//                           {/* Display variants count if available */}
//                           {stats.variantCount > 0 && (
//                             <div className="text-xs text-gray-500 mb-2">
//                               {stats.variantCount} variants available
//                             </div>
//                           )}

//                           <button
//                             className="mt-4 px-3 py-1 bg-[#de0f3f] text-white rounded-md hover:bg-[#c00e38] transition"
//                           >
//                             See Details →
//                           </button>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       ) : (
//         <>
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
//             <div className="flex flex-col items-center">
//               <div className="w-12 h-12 border-4 border-[#de0f3f] border-t-transparent rounded-full animate-spin mb-4"></div>
//               <h1 className="text-2xl text-gray-600">Loading...</h1>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Home;