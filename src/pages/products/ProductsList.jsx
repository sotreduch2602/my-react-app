import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import ProductCard from "./ProductCard";

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("products")
      .then((res) => setProducts(res.data));
  }, []);

  return (
    <>
      <h1>Products List</h1>
      <Row>
        {products.map((item, index) => (
          <Col key={index} md={3} className="mb-3">
                <ProductCard key={item.id} data={item} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ProductsList;
