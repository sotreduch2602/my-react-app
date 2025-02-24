import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();

  return (
    <>
      <h2>Sản phẩm thứ {id}</h2>
    </>
  );
};

export default ProductDetail;
