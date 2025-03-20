import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Container,
  FormCheck,
  Table,
} from "react-bootstrap";
import { useLayout } from "../../hooks/LayoutContext";

const CartList = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const { cartQuantity, setCartQuantity } = useLayout();
  const [selectedItems, setSelectedItems] = useState([]);

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
      const selectedItem = cartItems.find((cartItem) => cartItem.id == id);
      setCartQuantity(cartQuantity - selectedItem.quantity);
      setCartItems((prevItems) =>
        prevItems.filter((cartItem) => cartItem.id != id)
      );
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item from cart");
    }
  };

  const HandleUpdateQuantity = (id, value) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + value } : item
      )
    );
    setCartItems((prevItems) => prevItems.filter((item) => item.quantity > 0));
    setCartQuantity((prevCartQuantity) => (prevCartQuantity += value));
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems((prev) => {
      if (prev.includes(itemId)) {
        return prev.filter((id) => id !== itemId);
      }
      return [...prev, itemId];
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(cartItems.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(selectedItems.map((id) => axios.delete(`cart/${id}`)));

      const deletedItems = cartItems.filter((item) =>
        selectedItems.includes(item.id)
      );
      const totalQuantityToRemove = deletedItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      setCartQuantity((prev) => prev - totalQuantityToRemove);
      setCartItems((prev) =>
        prev.filter((item) => !selectedItems.includes(item.id))
      );
      setSelectedItems([]);
    } catch (error) {
      console.error("Error deleting items:", error);
      alert("Failed to delete selected items");
    }
  };

  return (
    <Container>
      <h1>Cart Lists</h1>
      {cartItems.length === 0 ? (
        <span>Your cart is empty</span>
      ) : (
        <Table striped bordered>
          <thead className="table-dark">
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedItems.length === cartItems.length}
                />
              </th>
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
                <td>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                  />
                </td>
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
                <td>
                  <Button
                    className="mr-2"
                    onClick={() => HandleUpdateQuantity(item.id, -1)}
                  >
                    <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                  </Button>
                  {item.quantity}
                  <Button
                    className="ml-2"
                    onClick={() => HandleUpdateQuantity(item.id, 1)}
                  >
                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                  </Button>
                </td>
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
              <td
                colSpan={6}
                className="table-dark text-center font-weight-bold"
              >
                Total
              </td>
              <td className="font-weight-bold">{calculateTotal()}</td>
            </tr>
          </tbody>
        </Table>
      )}

      {selectedItems.length > 0 && (
        <Button
          variant="danger"
          size="sm"
          className="ms-2"
          onClick={handleDeleteSelected}
        >
          Delete Selected
        </Button>
      )}
    </Container>
  );
};

export default CartList;
