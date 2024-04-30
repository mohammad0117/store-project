import { Navigate, Route, Routes } from "react-router-dom";

import ProductPage from "./pages/ProductPage";
import DetailsPage from "./pages/DetailsPage";
import Checkout from "./pages/Checkout";
import PageNotFound from "./pages/404";
import ProductsProvider from "./context/ProductContext";
import CartProvider from "./context/CartContext";
import Layout from "./layout/Layout";

function App() {
  return (
    <CartProvider>
      <ProductsProvider>
        <Layout>
          <Routes>
            <Route index element={<Navigate to="/products" replace />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/products/:id" element={<DetailsPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </Layout>
      </ProductsProvider>
    </CartProvider>
  );
}

export default App;
