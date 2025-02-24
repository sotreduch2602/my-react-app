import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import ProductDetail from "./pages/products/productDetail";
import ProductList from "./pages/products/productlist";
import ProductAdd from "./pages/products/ProductAdd";
import MainLayout from "./layouts/MainLayout";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />

            <Route path="products">
              <Route index element={<ProductList />} />
              <Route path=":id/details" element={<ProductDetail />} />
              <Route path="add" element={<ProductAdd />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
