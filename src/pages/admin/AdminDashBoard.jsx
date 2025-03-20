import { Tab, Tabs } from "react-bootstrap";
import ProductManagement from "./ProductManagement";
import UserManagement from "./UserManagement";

const AdminDashBoard = () => {
  return (
    <div>
      <h2 className="text-center">DashBoard</h2>
      <div className="shadow">
        <Tabs defaultActiveKey="products" transition={false} className="mb-3">
          <Tab eventKey="products" title="Products">
            <div className="m-2">
              <ProductManagement />
            </div>
          </Tab>
          <Tab eventKey="users" title="Users">
            <div className="m-2">
              <UserManagement />
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashBoard;
