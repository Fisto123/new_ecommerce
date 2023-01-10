import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { setHeaders } from "../redux/api";
import { addToCart } from "../redux/cartSlice";

const Product = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const response = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/products/api/getProductById/${params.id}`,
          setHeaders()
        );
        setProduct(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    response();
  }, []);
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    nav("/cart");
  };
  return (
    <StyledProducts>
      <ProductContainer>
        {loading ? (
          "loading....."
        ) : (
          <>
            <ImageContainer>
              <img src={product?.image} alt="" />
              <h3 style={{ color: "purple" }}>{product?.name}</h3>
              <p>
                <span>Brand:</span>
                {product?.brand}{" "}
              </p>
              <p>
                <span>Description: </span>
                {product?.desc}{" "}
              </p>
              <Price>${product.price?.toLocaleString()}</Price>
              <button
                style={{
                  border: "none",
                  background: "pink",
                  padding: "10px",
                  borderRadius: "15px",
                }}
                className="product-add-to-cart"
                onClick={() => handleAddToCart(product)}
              >
                ADD TO CART
              </button>
            </ImageContainer>
          </>
        )}
      </ProductContainer>
    </StyledProducts>
  );
};

export default Product;

const StyledProducts = styled.div`
  margin: 3rem;
  display: flex;
  justify-content: center;
`;
const ProductContainer = styled.div`
  max-width: 500px;
  width: 100%;
  height: auto;
  display: flex;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 5px;
  padding: 2rem;
`;
const ImageContainer = styled.div`
  flex: 1;
  img {
    width: 100%;
  }
  text-align: center;
`;
const Price = styled.div`
  font-size: 1.4rem;
`;
