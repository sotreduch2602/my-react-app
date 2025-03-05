import { useParams } from "react-router-dom";

const ProductDetail = () => {
  let { id } = useParams();
  return <div>ProductDetail {id}</div>;
};

export default ProductDetail;
