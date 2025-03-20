import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductsList from "./pages/products/ProductsList";
import Error404 from "./pages/Error404";
import Home from "./pages/Home";
import ProductDetail from "./pages/products/ProductDetail";
import CartList from "./pages/cart/CartList";
import axios from "axios";
import Navbar from "./layouts/navbar";
import { LayoutProvider } from "./hooks/LayoutContext";
import Login from "./pages/user/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./hooks/AuthContext";
import SearchProducts from "./pages/products/SearchProducts";
import UserProfile from "./pages/user/UserProfile";
import Categories from "./pages/categories/Categories";
import AdminDashBoard from "./pages/admin/AdminDashBoard";
axios.defaults.baseURL = "http://localhost:3000";

const App = () => {
  return (
    <>
      <LayoutProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navbar />}>
                <Route index element={<Home />} />
                <Route path="products">
                  <Route index element={<ProductsList />} />
                  <Route path="detail/:id" element={<ProductDetail />} />
                  <Route path="categories/:id" element={<Categories />} />
                  <Route path="search" element={<SearchProducts />} />
                </Route>

                <Route path="login" element={<Login />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="cart" element={<CartList />} />
                  <Route path="profile" element={<UserProfile />} />
                </Route>

                <Route path="error">
                  <Route path="404" element={<Error404 />} />
                </Route>

                <Route path="admin1" element={<AdminDashBoard />} />

                <Route
                  path="admin"
                  element={<ProtectedRoute requiredRole="admin" />}
                >
                  <Route index element={<AdminDashBoard />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LayoutProvider>
    </>
  );
};

export default App;
