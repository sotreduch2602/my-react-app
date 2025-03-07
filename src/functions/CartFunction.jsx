import axios from "axios";

const AddQuantityToCart = (itemAdd, quantityItem) => {
  axios
    .get("cart")
    .then((res) => {
      const selectItem = res.data.filter((p) => p.product_id === itemAdd.id);

      if (selectItem.length > 0) {
        console.log(selectItem);

        let item = selectItem[0];
        item.quantity += quantityItem;
        axios.put(`cart/${item.id}`, item);
      } else {
        axios.post("cart", {
          product_id: itemAdd.id,
          quantity: quantityItem,
        });
      }
    })
    .catch((error) => console.error("Error:", error));
};

export default AddQuantityToCart;
