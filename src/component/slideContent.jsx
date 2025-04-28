import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../globalContext/context";
import domo from "ryuu.js";
import { BsBarChartLine } from "react-icons/bs";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { LineCharts } from "@/chart/LineChart";
import { BarCharts } from "@/chart/BarChart";
import { PieCharts } from "@/chart/PieChart";
import { DoubleBarChart } from "@/chart/DoubleBarChart";
import { LineChartTwo } from "@/chart/LineChart2";
import { HorizontalBarChart } from "@/chart/HorzontialBarChart";

const SlideContent = ({ brand, subCategoryName, productName }) => {
    

    const [totalSalesByCountry, setTotalSalesByCountry] = useState([]);
    const [totalSalesByMonth, setTotalSalesByMonth] = useState([]);
    const [salesByChannelName, setSalesByChannelName] = useState([]);
    const [salesByChannelType, setSalesByChannelType] = useState([]);

    const [qtyTrend, setQtyTrend] = useState([]);
    const [profitTrend, setProfitTrend] = useState([]);
    const [salesGender, setSalesGender] = useState([]);


    const {
        state: { category, product },
        // setState: { setActiveIndex, setProduct },
    } = useContext(GlobalContext);
    // console.log(".....................", category);

    useEffect(() => {

        const fetchQtyByMonth = async () => {
            try {
                const fetchedData = await domo.post(
                    "/sql/v1/dataset",
                    `SELECT \`Month\`, SUM(\`Quantity Sold\`) AS \`Total_Qty\`
                    FROM dataset
                    WHERE \`Product Name\` = '${productName}'
                    GROUP BY \`Month\`
                    ORDER BY \`Month\``,
                    {
                        contentType: "text/plain",
                    }
                );
                const qtyTrend = fetchedData.rows.reduce(
                    (acc, [Month, total]) => {
                        acc[0].push(Month);
                        acc[1].push(total);
                        return acc;
                    },
                    [[], []] // Start with two empty arrays
                );
                setQtyTrend(qtyTrend);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        const fetchProfitByMonth = async () => {
            try {
                const fetchedData = await domo.post(
                    "/sql/v1/dataset",
                    `SELECT \`Month\`, SUM(\`Monthly Profit\`) AS \`Total_Profit\`
                    FROM dataset
                    WHERE \`Product Name\` = '${productName}'
                    GROUP BY \`Month\`
                    ORDER BY \`Month\``,
                    {
                        contentType: "text/plain",
                    }
                );
                const profitTrend = fetchedData.rows.reduce(
                    (acc, [Month, total]) => {
                        acc[0].push(Month);
                        acc[1].push(total);
                        return acc;
                    },
                    [[], []] // Start with two empty arrays
                );
                setProfitTrend(profitTrend);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        const fetchSalesbyGender = async () => {
            try {

                //  sum of total sales by Male and Female column
                const fetchedData = await domo.post(
                    "/sql/v1/dataset",
                    `SELECT SUM(\`Male\`) AS \`Male\`, SUM(\`Female\`) AS \`Female\`
                      FROM dataset
                      WHERE \`Product Name\` = '${productName}'`,
                    {
                        contentType: "text/plain",
                    }
                );
                const genderSales = [fetchedData.columns, fetchedData.rows[0]];
                setSalesGender(genderSales);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        const fetchTotalSalesByCountry = async () => {
            try {
                const fetchedData = await domo.post(
                    "/sql/v1/dataset",
                    `SELECT 
                        Country,
                        SUM(\`Monthly Total\`) AS Total_Sales
                        FROM 
                        dataset
                        WHERE \`Product Name\` = '${productName}'
                        GROUP BY 
                        Country
                        ORDER BY 
                        Total_Sales DESC`,
                    {
                        contentType: "text/plain",
                    }
                );
                const countryMonthlyTotals = fetchedData.rows.reduce(
                    (acc, [Month, total]) => {
                        acc[0].push(Month);
                        acc[1].push(total);
                        return acc;
                    },
                    [[], []] // Start with two empty arrays
                );
                setTotalSalesByCountry(countryMonthlyTotals);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        const fetchTotalSalesByMonth = async () => {
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

                
                const countryMonthlyTotals = fetchedData.rows.reduce(
                    (acc, [Month, total]) => {
                        acc[0].push(Month);
                        acc[1].push(total);
                        return acc;
                    },
                    [[], []] // Start with two empty arrays
                );
                setTotalSalesByMonth(countryMonthlyTotals);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        // const fetchBottom5Products = async () => {
        //     try {
        //         const fetchedData = await domo.post(
        //                         "/sql/v1/dataset",
        //                         `SELECT 
        //                             \`Product Name\`, 
        //                             SUM(\`Monthly Total\`) AS \`Total_Sales\`
        //                         FROM dataset
        //                         WHERE \`Product Name\` = '${productName}'
        //                         GROUP BY \`Product Name\`
        //                         ORDER BY \`Total_Sales\` ASC`,
        //                         {
        //                             contentType: "text/plain",
        //                         }
        //                     );
        //                     const topProducts = fetchedData.rows.reduce(
        //                         (acc, [productName, totalSales]) => {
        //                             acc[0].push(productName);
        //                             acc[1].push(totalSales);
        //                             return acc;
        //                         },
        //                         [[], []]
        //                     );
        //                     setTopProducts(topProducts);
        //     } catch (error) {
        //         console.error("Fetch error:", error);
        //     }
        // };



        // const fetchTop5Perfroming = async () => {
        //     try {
        //         const fetchedData = await domo.post(
        //                         "/sql/v1/dataset",
        //                         `SELECT 
        //                             \`Product Name\`, 
        //                             SUM(\`Monthly Total\`) AS \`Total_Sales\`
        //                         FROM dataset
        //                         WHERE \`Product Name\` = '${productName}'
        //                         GROUP BY \`Product Name\`
        //                         ORDER BY \`Total_Sales\` DESC`,
        //                         {
        //                             contentType: "text/plain",
        //                         }
        //                     );
        //                     const topProducts = fetchedData.rows.reduce(
        //                         (acc, [productName, totalSales]) => {
        //                             acc[0].push(productName);
        //                             acc[1].push(totalSales);
        //                             return acc;
        //                         },
        //                         [[], []]
        //                     );
        //                     setTopPerforming(topProducts);
        //     } catch (error) {
        //         console.error("Fetch error:", error);
        //     }
        // };

        const fetchSalesByChannelName = async () => {
            try {
                const fetchedData = await domo.post(
                    "/sql/v1/dataset",
                    `SELECT 
                        \`Channel_Name\`, 
                        SUM(\`Monthly Total\`) AS \`Total_Sales\`
                    FROM dataset
                    WHERE \`Product Name\` = '${productName}'
                    GROUP BY \`Channel_Name\`
                    ORDER BY \`Total_Sales\` DESC`,
                    {
                        contentType: "text/plain",
                    }
                );
                const countryMonthlyTotals = fetchedData.rows.reduce(
                    (acc, [Month, total]) => {
                        acc[0].push(Month);
                        acc[1].push(total);
                        return acc;
                    },
                    [[], []] // Start with two empty arrays
                );
                setSalesByChannelName(countryMonthlyTotals);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        const fetchSalesBasedOnChannelTypeByMonth = async () => {
            try {
                const fetchedData = await domo.post(
                    "/sql/v1/dataset",
                    `SELECT 
                        \`Channel_Type\`,
                        \`Month\`, 
                        SUM(\`Monthly Total\`) AS \`Total_Sales\`
                    FROM dataset
                    WHERE \`Product Name\` = '${productName}'
                    GROUP BY \`Channel_Type\`, \`Month\`
                    ORDER BY \`Channel_Type\`, \`Month\``,
                    {
                        contentType: "text/plain",
                    }
                );
                console.log("fetchSalesByChannelType", fetchedData);
                const countryMonthlyTotals = [fetchedData.columns, fetchedData.rows];
                setSalesByChannelType(countryMonthlyTotals);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };


        if (productName) {
            fetchQtyByMonth();
            fetchProfitByMonth()
            fetchTotalSalesByCountry();
            fetchTotalSalesByMonth();
            fetchSalesbyGender();
            // fetchBottom5Products();
            // fetchTop5Perfroming();
            fetchSalesByChannelName();
            fetchSalesBasedOnChannelTypeByMonth();
        }
    }, [productName]);

    return (
        <div className="relative w-full h-full">
            {/* Background Image */}
            <img
                src={`src/assets/products/${category}/${subCategoryName}.png`}
                // src="src/assets/products/Hair Styling & Treatments/Metal Detox Anti-Breakage Pre-Shampoo Treatment.png" 
                alt="Background"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 opacity-30 w-full h-full object-contain"
            />


            {/* Overlay Content */}
            <div className="relative z-10  h-full">
                <h1 className="text-center header uppercase text-white font-semibold">{subCategoryName}</h1>

                <div className="flex flex-col gap-2 mb-4 pb-3 pt-4 text-stone-700 font-semibold">
                    <div className="grid grid-cols-4 gap-2">
                        <div className="bg-white/20 p-2 rounded-lg h-[150px]">
                            <h1 className="flex items-center gap-2 text-xl" style={{marginBottom: '20px'}}>
                                <BsBarChartLine className="w-5 h-5" />
                                <span className="text-[#dddbc5]">Total Sales</span>
                            </h1>

                            {Array.isArray(totalSalesByMonth) && totalSalesByMonth.length > 0 && (
                                <LineCharts datas={totalSalesByMonth} />
                            )}
                        </div>
                        <div className="bg-white/20  p-2 rounded-lg h-[150px]">
                            <h1 className="flex items-center gap-2 text-xl" style={{marginBottom: '20px'}}>
                                <FaIndianRupeeSign className="w-5 h-5" />
                                <span className="text-[#dddbc5]">Total Qty</span>
                            </h1>
                            {Array.isArray(qtyTrend) && qtyTrend.length > 0 && (
                                <LineCharts datas={qtyTrend} />
                            )}
                        </div>
                        <div className="bg-white/20  p-2 rounded-lg h-[150px]">
                            <h1 className="flex items-center gap-2 text-xl" style={{marginBottom: '20px'}}>
                                <FaIndianRupeeSign className="w-5 h-5" />
                                <span className="text-[#dddbc5]">Profit</span>
                            </h1>
                            {Array.isArray(profitTrend) && profitTrend.length > 0 && (
                                <LineCharts datas={profitTrend} />
                            )}
                        </div>
                        <div className="bg-white/20  p-2 rounded-lg h-[150px]">
                            <h1 className="flex items-center gap-2 text-xl" style={{marginBottom: '20px'}}>
                                <FaIndianRupeeSign className="w-5 h-5" />
                                <span className="text-[#dddbc5]">Gender</span>
                            </h1>
                            {/* <h4 className="font-semibold text-xl mt-2">Last Year</h4> Added mt-2 */}
                            {Array.isArray(salesGender) && salesGender.length > 0 && (
                                <HorizontalBarChart data={salesGender} />
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white/20  p-2 rounded-lg">
                            <h1 className="flex items-center gap-2 text-xl" style={{marginBottom: '20px'}}>
                                <span className="text-[#dddbc5]">Sales by Month</span>
                            </h1>
                            {Array.isArray(totalSalesByMonth) && totalSalesByMonth.length > 0 && (
                                <LineChartTwo datas={totalSalesByMonth} />
                            )}
                        </div>
                        <div className="bg-white/20  p-2 rounded-lg">
                            <h1 className="flex items-center gap-2 text-xl" style={{marginBottom: '20px'}}>
                                <span className="text-[#dddbc5]">Sales by Country</span>
                            </h1>
                            {Array.isArray(totalSalesByCountry) && totalSalesByCountry.length > 0 && (
                                <BarCharts datas={totalSalesByCountry} />
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white/20  p-2 rounded-lg">
                            <h1 className="flex items-center gap-2 text-xl" style={{marginBottom: '20px'}}>
                                <span className="text-[#dddbc5]">Sales by Channel</span>
                            </h1>
                            <PieCharts data={salesByChannelName} />
                        </div>
                        <div className="bg-white/20  p-2 rounded-lg">
                            <h1 className="flex items-center gap-2 text-xl" style={{marginBottom: '20px'}}>
                                <span className="text-[#dddbc5]">Sales by Channel Type</span>
                            </h1>
                            <DoubleBarChart  datas={salesByChannelType}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default SlideContent;