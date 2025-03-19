import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import ProductCard from "./ProductCard";

const SearchProducts = () => {
  const [products, setProducts] = useState([]);
  const [inputValue, setInputValue] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleOnChange = (e) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSearch = () => {
    let results = [...products];

    if (inputValue.name?.trim()) {
      results = results.filter((product) =>
        product.name
          .toLowerCase()
          .includes(inputValue.name.trim().toLowerCase())
      );
    }

    if (inputValue.min && !isNaN(inputValue.min)) {
      const minPrice = inputValue.min;
      results = results.filter((product) => product.price >= minPrice);
    }

    if (inputValue.max && !isNaN(inputValue.max)) {
      const maxPrice = inputValue.max;
      results = results.filter((product) => product.price <= maxPrice);
    }

    setFilteredProducts(results);
  };

  useEffect(() => {
    axios.get("products").then((res) => {
      setProducts(res.data);
      setFilteredProducts(res.data);
    });
  }, []);

  return (
    <>
      <Container className="w-50 mb-4">
        <h2 className="text-center">Products Search</h2>
        <div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={inputValue.name || null}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <div className="d-flex">
                <Form.Control
                  className=" mr-2"
                  type="number"
                  name="min"
                  value={inputValue.min || null}
                  onChange={handleOnChange}
                />
                -
                <Form.Control
                  className=" ml-2"
                  type="number"
                  name="max"
                  value={inputValue.max || null}
                  onChange={handleOnChange}
                />
              </div>
            </Form.Group>
          </Form>
          <div className="d-flex justify-content-center">
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </div>
      </Container>

      <Row>
        {filteredProducts.map((item, index) => (
          <Col key={index} md={3} className="mb-3">
            <ProductCard key={item.id} data={item} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default SearchProducts;
