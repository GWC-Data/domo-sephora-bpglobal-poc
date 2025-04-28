import LineChart2 from "../chart/line2";
import LineChart1 from "../chart/line1";
import React, { useContext, useEffect, useState } from "react";
import PieChart from "../chart/pie";
import BarChart1 from "../chart/bar1";
import BarChart2 from "../chart/bar2";
import PercentageSlider from "../chart/percentage";
import { GlobalContext } from "../globalContext/context";
import domo from "ryuu.js";
import { BsBarChartLine } from "react-icons/bs";
import { FaIndianRupeeSign } from "react-icons/fa6";
import LineCharts from "@/chart/LineChart";

const SlideContent = ({ brand, subCategoryName, productName }) => {
    console.log("brand", productName);
    const [line1, setLine1] = useState([]);
    const [line2, setLine2] = useState([]);
    const [bar1, setBar1] = useState([]);
    const [bar2, setBar2] = useState([]);
    const [genderPercentage, setGenderPercentage] = useState("");
    const [pie, setPie] = useState([]);
    const [totalSales, setTotalSales] = useState(0);
    const [topProducts, setTopProducts] = useState([]);
    const [uniqueCustomerCount, setUniqueCustomerCount] = useState([]);
    const [productCount, setProductCount] = useState([]);

    const {
        state: { category, product },
        // setState: { setActiveIndex, setProduct },
    } = useContext(GlobalContext);
    // console.log(".....................", category);

    useEffect(() => {
        const fetchCountryTransaction = async () => {
            try {
                const query = `
                    SELECT \`Country\`, SUM(\`Total Transactions\`) AS total_transactions
                    FROM dataset
                    WHERE \`Product Name\` = '${productName}'
                    GROUP BY \`Country\`
                `;

                const fetchedData = await domo.post(
                    "/sql/v1/dataset",
                    query,
                    {
                        contentType: "text/plain",
                    }
                );
                const countryTransactions = fetchedData.rows.reduce(
                    (acc, [country, totalTransactions]) => {
                        acc[0].push(country);
                        acc[1].push(totalTransactions);
                        return acc;
                    },
                    [[], []] // Start with two empty arrays
                );
                setLine1(countryTransactions);
                // console.log("countryTransactions:", countryTransactions[0]);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        // const fetchUniqueProductsCount = async () => {
        //     try {
        //         const query = `
        //             SELECT COUNT(DISTINCT \`Product Name\`) AS unique_product_count
        //             FROM dataset
        //             WHERE \`Sub Category\` = '${subCategoryName}'
        //         `;
        
        //         const fetchedData = await domo.post(
        //             "/sql/v1/dataset",
        //             query,
        //             {
        //                 contentType: "text/plain",
        //             }
        //         );
                
        //         // Assuming the result has the count in the first column
        //         const uniqueProductCount = fetchedData.rows[0]; // The count will be in the first element of the first row
        
        //         console.log("Unique Product Count:", uniqueProductCount);
        //         setProductCount(uniqueProductCount);  // Assuming you have a state to store the count
        //     } catch (error) {
        //         console.error("Fetch error:", error);
        //     }
        // };

        const fetchChannelType = async () => {
            try {
                const fetchedData = await domo.post(
                    "/sql/v1/dataset",
                    `SELECT \`Channel_Type\`, COUNT(\`Channel_Type\`) AS \`Channel_Type_Count\`
                    FROM dataset
                    WHERE \`Product Name\` = '${productName}'
                    GROUP BY \`Channel_Type\``,
                    {
                        contentType: "text/plain",
                    }
                );
                const channelType = fetchedData.rows.reduce(
                    (acc, [Channel_Type, total]) => {
                        acc[0].push(Channel_Type);
                        acc[1].push(total);
                        return acc;
                    },
                    [[], []] // Start with two empty arrays
                );
                // const channelType = fetchedData.rows.reduce((acc, [Channel_Type, total]) => {
                //     acc[Channel_Type] = total;
                //     return acc;
                // }, {});
                // console.log("Fetched data with Channel Type count:", channelType);
                setPie(channelType);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        }
        // const fetchUniqueCustomerCount = async () => {
        //     try {
        //         const fetchedData = await domo.post(
        //             "/sql/v1/dataset",
        //             `SELECT COUNT(DISTINCT \`Unique Customers\`) AS unique_customer_count FROM dataset
        //                 WHERE \`Sub Category\` = '${subCategoryName}'`,
        //             {
        //                 contentType: "text/plain",
        //             }
        //         );

        //         const uniqueCustomerCount = fetchedData.rows[0].unique_customer_count;
        //         setUniqueCustomerCount(uniqueCustomerCount);
        //         console.log("Unique Customer Count:", uniqueCustomerCount);
        //     } catch (error) {
        //         console.error("Fetch error:", error);
        //         if (error.response) {
        //             console.error("API Response Error:", error.response);
        //         }
        //     }
        // };

        const fetchMostSales = async () => {
            try {
                const fetchedData = await domo.post(
                    "/sql/v1/dataset",
                    `SELECT \`Month\`, SUM(\`Monthly Total\`) AS \`Monthly_Total\`
                    FROM dataset
                    WHERE \`Product Name\` = '${productName}'
                    GROUP BY \`Month\`
                    ORDER BY \`Month\``,
                    {
                        contentType: "text/plain",
                    }
                );

                // const sales = fetchedData.rows.reduce((acc, [Month, total]) => {
                //     acc[Month] = total;
                //     return acc;
                // }, {});
                const sales = fetchedData.rows.reduce(
                    (acc, [Month, total]) => {
                        acc[0].push(Month);
                        acc[1].push(total);
                        return acc;
                    },
                    [[], []] // Start with two empty arrays
                );
                const calculatedTotalSales = sales[1].reduce((sum, value) => sum + value, 0);
                setTotalSales(calculatedTotalSales);
                console.log("calculatepercentage", calculatedTotalSales)

                setBar1(sales);
                // console.log("Fetched monthly total data:", sales);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        }

        const fetchGenderData = async () => {
            try {

                const fetchedData = await domo.post(
                    "/sql/v1/dataset",
                    `SELECT SUM(\`Male\`) AS \`Male_Sum\`, SUM(\`Female\`) AS \`Female_Sum\`
                      FROM dataset
                      WHERE \`Product Name\` = '${productName}';`,
                    {
                        contentType: "text/plain",
                    }
                );

                const genderCalculation = {
                    male: fetchedData.rows[0][0], // Male_Sum value from the first row
                    female: fetchedData.rows[0][1] // Female_Sum value from the second row
                };
                const total = genderCalculation.male + genderCalculation.female;

                const malePercentage = total ? (genderCalculation.male / total) * 100 : 0;
                setGenderPercentage(malePercentage)
                // console.log("genderCalculation:", genderCalculation);

            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        // const fetchTop5 = async () => {
        //     console.log("------------category", category);
        //     try {
        //         const fetchedData = await domo.post(
        //             "/sql/v1/dataset",
        //             `SELECT 
        //                 \`Product Name\`, 
        //                 SUM(\`Monthly Total\`) AS \`Total_Sales\`
        //             FROM dataset
        //             WHERE \`Sub Category\` = '${subCategoryName}'
        //             GROUP BY \`Product Name\`
        //             ORDER BY \`Total_Sales\` DESC
        //             LIMIT 5`,
        //             {
        //                 contentType: "text/plain",
        //             }
        //         );                  
        //         console.log("------------", fetchedData);
                
        //         // const channelName = fetchedData.rows.reduce((acc, [Channel_Name, total]) => {
        //         //     acc[Channel_Name] = total;
        //         //     return acc;
        //         // }, {});
        //         const channelName = fetchedData.rows.reduce(
        //             (acc, [Channel_Name, total]) => {
        //                 acc[0].push(Channel_Name);
        //                 acc[1].push(total);
        //                 return acc;
        //             },
        //             [[], []] // Start with two empty arrays
        //         );
        //         setBar2(channelName);
        //         // console.log("Fetched data with Channel Name count:", channelName);
        //     } catch (error) {
        //         console.error("Fetch error:", error);
        //     }
        // }

        // const fetchTopProducts = async () => {
        //     try {
        //         const fetchedData = await domo.post(
        //             "/sql/v1/dataset",
        //             `SELECT 
        //                 \`Product Name\`, 
        //                 SUM(\`Monthly Total\`) AS \`Total_Sales\`
        //             FROM dataset
        //             WHERE \`Sub Category\` = '${subCategoryName}'
        //             GROUP BY \`Product Name\`
        //             ORDER BY \`Total_Sales\` DESC
        //             LIMIT 5`,
        //             {
        //                 contentType: "text/plain",
        //             }
        //         );

        //         const topProducts = fetchedData.rows.reduce(
        //             (acc, [productName, totalSales]) => {
        //                 acc[0].push(productName);
        //                 acc[1].push(totalSales);
        //                 return acc;
        //             },
        //             [[], []]
        //         );

        //         setTopProducts(topProducts); // You'll need to create this state variable
        //     } catch (error) {
        //         console.error("Fetch error:", error);
        //     }
        // }

        const fetchCountryMonthlyTotal = async (productName) => {
            try {
                const fetchedData = await domo.post(
                    "/sql/v1/dataset",
                    `SELECT \`Month\`, SUM(\`Monthly Total\`) AS \`Monthly_Total\`
                    FROM dataset
                    WHERE \`Product Name\` = '${productName}'
                    GROUP BY \`Month\`
                    ORDER BY \`Month\``,
                    {
                        contentType: "text/plain",
                    }
                );
                console.log("fetchedData:", fetchedData);

                //   const countryMonthlyTotals = fetchedData.rows.reduce((acc, [Month, total]) => {
                //     acc[Month] = total;
                //     return acc;
                //     }, {});
                const countryMonthlyTotals = fetchedData.rows.reduce(
                    (acc, [Month, total]) => {
                        acc[0].push(Month);
                        acc[1].push(total);
                        return acc;
                    },
                    [[], []] // Start with two empty arrays
                );
                setLine2(countryMonthlyTotals);
                // Assuming fetchedData.rows is an array of the returned rows
                //   const countryMonthlyTotals = fetchedData.rows.map(row => ({
                //     Month: row.Month,
                //     totalMonthlyTotal: row.Total_Monthly_Total,
                //   }));

                console.log("Country Monthly Totals:", countryMonthlyTotals);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        if (productName) {
            fetchCountryTransaction();
            fetchChannelType();
            fetchMostSales();
            fetchGenderData();
            // fetchTop5();
            // fetchTopProducts();
            fetchCountryMonthlyTotal();
            // fetchUniqueCustomerCount();
            // fetchUniqueProductsCount();
        }
    }, [productName]);

    return (
        <div className="relative w-full h-full">
            {/* Background Image */}
            <img
                src={`src/assets/products/${category}/${subCategoryName}.png`}
                // src="src/assets/products/Hair Styling & Treatments/Metal Detox Anti-Breakage Pre-Shampoo Treatment.png" 
                alt="Background"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 opacity-90 w-full h-full object-contain"
            />


            {/* Overlay Content */}
            <div className="relative z-10  h-full">
                <h1 className="header uppercase text-white font-semibold">{subCategoryName}</h1>

                <div className="flex flex-col gap-2 mb-4 pb-3 pt-4 h-[500px] text-stone-700 font-semibold">
                    <div className="grid grid-cols-4 gap-2">
                        <div className="bg-white/60 p-5 rounded-lg h-full">
                            <h1 className="flex items-center gap-2 text-xl">
                                <BsBarChartLine className="w-5 h-5" />
                                <span>Total Sales</span>
                            </h1>
                            {/* <h4 className="font-semibold text-xl mt-2">Last Year</h4> */}
                            {Array.isArray(line2) && line2.length > 0 && (
                                <LineChart2 datas={bar1} />
                            )}
                        </div>
                        <div className="bg-white/60 py-5 px-7 rounded-lg">
                            <h1 className="flex items-center space-x-3 text-xl">
                                <FaIndianRupeeSign className="w-5 h-5" />
                                <span>Total Transaction</span>
                            </h1>
                            {/* <h4 className="font-semibold text-xl mt-2">Last Year</h4> Added mt-2 */}
                            {Array.isArray(line2) && line2.length > 0 && (
                                <LineCharts datas={line1} />
                            )}
                        </div>

                        <div className="flex flex-col gap-2 mb-4 h-full">
                            <div className="bg-white/60 p-2 rounded-lg h-full">Unique Customer Count <span className="text-xl">{uniqueCustomerCount ?? 0}</span></div>
                            {(console.log("uniqqqqqqqq", uniqueCustomerCount))}
                            <div className="bg-white/60 p-2 rounded-lg h-full">Product Count <span className="text-xl">{productCount ?? 0}</span></div>
                        </div>
                        <div className="bg-white/60 p-5 rounded-lg text-xl">
                            <h1>Gender Percentage</h1>
                            {Array.isArray(line2) && line2.length > 0 && (
                                <PercentageSlider percentage={genderPercentage} />
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 items-stretch h-[90%]">
                        <div className="bg-white/60 pt-5 rounded-lg h-[90%] text-xl">
                            <h1 className="pl-3">Channel Type</h1>
                            <div className="h-full max-h-[180px] overflow-hidden">
                                {Array.isArray(line2) && line2.length > 0 && (
                                    <PieChart datas={pie} />
                                )}
                            </div>
                        </div>
                        <div className="bg-white/60 p-5 rounded-lg h-[90%] text-xl">
                            <h1>Most Sales</h1>
                            {Array.isArray(line2) && line2.length > 0 && (
                                <BarChart1 datas={bar1} />
                            )}
                        </div>
                        <div className="bg-white/60 p-5 h-[90%] rounded-lg text-xl">
                            <h1>Top 5 Products</h1>
                            {Array.isArray(line2) && line2.length > 0 && (
                                <BarChart2 datas={bar2} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default SlideContent;