import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faAdd, faCheck, faPen, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Badge, Button, ButtonGroup, Col, Form, Image, Modal, Row, Table } from 'react-bootstrap';

const ProductManagement_backup = () => {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});
    const [detailsModal, setDetailsModal] = useState(false);
    const [formModal, setFormModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data.products));
    }, []);

    const showDetailsModal = (item) => {
        setProduct(item);
        setDetailsModal(true);
    }

    const hideDetailsModal = () => {
        setDetailsModal(false);
    }

    const showFormModal = (item) => {
        setProduct(item);
        setFormModal(true);
    }

    const hideFormModal = () => {
        setFormModal(false);
    }

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    }

    const handleSaveChanges = () => {

    }

    return (
        <>
            <h1>Product List</h1>

            <Button variant='success mb-2' onClick={() => { setProduct({}), showFormModal(product) }}>
                <FontAwesomeIcon icon={faAdd} /> Add
            </Button>

            <Table striped>
                <thead className='table-dark'>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(item =>
                            <tr key={item.id}>
                                <td>
                                    <Image src={item.thumbnail} style={{ width: '100px' }} />
                                </td>
                                <td>{item.title}</td>
                                <td>{item.brand}</td>
                                <td>
                                    <s>${item.price}</s>
                                    <p style={{ fontSize: '120%', fontWeight: 'bold' }}>${(item.price * (100 - item.discountPercentage) / 100).toFixed(2)}</p>
                                </td>
                                <td>{item.stock}</td>
                                <td>
                                    <ButtonGroup size='sm'>
                                        <Button variant='info' onClick={() => showDetailsModal(item)}>
                                            <FontAwesomeIcon icon={faEye} />
                                        </Button>
                                        <Button variant='warning' onClick={() => showFormModal(item)}>
                                            <FontAwesomeIcon icon={faPen} />
                                        </Button>
                                        <Button variant='danger'>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>

            {/* Modal for Details */}
            <Modal size='xl' centered show={detailsModal} onHide={hideDetailsModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {product.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={4}>
                            <Image src={product.thumbnail} style={{ width: '100%' }} />
                        </Col>
                        <Col md={4}>
                            <dl>
                                <dt>Description:</dt>
                                <dd>{product.description}</dd>

                                <dt>Category:</dt>
                                <dd>{product.category}</dd>

                                <dt>Tags:</dt>
                                <dd>
                                    {
                                        product.tags?.map((item, index) =>
                                            <Badge key={index} bg='primary' className='me-1'>{item}</Badge>
                                        )
                                    }
                                </dd>
                            </dl>
                        </Col>
                        <Col md={4}>

                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>

            {/* Modal for Add/Edit */}
            <Modal size='lg' centered show={formModal} onHide={hideFormModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Edit: {product.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type='text' name='title' value={product.title} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type='text' name='description' value={product.description} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control type='text' name='category' value={product.category} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type='text' name='price' value={product.price} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Discount Percentage</Form.Label>
                                    <Form.Control type='text' name='discountPercentage' value={product.discountPercentage} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Stock</Form.Label>
                                    <Form.Control type='text' name='stock' value={product.stock} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' onClick={handleSaveChanges}>
                        <FontAwesomeIcon icon={faCheck} /> Save changes
                    </Button>
                    <Button variant='outline-secondary' onClick={hideFormModal}>
                        <FontAwesomeIcon icon={faTimes} /> Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ProductManagement_backup;