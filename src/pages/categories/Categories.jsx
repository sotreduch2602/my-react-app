import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ProductCard from "../products/ProductCard";

const Categories = () => {
  let { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("products").then((res) => {
      // console.log(res.data);
      setProducts(res.data.filter((product) => product.category_id == id));
    });
  }, [id]);

  return (
    <div>
      <h2>Categories {id}</h2>
      <Row>
        {products.map((item, index) => (
          <Col key={index} md={3} className="mb-3">
            <ProductCard key={item.id} data={item} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Categories;
