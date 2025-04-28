import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Product from "./pages/ProductDetail";
import { GlobalProvider } from "./globalContext/context";
import './App.css';

function App() {
  return (
    <GlobalProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/category"
            element={<Category brand="Blushify" />}
          />
          <Route
            path="/product"
            element={<Product brand="Blushify" productName="Blush Palette" />}
          />
        </Routes>
      </HashRouter>
    </GlobalProvider>
  );
}

export default App;
