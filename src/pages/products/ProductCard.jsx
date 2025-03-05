import { faCreditCard } from "@fortawesome/free-regular-svg-icons";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Button, Card, CardFooter } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  const handleAddToCart = () => {
    console.log("add to cart");
    const selectItem = props.list.filter((p) => p.sku === props.data.sku);

    axios.post("http://localhost:3000/cart", {
      sku: selectItem.sku,
      quantity: 1,
    });

    if (selectItem) {
      axios.put(`http://localhost:3000/cart/${selectItem.sku}`, {
        quantity: selectItem.quantity + 1,
      });
    }
  };

  return (
    <>
      <Card className="h-100">
        <Card.Img
          variant="top"
          src={`../../../public/images/product/${props.data.image}`}
        />
        <Card.Body>
          <Card.Title>
            <Link
              to={`./detail/${props.data.id}`}
              className="text-decoration-none"
            >
              {props.data.name}
            </Link>
          </Card.Title>
          <Card.Text>{props.data.description}</Card.Text>
        </Card.Body>
        <CardFooter>
          <Button variant="success" className="mr-2" onClick={handleAddToCart}>
            <FontAwesomeIcon icon={faCartPlus}></FontAwesomeIcon>
          </Button>
          <Button variant="primary">
            <FontAwesomeIcon className="mr-2" icon={faCreditCard} />
            {props.data.price}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default ProductCard;
