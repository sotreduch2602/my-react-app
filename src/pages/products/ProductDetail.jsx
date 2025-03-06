import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  let { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`products/${id}`).then((res) => setProduct(res.data));
  });

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
                  alt={product.name} style={{ width: "100%" }}
                />
              </Col>
              <Col md={6}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <h4>{product.price}</h4>

                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="number" placeholder="Enter quantity" />
                  </Form.Group>

                  <button className="btn btn-primary">Add to Cart</button>
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
