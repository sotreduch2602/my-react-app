import { faMagento } from "@fortawesome/free-brands-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowDown,
  faMagnifyingGlass,
  faPen,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  ButtonGroup,
  Col,
  Form,
  FormControl,
  Image,
  InputGroup,
  Modal,
  Row,
  Table,
} from "react-bootstrap";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [backupProducts, setbackupProducts] = useState([]);
  const [AE, setAE] = useState(false);
  const [ID, setID] = useState(-1);
  const [AEShow, setAEShow] = useState(false);
  const [DetailShow, setDetailShow] = useState(false);
  const [SearchName, setSearchName] = useState("");

  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setbackupProducts(data.products);
      });
  }, []);

  const handleOnChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleDelete = (id) => {
    const newProducts = products.filter((item) => item.id != id);
    setProducts(newProducts);
  };

  const handleAddEditShow = (e, i) => {
    // console.log("Clicked ID  Item:", i);

    const sel_product = products.find((product) => product.id === i);

    if (e.currentTarget.name === "Edit") {
      setID(i);
      setProduct(sel_product);
      setAE(true);
    } else {
      setProduct("");
      setAE(false);
    }

    handleAEShow();
  };

  const handleSaveChanges = (e) => {
    console.log(AE);

    if (AE === true) {
      console.log("Save Edit");
      // const newProducts = products.map((item) => {
      //   if (item.id === ID) {
      //     return product;
      //   } else {
      //     return item;
      //   }
      // });
      // setProducts(newProducts);

      let index = products.findIndex((p) => p.id == ID);
      console.log(`Item index ${index}`);

      setProducts([
        ...products.filter((p, i) => i < index),
        product,
        ...products.filter((p, i) => i > index),
      ]);
    } else {
      console.log("Save ADD");
      product.id = products.length + 1;
      setProducts([...products, product]);
    }
    setID(-1);
    handleAEClose();
  };

  //Modal
  const handleAEClose = () => setAEShow(false);
  const handleAEShow = () => setAEShow(true);

  const handleDetailClose = () => setDetailShow(false);
  const handleDetailShow = (item) => {
    setProduct(item);
    setDetailShow(true);
  };

  //Searching
  const handleSearch = () => {
    console.log("Original Products:", backupProducts);

    // Always filter from backupProducts to avoid losing dataede
    const foundProducts = backupProducts.filter((item) =>
      item?.title?.toLowerCase().includes(SearchName.toLowerCase())
    );

    setProducts(foundProducts);
  };

  return (
    <>
      {/* Detail Modal */}
      <Modal centered size="lg" show={DetailShow} onHide={handleDetailClose}>
        <Modal.Header closeButton>
          <Modal.Title>{product.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={4}>
              <Image src={product.images} style={{ width: "300px" }}></Image>
            </Col>
            <Col md={8}>
              <dl>
                <dt className="fw-bold">Description</dt>
                <dd>{product.description}</dd>

                <dt className="fw-bold">Category</dt>
                <dd>{product.category}</dd>

                <dt className="fw-bold">Tag</dt>
                <dd>
                  {product.tags?.map((tag, i) => (
                    <Badge key={i}>{tag}</Badge>
                  ))}
                </dd>
              </dl>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDetailClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add/Edit Modal */}
      <Modal centered size="lg" show={AEShow} onHide={handleAEClose}>
        <Modal.Header closeButton>
          <Modal.Title>{AE}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={product.title || ""}
                  onChange={handleOnChange}
                ></Form.Control>

                <Form.Label>Description</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Description"
                  name="description"
                  value={product.description || ""}
                  onChange={handleOnChange}
                ></Form.Control>

                <Form.Label>Category</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Category"
                  name="category"
                  value={product.category || ""}
                  onChange={handleOnChange}
                ></Form.Control>
              </Col>

              <Col md={6}>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Price"
                  name="price"
                  value={product.price || 0}
                  onChange={handleOnChange}
                ></Form.Control>

                <Form.Label>Discount Percentage</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Discount Percentage"
                  name="discountPercentage"
                  value={product.discountPercentage || 0}
                  onChange={handleOnChange}
                ></Form.Control>

                <Form.Label>Stock</Form.Label>
                <Form.Control
                  required
                  type="number"
                  min={0}
                  placeholder="Stock"
                  name="stock"
                  value={product.stock || 0}
                  onChange={handleOnChange}
                ></Form.Control>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
          <Button variant="secondary" onClick={handleAEClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Row>
        <Col md={8}>
          <h1>Product List</h1>
        </Col>
        <Col md={4}>
          <InputGroup className="mt-2">
            <Form.Control
              value={SearchName}
              placeholder="Search Name"
              onChange={(e) => {
                setSearchName(e.target.value);
              }}
            ></Form.Control>
            <Button variant="success" onClick={() => handleSearch()}>
              <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
            </Button>
          </InputGroup>
        </Col>
      </Row>

      <Button
        variant="success m-4"
        name="Add"
        onClick={(e) => handleAddEditShow(e, -1)}
      >
        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
        <span> Add</span>
      </Button>

      {/* Table */}
      <Table striped>
        <thead className="table-dark">
          <tr className="text-center">
            <th>Image</th>
            <th>
              <span className="m-1">Name</span>
              <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
            </th>
            <th>Brand</th>
            <th>
              <span className="m-1">Price</span>
              <FontAwesomeIcon
                icon={faArrowDown}
                onClick={() => console.log("click Arrow")}
              ></FontAwesomeIcon>
            </th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.id} className="text-center align-center">
              <td>
                <Image src={item.thumbnail} style={{ width: "100px" }} />
              </td>
              <td>{item.title}</td>
              <td>{item.brand}</td>
              <td>{item.price}</td>
              <td>{item.stock}</td>
              <td>
                <ButtonGroup>
                  <Button variant="info">
                    <FontAwesomeIcon
                      icon={faEye}
                      onClick={() => handleDetailShow(item)}
                    ></FontAwesomeIcon>
                  </Button>
                  <Button
                    variant="warning"
                    name="Edit"
                    onClick={(e) => handleAddEditShow(e, item.id)}
                  >
                    <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ProductManagement;
