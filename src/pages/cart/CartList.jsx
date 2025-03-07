import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";

const CartList = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cartRes, productsRes] = await Promise.all([
          axios.get("cart"),
          axios.get("products"),
        ]);
        setCartItems(cartRes.data);
        setProducts(productsRes.data);
        setCount(count + 1);
        console.log(count);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  const getProduct = (products, productId) => {
    const product = products.find((item) => item.id === productId);
    return product ? product : null;
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const product = getProduct(products, item.product_id);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  const handleDeleteCartItem = async (id) => {
    try {
      await axios.delete(`cart/${id}`);
      setCartItems((prevItems) =>
        prevItems.filter((cartItem) => cartItem.id != id)
      );
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item from cart");
    }
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
            <th>Action</th>
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
              <td>
                <ButtonGroup>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteCartItem(item.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={5} className="table-dark text-center font-weight-bold">
              Total
            </td>
            <td className="font-weight-bold">{calculateTotal()}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default CartList;
