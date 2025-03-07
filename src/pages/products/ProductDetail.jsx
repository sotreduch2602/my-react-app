import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import AddQuantityToCart from "../../functions/CartFunction";

const ProductDetail = () => {
  let { id } = useParams();
  let navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    axios.get(`products/${id}`).then((res) => setProduct(res.data));
  });

  const handleQuantityChange = (e) => {
    e.preventDefault();
    const value = Number(e.target.value);
    setQuantity(value);
  };

  const handleAddMultiToCart = (e) => {
    e.preventDefault();
    if (quantity <= 0) {
      alert("Please enter a valid quantity");
      return;
    }
    AddQuantityToCart(product, quantity);
    navigate("/cart");
  };

  return (
    <>
      <h1>ProductDetail {id}</h1>
      <div>
        <Row>
          {product && (
            <>
              <Col md={6}>
                <img
                  src={`../../../public/images/product/${product.image}`}
                  alt={product.name}
                  style={{ width: "100%" }}
                />
              </Col>
              <Col md={6}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <h4>{product.price}</h4>

                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter quantity"
                      value={quantity}
                      onChange={handleQuantityChange}
                    />
                  </Form.Group>

                  <button
                    className="btn btn-primary"
                    onClick={handleAddMultiToCart}
                  >
                    Add to Cart
                  </button>
                </Form>
              </Col>
            </>
          )}
        </Row>
      </div>
    </>
  );
};

export default ProductDetail;
