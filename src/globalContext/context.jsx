// src/Global Context/context.js
import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [product, setProduct] = useState("");
  const [allProduct, setAllProduct] = useState([]);
  const [data, setData] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  return (
    <GlobalContext.Provider
      value={{
        state: {
          brand,
          category,
          product,
          data,
          activeIndex,
          allProduct,
          loading
        },
        setState: {
          setBrand,
          setCategory,
          setProduct,
          setData,
          setActiveIndex,
          setAllProduct,
          setLoading
        },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
