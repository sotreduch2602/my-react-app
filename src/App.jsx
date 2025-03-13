import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductsList from "./pages/products/ProductsList";
import Error404 from "./pages/Error404";
import Home from "./pages/Home";
import ProductDetail from "./pages/products/ProductDetail";
import CartList from "./pages/cart/CartList";
import axios from "axios";
import Navbar from "./layouts/navbar";
import { LayoutProvider } from "./hooks/LayoutContext";
axios.defaults.baseURL = "http://localhost:3000";

const App = () => {
  return (
    <>
      <LayoutProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index element={<Home />} />
              <Route path="products">
                <Route index element={<ProductsList />} />
                <Route path="detail/:id" element={<ProductDetail />} />
              </Route>

              <Route path="cart" element={<CartList />} />

              <Route path="error">
                <Route path="404" element={<Error404 />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </LayoutProvider>
    </>
  );
};

export default App;
