import React from "react";
import { useGetAllProductsQuery } from "../../redux/productApi";
import "./home.css";
import { MDBSpinner } from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // const {items} = useSelector((state)=>state.products)
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { data, error, isLoading } = useGetAllProductsQuery();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    nav("/cart ");
  };
  console.log(data);
  return (
    <div className=" home_container">
      {isLoading ? (
        <MDBSpinner />
      ) : error ? (
        <p>An error occured</p>
      ) : (
        <>
          <p>New arrivals</p>
          <div className="products">
            {data?.map((product) => (
              <div className="product" key={product.id}>
                <h3>{product.name}</h3>
                <img src={product.image} alt="img" />
                <div className="details">
                  <span>{product.desc}</span>
                  <span className="price">${product.price}</span>
                </div>
                <button onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
