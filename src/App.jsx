import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductsList from "./pages/products/ProductsList";
import Error404 from "./pages/Error404";
import Home from "./pages/Home";
import ProductDetail from "./pages/products/ProductDetail";
import CartList from "./pages/cart/CartList";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="products">
            <Route index element={<ProductsList />} />
            <Route path="detail/:id" element={<ProductDetail />} />
          </Route>

          <Route path="cart" element={<CartList />} />

          <Route path="error">
            <Route path="404" element={<Error404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
