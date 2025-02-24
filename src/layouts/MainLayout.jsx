import { Link, Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <h1>Main Layout</h1>
      <span className="m-2">
        <Link className="HomePage" to={"/"}>
          Trang chủ
        </Link>
      </span>
      <span className="m-2">
        <Link className="LoginPage" to={"login"}>
          Login
        </Link>
      </span>
      <span className="m-2">
        <Link className="LoginPage" to={"products/1/details"}>
          Sản phẩm 1
        </Link>
      </span>
      <Outlet />
    </>
  );
};

export default MainLayout;
