import axios from "axios";
import { useSelector } from "react-redux";

const PayButton = ({ cartItems }) => {
  const user = useSelector((state) => state.auth);
  const handleCheckout = () => {
    axios
      .post(`http://localhost:5000/stripe/api/payment`, {
        cartItems,
        userId: user._id,
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <button onClick={handleCheckout} className="checkout">
        checkout
      </button>

      <input type="text" />
    </>
  );
};

export default PayButton;
