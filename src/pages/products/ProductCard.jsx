import { faCreditCard } from "@fortawesome/free-regular-svg-icons";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, CardFooter } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AddQuantityToCart from "../../functions/CartFunction";

const ProductCard = (props) => {
  let navigate = useNavigate();

  const handleAddToCart = () => {
    AddQuantityToCart(props.data, 1);
    navigate("/cart");
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
