import { Table } from "react-bootstrap";

const CartList = () => {
  return (
    <>
      <h1>Cart Lists</h1>
      <Table striped bordered>
        <thead className="table">
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
      </Table>
    </>
  );
};

export default CartList;
