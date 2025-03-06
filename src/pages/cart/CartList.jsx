import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";

const CartList = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cartRes, productsRes] = await Promise.all([
          axios.get("cart"),
          axios.get("products"),
        ]);
        setCartItems(cartRes.data);
        setProducts(productsRes.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [cartItems, products]);

  const getProduct = (products, productId) => {
    const product = products.find((item) => item.id === productId);
    return product ? product : null;
  };

  return (
    <>
      <h1>Cart Lists</h1>
      <Table striped bordered>
        <thead className="table-dark">
          <tr>
            <th>No.</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>SubTotal</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={`../../../public/images/product/${
                    getProduct(products, item.product_id)?.image
                  }`}
                  alt={getProduct(products, item.product_id)?.name}
                  style={{ width: "100px" }}
                />
              </td>
              <td>{getProduct(products, item.product_id)?.name}</td>
              <td>{getProduct(products, item.product_id)?.price}</td>
              <td>{item.quantity}</td>
              <td>
                {getProduct(products, item.product_id)?.price * item.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default CartList;
